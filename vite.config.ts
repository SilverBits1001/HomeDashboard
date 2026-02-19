import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 'base' must be relative ('./') for assets to load correctly 
  // when hosted on GitHub Pages sub-directories.
  base: './', 
  define: {
    // Prevents "process is not defined" error
    'process.env': {},
  },
  build: {
    // Target ES2015 to support older Kindle WebKit browsers
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true
  }
});