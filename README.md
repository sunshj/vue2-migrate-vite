# vue2.6 迁移 vite 指南

> vue需要升级到2.7版本

## 一、安装/配置 vite 及相关依赖

1. 安装

```bash
npm i -D vite@4 vite-plugin-vue2@2
```

2. 添加 `vite.config.js` 配置文件

```javascript
import path from 'node:path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  plugins: [createVuePlugin()],
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  }
})
```

3. 修改 `package.json`

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 二、删除依赖和文件

1. 删除 `babel`，`vue-cli`，`sass-loader` 和 `core-js` 相关依赖

```bash
npm un @babel/core @babel/eslint-parser @vue/cli-plugin-babel @vue/cli-plugin-eslint @vue/cli-plugin-router @vue/cli-plugin-vuex @vue/cli-service sass-loader core-js
```

2. 删除 `babel.config.js`，`vue.config.js` 文件

## 三、文件修改

1. `.browserslistrc` 添加 `not ie 11`

```text
> 1%
last 2 versions
not dead
not ie 11
```

2. 将 `public/index.html` 移至根目录下，删除插值模板，添加 `script`

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="icon" href="./favicon.ico" />
    <title>vite-vue2</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./src/main.js"></script>
  </body>
</html>
```

## 四、环境变量

1. 环境变量文件前缀改为 `VITE_APP`
2. 使用 `import.meta.env` 引入环境变量
3. `router/index.js` 中的 `base: process.env.BASE_URL` 可以删除

## 五、使用文件路由和布局

1. 安装依赖

```bash
npm i -D vite-plugin-pages@0.32 vite-plugin-vue-layouts@0.8
```

2. 配置 vite 插件

```javascript
// vite.config.js
import Pages from 'vite-plugin-pages' // add
import Layouts from 'vite-plugin-vue-layouts' // add

export default defineConfig({
  plugins: [
    createVuePlugin(),
    Pages({
      routeBlockLang: 'yaml',
    }), // add
    Layouts(), // add
  ],
  ...
})
```

3. 修改 `router/index.js`

```javascript
// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts' // add
import generatedRoutes from '~pages' // add

Vue.use(VueRouter)

const routes = setupLayouts(generatedRoutes) // edit

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
```

4. 将 `views` 目录改为 `pages` 然后按照文件路由规则修改

## 六、其他问题

1. `element-ui` 部分组件没有渲染：在 `vite.config.js` 配置 `resolve.extensions` 和 `resolve.alias`

```javascript
  resolve: {
    extensions: ['.js', '.vue', '.json'], // add
    alias: {
      '@': path.join(__dirname, 'src'),
      vue: 'vue/dist/vue.esm.js', // add
    },
  },
```

2. `ant-design-vue` 打包问题：安装 `vite-plugin-antdv-fix` 并添加到 `plugins` 中

```bash
 npm i -D vite-plugin-antdv-fix
```

```javascript
import antdvFix from 'vite-plugin-antdv-fix' // add

export default defineConfig({
  plugins: [
    createVuePlugin(),
    antdvFix(), // add
    ...
  ]
})
```
