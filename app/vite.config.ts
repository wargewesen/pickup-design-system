import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The prototype consumes the design system straight from ../src, so component changes show up live.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@figma/pickup-design-system': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
      '@app': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: { outDir: '../app-dist', emptyOutDir: true },
});
