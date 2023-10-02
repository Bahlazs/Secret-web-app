import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/secret': 'http://127.0.0.1:8080',
      '/user': 'http://localhost:8080'
    },
  },
})
