import { defineConfig } from 'vite';

export default defineConfig({
  base: '/finalProject/dist/', // Full path for GitHub Pages
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [], // Ensure proper bundling
    },
  },
});
