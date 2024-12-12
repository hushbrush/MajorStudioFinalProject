import { defineConfig } from 'vite';

export default defineConfig({
  base: '/MajorStudioFinalProject/finalProject/', // Full path for GitHub Pages
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [], // Ensure proper bundling
    },
  },
});
