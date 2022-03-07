import { createApp } from 'vue'
import naiveUi from 'naive-ui'
import { createRouter, createWebHistory } from 'vue-router'
import { routes, beforeEach, afterEach } from "./router"
import store from "./store"
import API from './api'
import App from './App.vue'

import './assets/stylus/Init.styl'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})
router.beforeEach((to: any, from: any, next: any) => {
  beforeEach(to, from, next)
})
router.afterEach(() => {
  afterEach()
})

createApp(App)
  .use(API)
  .use(naiveUi)
  .use(router)
  .use(store)
  .mount("#app")
