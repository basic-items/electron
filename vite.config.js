require('dotenv').config({ path: resolve(__dirname, '.env') })

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import electron from 'vitejs-plugin-electron'

const root = resolve(__dirname, './')

export default defineConfig(env => {
  return {
    plugins: [
      vue(),
      electron(),
    ],
    root,
    base: './', // index.html 中静态资源加载位置
    server: {
      port: +process.env.PORT,
      proxy: {
        '/xxxx': {
          target: 'xxxx',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/xxxx/, ''),
        },
      },
    },
    resolve: {
      extensions: ['.js', '.ts', '.vue', '.json', '.mjs'],
      alias: {
        '@': resolve(__dirname, 'src'),
        '@main': resolve(__dirname, 'ele/main'),
        '@root': __dirname,
      },
    },
    build: {
      outDir: resolve(__dirname, 'dist/render'),
      emptyOutDir: true,
      minify: false,
      commonjsOptions: {},
      assetsDir: '', // 相对路径 加载问题
      sourcemap: true,
    },
  }
})
