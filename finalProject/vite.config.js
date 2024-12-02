// vite.config.js
export default {
    build: {
      outDir: 'dist',
    },
    server: {
      open: true, // Automatically open browser after server start
    },
    optimizeDeps: {
      exclude: ['.Trash', 'node_modules'],
    }
  };

