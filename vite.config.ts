import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'


const config = defineConfig({
  plugins: [
    devtools(),
    TanStackRouterVite(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    viteReact(),
  ].filter(Boolean),
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/unit/setup.ts'],
    include: ['tests/unit/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['tests/e2e/**/*', 'node_modules/**/*'],
    coverage: {
        include: [
            'src/components/**/*',
            'src/hooks/**/*',
            'src/lib/**/*',
            'src/routes/**/*',
            'src/store/**/*',
        ],
        exclude: ['src/components/ui/**/*'],
        thresholds: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80,
        },
    }
  },
})

export default config
