import { createApp } from 'vue'
import App from './App.vue'

import 'materialize-css/dist/css/materialize.min.css'
// import 'materialize-css/dist/js/materialize.min.js'
import './font/flaticon.css'
import './font/socicon.css'
import {router} from "./router/index.js"

  const app = createApp(App)
  app.use(router)
  app.mount("#app")