import * as path from "path"
import { fileURLToPath, URL } from "url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

const gateway = "http://localhost:80" // 本地

const pathSrc = path.resolve(__dirname, "src")
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "vue-router"],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        // ElementPlus自动导入
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
          importStyle: "sass",
        }),
      ],
      eslintrc: {
        enabled: true, // <-- this
      },

      dts: path.resolve(pathSrc, "auto-imports.d.ts"),
    }),
    Components({
      resolvers: [
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式
          importStyle: "sass",
          // directives: true,
          // version: "2.1.5",
        }),
      ],

      dts: path.resolve(pathSrc, "components.d.ts"),
    }),
  ],
  optimizeDeps: {
    exclude: [],
  },
  build: {
    outDir: "./dist",
  },
  server: {
    open: true,
    host: "0.0.0.0",
    port: 3002,
    https: false,
    proxy: {
      "/api/": {
        target: gateway,
        secure: false,
        changeOrigin: true,
      },
    },
  },
})
