import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router-dom') || /[\\/]react[\\/]/.test(id) || /[\\/]react-dom[\\/]/.test(id)) return 'react-vendor'
          if (id.includes('leaflet')) return 'map-vendor'
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) return 'forms'
        },
      },
    },
  },
})