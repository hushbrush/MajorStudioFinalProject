import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',  // Output directory
    rollupOptions: {
      external: [],  // Ensure everything is bundled
    },
  },
});

