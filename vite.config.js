import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, join } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    build: {
      outDir: join(__dirname, 'dist/render'),
      emptyOutDir: true,
      minify: false,
      commonjsOptions: {},
      sourcemap: true
    },
    resolve: {
      extensions: ['.js', '.ts', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
      },
    },
    server: {
      // host: '0.0.0.0',
      // port: 8090,
      // cors: true,
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
  }
})
