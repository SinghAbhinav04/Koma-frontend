import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
    server: {
    host: '127.0.0.1', // or '0.0.0.0' to expose to your local network
    port: 3000,        // replace with your desired port number
  },
});
