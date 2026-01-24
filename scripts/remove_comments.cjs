const fs = require('fs');
const path = require('path');

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.css', '.json'];
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build', 'coverage', '.output', '.tanstack'];

function removeComments(content, ext) {
    const isCss = ext === '.css';
    const isJson = ext === '.json';
    
    // For JSON, we can just strip comments if it's JSONC. 
    // But since we want to be robust, we'll use the main parser which handles // and /* */.
    // JSON strings are double quotes only.
    
    let output = '';
    const stack = ['CODE']; // Stack of states: CODE, STRING_APOS, STRING_QUOTE, STRING_TICK, COMMENT_SINGLE, COMMENT_MULTI, REGEX
    
    // Helper to get current state
    const state = () => stack[stack.length - 1];
    
    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        const nextChar = content[i + 1];
        const currentState = state();

        // Handle escape sequences in strings and regex
        if (['STRING_APOS', 'STRING_QUOTE', 'STRING_TICK', 'REGEX'].includes(currentState)) {
            if (char === '\\') {
                output += char;
                if (nextChar) {
                    output += nextChar;
                    i++; // Skip next char
                }
                continue;
            }
        }

        switch (currentState) {
            case 'CODE':
                // Check for Strings
                if (!isCss && char === '"') {
                    stack.push('STRING_QUOTE');
                    output += char;
                } else if (!isCss && !isJson && char === '\'') {
                    stack.push('STRING_APOS');
                    output += char;
                } else if (!isCss && !isJson && char === '`') {
                    stack.push('STRING_TICK');
                    output += char;
                } 
                // Check for Comments
                else if (char === '/' && nextChar === '/') {
                    // Single line comment
                    // Check if it's not a url in CSS (unlikely with just CODE state, but CSS doesn't use // usually. 
                    // However, we apply generic logic. CSS doesn't support // comments in standard, but some tools do. 
                    // Let's stick to strict standard for CSS: only /* */. 
                    if (!isCss) {
                         stack.push('COMMENT_SINGLE');
                         i++; // skip /
                    } else {
                        output += char;
                    }
                } else if (char === '/' && nextChar === '*') {
                    stack.push('COMMENT_MULTI');
                    i++; // skip *
                } 
                // Check for Regex (basic heuristic)
                else if (!isCss && !isJson && char === '/') {
                    // Determine if division or regex
                    // Look behind for hints
                    let j = output.length - 1;
                    while (j >= 0 && /\s/.test(output[j])) j--;
                    
                    const lastTokenChar = j >= 0 ? output[j] : '';
                    const isRegexStart = /[=(,[{:?!&|~^<>]/.test(lastTokenChar) || 
                                         ['return', 'case', 'throw', 'else', 'new', 'delete', 'void', 'typeof', 'await', 'yield'].some(kw => {
                                             // simple check if output ends with keyword
                                              const wordStart = output.lastIndexOf(kw, j);
                                              if (wordStart !== -1 && wordStart + kw.length - 1 === j) {
                                                  // check boundaries
                                                  const prev = output[wordStart - 1];
                                                  // prev should be separated or start of file
                                                  return !prev || /[^a-zA-Z0-9_$]/.test(prev);
                                              }
                                              return false;
                                         });

                    if (isRegexStart) {
                        stack.push('REGEX');
                        output += char;
                    } else {
                        // Division
                        output += char;
                    }
                }
                else {
                    output += char;
                }
                break;

            case 'STRING_QUOTE':
                output += char;
                if (char === '"') stack.pop();
                break;

            case 'STRING_APOS':
                output += char;
                if (char === '\'') stack.pop();
                break;

            case 'STRING_TICK':
                output += char;
                if (char === '`') stack.pop();
                // Template literal interpolation ${ } is tricky because it nests CODE.
                // For simplicity, we won't fully parse nested code inside ${}. 
                // We will just hope there are no comments inside ${ ... } for now, 
                // OR we can try to detect ${ and push CODE? 
                // But blindly pushing CODE on ${ might break if } is inside a string inside that code.
                // It gets recursive. 
                // Given the task is to remove comments, missing comments inside complex template strings is acceptable risk 
                // vs breaking the code. We'll stick to treating ticks as simple strings.
                break;

            case 'REGEX':
                output += char;
                if (char === '/') stack.pop(); // End of regex
                break;

            case 'COMMENT_SINGLE':
                if (char === '\n') {
                    stack.pop();
                    output += char; // Keep the newline
                }
                break;

            case 'COMMENT_MULTI':
                if (char === '*' && nextChar === '/') {
                    stack.pop();
                    i++; // skip /
                    // output nothing, strictly remove
                }
                break;
        }
    }
    
    return output;
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (EXCLUDE_DIRS.includes(file)) continue;

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else {
            const ext = path.extname(file);
            if (EXTENSIONS.includes(ext)) {
                // Read
                const content = fs.readFileSync(fullPath, 'utf8');
                // Process
                console.log(`Processing ${fullPath}...`);
                try {
                    const newContent = removeComments(content, ext);
                    // Write back
                    // Only write if changed to preserve timestamps/watchers if likely same
                    if (newContent !== content) {
                         fs.writeFileSync(fullPath, newContent);
                    }
                } catch (e) {
                    console.error(`Error processing ${fullPath}`, e);
                }
            }
        }
    }
}

// Start
console.log('Starting comment removal...');
const targetDirs = [
    path.join(process.cwd(), 'src'),
    path.join(process.cwd(), 'tests'),
    process.cwd() // root files too, but carefully?
];

// Scan src and tests explicitly
processDirectory(path.join(process.cwd(), 'src'));
if (fs.existsSync(path.join(process.cwd(), 'tests'))) {
    processDirectory(path.join(process.cwd(), 'tests'));
}

// Scan root files for .ts, .js, .json
const rootFiles = fs.readdirSync(process.cwd());
for (const file of rootFiles) {
    const ext = path.extname(file);
    if (EXTENSIONS.includes(ext)) {
        const fullPath = path.join(process.cwd(), file);
        if (fs.statSync(fullPath).isFile()) {
            // Exclude this script itself if it's in root (it's in scripts/ so okay)
            if (fullPath === __filename) continue;
            
             // Read
             const content = fs.readFileSync(fullPath, 'utf8');
             console.log(`Processing ${fullPath}...`);
             const newContent = removeComments(content, ext);
             if (newContent !== content) {
                 fs.writeFileSync(fullPath, newContent);
             }
        }
    }
}

console.log('Done.');
