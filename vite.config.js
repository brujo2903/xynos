import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    rollupOptions: {
      input: {
        main: 'src/index.html',
        terminal: 'src/terminal.html'
      }
    },
    outDir: '../dist',
    emptyOutDir: true,
  }
});