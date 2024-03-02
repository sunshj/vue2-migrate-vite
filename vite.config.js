import path from 'node:path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'
import { GitInfo } from '@sunshj/plugins'

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
      enableVars: { lastCommitMsg: true, lastCommitTime: true },
      injectToHead: false
    })
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
  }
})
