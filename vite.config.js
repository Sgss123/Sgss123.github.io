import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src")
    }
  },
  plugins: [vue(), WindiCSS()],
  server: { host: '127.0.0.1', port: 30000 }
})
