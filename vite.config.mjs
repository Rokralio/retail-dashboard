import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/retail-dashboard/', 
  plugins: [vue()],
  server: { port: 5173 }
})
