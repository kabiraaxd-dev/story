import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
// import { createMemoryHistory, createRouter } from 'vue-router'
import 'materialize-css/dist/css/materialize.min.css'
// import 'materialize-css/dist/js/materialize.min.js'
import './font/flaticon.css'
import './font/socicon.css'
import router from "./router/index.js"
// import SocialSharing from 'vue-social-sharing'

/* 
export const router = createRouter({
	history: createMemoryHistory,
	routes: [
		{ path:'/search', name:'Search', component: Search},
		{ path:'/story/:id', name:'Story', component: Story},
		{ path:'/women', name:'Women', component: Women},
		{ path:'/diary', name:'Diary', component: Diary},
		{ path:'/contact', name:'Contact', component: Contact},
		{ path: '/', name:'Home', component: Home},
		{ path: '/post/:id', name: 'Post', component: Post},
		{ path: '/page/:id', name: 'Page', component: Page}
	]
}) */

/* Vue.filter('datestring', function (value) {
	var v = new Date(value);
  return v.toDateString();
}) */

/* new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
}) */

  const app = createApp(App)
  app.use(router)
  app.mount("#app")