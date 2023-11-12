import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "Tic-Tac-Toe",
  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})
