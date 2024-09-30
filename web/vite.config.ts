import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  css: {
    devSourcemap: true
  },
  envDir: './env',
  plugins: [react()],
  build: {
    manifest: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          ui: ['@mui/material'],
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true
    }
  },
  preview: {
    host: true,
    port: 8080
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~theme': path.resolve(__dirname, './theme'),
      '~public': path.resolve(__dirname, './public'),
      packageJson: path.resolve(__dirname, './package.json')
    }
  }
}));
