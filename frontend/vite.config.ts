import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    port: 4000,
    host: true,
    strictPort: false
  },
  build: {
    // Optimizaciones de build
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Code splitting manual para mejor caché
        manualChunks: {
          // Vendor chunk para librerías externas
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Chunk de componentes premium
          components: [
            './src/components/GlassCard',
            './src/components/SunsetButton',
            './src/components/AnimatedBackground'
          ]
        }
      }
    },
    // Optimizar assets
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false // Desactivar en producción para mejor performance
  },
  css: {
    // Optimizaciones CSS
    devSourcemap: false
  },
  optimizeDeps: {
    // Pre-bundling para dependencias
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: []
  },
  esbuild: {
    // Optimizaciones de esbuild
    drop: ['console', 'debugger']
  }
})
