import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/generar_diagrama': 'http://localhost:5000',  // Redirige las solicitudes a Flask en el puerto 5000
    }
  }
})
