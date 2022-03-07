import { createApp } from 'vue'
import naiveUi from 'naive-ui'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { routes, beforeEach, afterEach } from "./router"
import store from "./store"
import API from './api'
import App from './App.vue'

import './assets/stylus/Init.styl'

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHistory('/') : createWebHashHistory(),
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
