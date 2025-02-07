import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // React plugin for JSX/TSX support
  server: {
    port: 3000,           // Set the dev server port (default: 3000)
    open: true,           // Automatically open the browser when the dev server starts
    hmr: true,            // Enable Hot Module Replacement (HMR)
  },
  build: {
    outDir: 'dist',       // Output directory for production build (default: dist)
    sourcemap: true,      // Generate source maps for easier debugging
    chunkSizeWarningLimit: 500, // Adjust chunk size warning limit (default: 500 KB)
  },
  resolve: {
    alias: {
      '@': '/src',        // Path alias for cleaner imports (e.g., "@/components")
    },
  },
  define: {
    'process.env': {}     // Fix for certain libraries that rely on process.env
  }
});
