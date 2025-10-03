import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4173,  // ✅ Cambiado de 5173 a 4173
    strictPort: true,
    hmr: {
      overlay: true
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,  // ✅ Mismo puerto para consistencia
    strictPort: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      }
    }
  },
  clearScreen: false,
  optimizeDeps: {
    force: true  // ✅ Este force sí es válido aquí
  }
})