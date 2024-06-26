import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    base:'/',
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "src")
        }
    },
    plugins:
        [vue(), vueJsx(), WindiCSS()],
})
