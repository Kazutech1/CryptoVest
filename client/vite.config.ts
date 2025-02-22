import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Correctly points '@' to the 'src' directory
    },
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('http://localhost:5000'), // Add the backend URL
  },
});
