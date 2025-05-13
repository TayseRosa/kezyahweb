import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',  // Alias para resolver melhor os caminhos dentro do src
    },
  },
  server: {
    hmr: true,  // Garantir que o HMR esteja habilitado
    port:5173
  },
})
