import { createApp } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import store from './store'
import route from './router'
import App from './App.vue'

const { routes, beforeEach, afterEach } = route
  
const router = createRouter({
  history: createWebHistory('/'),
  routes
})
router.beforeEach((to, from, next) => {
  beforeEach(to, from, next)
})
router.afterEach(() => {
  afterEach()
})

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
