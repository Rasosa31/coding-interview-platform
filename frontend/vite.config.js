import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      external: ['node-fetch', 'fs', 'path', 'url', 'util', 'stream', 'buffer', 'crypto', 'os', 'events', 'http', 'https', 'net', 'tls', 'zlib', 'querystring'],
      output: {
        manualChunks: undefined
      }
    },
    commonjsOptions: {
      exclude: ['node-fetch']
    }
  },
  optimizeDeps: {
    exclude: ['pyodide']
  }
});


