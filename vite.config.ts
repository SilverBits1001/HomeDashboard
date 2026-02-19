import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 'base' must be relative ('./') for assets to load correctly 
  // when hosted on GitHub Pages sub-directories (e.g. user.github.io/repo/).
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true
  }
});