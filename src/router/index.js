import Vue from 'vue'
import VueRouter from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from '~pages'

Vue.use(VueRouter)

const routes = setupLayouts(generatedRoutes)
console.log('routes', routes)

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
