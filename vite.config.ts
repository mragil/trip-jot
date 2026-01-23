import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const isTest = process.env.VITEST === 'true';

const config = defineConfig({
  plugins: [
    devtools(),
    !isTest && nitro(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    !isTest && tanstackStart({
      spa: {
        enabled: true,
      }
    }),
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
            statements: 90,
            branches: 90,
            functions: 90,
            lines: 90,
        },
    }
  },
})

export default config
