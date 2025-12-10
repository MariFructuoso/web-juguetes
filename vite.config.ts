import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'; // <--- Importante

export default defineConfig({
  plugins: [
    tailwindcss(), // <--- Activar el plugin
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        add: 'add-toy.html'
      }
    }
  }
});