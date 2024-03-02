import Vue from 'vue'
import { http } from '@/utils'
import App from './App.vue'
import router from './router'
import './plugins/element-ui'
import './assets/global.css'

Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
