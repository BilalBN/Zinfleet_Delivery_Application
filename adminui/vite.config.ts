import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}, // Define process.env to avoid "process is not defined" errors
  },
  resolve: {
    alias: {
      // Polyfill for process to make it compatible with browser environment
      process: 'process/browser',
    },
  },
});
