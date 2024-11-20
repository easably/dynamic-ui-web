import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/dynamic-ui-web/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
})
