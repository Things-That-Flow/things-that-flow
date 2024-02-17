import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx'], // for building .tsx
  format: ['cjs', 'esm'],
  splitting: true,
  sourcemap: true,
  clean: true
})
