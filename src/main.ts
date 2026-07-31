import './assets/main.css'

import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import type { Router } from 'vue-router'
import router from './router'

export function createAppInstance(routerInstance: Router = router) {
  const app = import.meta.env.SSR ? createSSRApp(App) : createApp(App)
  app.use(routerInstance)
  return app
}

if (!import.meta.env.SSR) {
  createAppInstance().mount('#app')
}

export default createAppInstance
