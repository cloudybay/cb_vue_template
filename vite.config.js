
import { defineConfig, loadEnv } from "vite";
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from "path"

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

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
      outDir: process.env.VITE_APP_DIR,
      rollupOptions: {
        external: [
          path.resolve( __dirname, 'src/assets/font_icon/demo.html'),
          path.resolve( __dirname, 'src/assets/font_icon/Read Me.txt')
        ]
      }
    },

    server: {
      host: process.env.VITE_APP_DEV_HOST,
      port: process.env.VITE_APP_DEV_PORT
    }
  })
}
