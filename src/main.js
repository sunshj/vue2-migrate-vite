import Vue from 'vue'
import ElementUI from 'element-ui'
import { http } from '@/utils'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/global.css'

Vue.prototype.$http = http
Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
