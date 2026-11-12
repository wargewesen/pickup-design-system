import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ tsconfigPath: './tsconfig.build.json', entryRoot: 'src', exclude: ['**/*.stories.tsx', '**/*.figma.ts'] }),
  ],
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'index' },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', /^@heroicons\/react/],
    },
    cssCodeSplit: false,
  },
});
