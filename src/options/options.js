
import Vue from 'vue'
import App from './App'

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import rippleJS from 'vanilla-ripplejs' // no remove, works

import AppPageHome from './pages/home/AppPageHome.vue'
import AppPageSettings from './pages/settings/AppPageSettings.vue'
import AppPageAchievements from './pages/achievements/AppPageAchievements.vue'
import AppPageUser from './pages/user/AppPageUser.vue'
import AppPageChangelog from './pages/changelog/AppPageChangelog.vue'
import AppPageBlog from './pages/blog/AppPageBlog.vue'
import AppPagePost from './pages/blog/AppPagePost.vue'

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
		},
		{
			path: '/achievements',
			name: "achievements",
			component: AppPageAchievements
		},
		{
			path: '/user',
			name: "user",
			component: AppPageUser
		},
		{
			path: '/changelog',
			name: "changelog",
			component: AppPageChangelog
		},
		{
			path: '/blog',
			name: "blog",
			component: AppPageBlog
		},
		{ 
			path: '/post/:id', 
			name: "post",
			component: AppPagePost,
			props: true,
			props: (route) => {
				const id = Number.parseInt(route.params.id, 10)
				if (Number.isNaN(id)) {
					return 0
				}
				return { id }
			}
		}
	]
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App),
	// watch: {
	// 	'$route'(to, from) {
	// 	  console.log(to, from);
	// 	}
	// },
})
