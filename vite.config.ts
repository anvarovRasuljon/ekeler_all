import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompressionInit from 'vite-plugin-compression'
const viteCompression = (viteCompressionInit as any).default ?? viteCompressionInit

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
      threshold: 10240,
    }),
    viteCompression({
      algorithm: 'gzip',
      threshold: 10240,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/react-router-dom/')) {
            return 'vendor-router'
          }
          if (id.includes('node_modules/gsap/')) {
            return 'vendor-gsap'
          }
          if (id.includes('node_modules/swiper/')) {
            return 'vendor-swiper'
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons'
          }
          if (id.includes('node_modules/@sanity/') || id.includes('node_modules/sanity/')) {
            return 'vendor-sanity'
          }
        },
      },
    },
  },
})
