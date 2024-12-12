import { defineConfig } from 'vite';

export default defineConfig({
  base: '/finalProject', // GitHub repository name
  build: {
    outDir: 'dist',  // Output directory
    rollupOptions: {
      external: [],  // Ensure everything is bundled
    },
  },
});


