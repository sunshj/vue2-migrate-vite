import path from 'node:path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

export default defineConfig({
  plugins: [
    createVuePlugin(),
    Pages({
      routeBlockLang: 'yaml',
    }),
    Layouts(),
  ],
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.join(__dirname, 'src'),
      vue: 'vue/dist/vue.esm.js',
    },
  },
})
