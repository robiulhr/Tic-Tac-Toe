import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/Tic-Tac-Toe',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})
