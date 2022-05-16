
import { defineConfig, loadEnv } from "vite"
import path from "path"
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      vue(),
      WindiCSS()
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },

    base: process.env.VITE_APP_BASE,

    build: {
      outDir: process.env.VITE_APP_DIR
    },

    server: {
      host: process.env.VITE_APP_DEV_HOST,
      port: process.env.VITE_APP_DEV_PORT
    }
  })
}
