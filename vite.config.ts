import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'GEMINI_'],
  server: {
    proxy: {
      '/api/iss-now': {
        target: 'http://api.open-notify.org/iss-now.json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/iss-now/, '')
      },
      '/api/astros': {
        target: 'http://api.open-notify.org/astros.json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/astros/, '')
      },
      '/api/news': {
        target: 'https://newsdata.io/api/1/news',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/news/, '')
      }
    }
  }
});
