import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    chunkSizeWarningLimit: 1200,
  },
  resolve: {
    alias: {
      '@fileURLToPath': fileURLToPath,
    },
  },
  define: {
    'process.env': process.env,
  },
})
