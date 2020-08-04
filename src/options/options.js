

import Vue from 'vue'
import App from './App'

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'

import AppPageHome from './pages/home/AppPageHome.vue'
import AppPageNotFound from './pages/404/AppPageNotFound.vue'
import AppPageSettings from './pages/settings/AppPageSettings.vue'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

const router = new VueRouter({
	routes: [
		{
			path: "/",
			name: "home",
			component: AppPageHome
		},
		{
			path: '/settings',
			name: "settings",
			component: AppPageSettings
		}
	]
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
  render: h => h(App)
})
