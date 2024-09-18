import path from 'node:path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'
import { GitInfo, EnvDts } from '@sunshj/vite-plugins'

export default defineConfig({
  plugins: [
    createVuePlugin(),
    Pages({
      routeBlockLang: 'yaml'
    }),
    Layouts(),
    Components({
      transformer: 'vue2',
      directoryAsNamespace: true,
      resolvers: [ElementUiResolver()]
    }),
    GitInfo({
      enableVars: { msg: true, time: true },
      injectToHead: false
    }),
    EnvDts()
  ],
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.join(__dirname, 'src'),
      vue: 'vue/dist/vue.esm.js'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/element-ui')) return 'element-ui'
        }
      }
    }
  }
})
