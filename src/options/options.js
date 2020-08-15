
import Vue from 'vue'
import App from './App'

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import rippleJS from 'vanilla-ripplejs' // no remove, works

import AppPageHome from './pages/home/AppPageHome.vue'
import AppPageOptions from './pages/options/AppPageOptions.vue'
import AppPageAchievements from './pages/achievements/AppPageAchievements.vue'
import AppPageUser from './pages/user/AppPageUser.vue'
import AppPageChangelog from './pages/changelog/AppPageChangelog.vue'
import AppPageBlog from './pages/blog/AppPageBlog.vue'
import AppPagePost from './pages/blog/AppPagePost.vue'

import TabLogicommerce from './pages/options/tabs/TabLogicommerce.vue'
import TabFluidTools from './pages/options/tabs/TabFluidTools.vue'
import TabZendesk from './pages/options/tabs/TabZendesk.vue'
import TabOthers from './pages/options/tabs/TabOthers.vue'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

const router = new VueRouter({
	scrollBehavior: (to, from, savedPosition) => {
		return { x: 0, y: 0 }
	},
  routes: [
    {
      path: "/",
      name: "home",
      component: AppPageHome,
    },
    {
      path: '/options',
      name: "options",
      component: AppPageOptions,
      children: [
        {
          path: '',
          component: TabLogicommerce,
        },
        {
          path: 'logicommerce',
          component: TabLogicommerce,
        },
        {
        	path: 'fluid-tools',
          component: TabFluidTools,
        },
        {
        	path: 'zendesk',
          component: TabZendesk,
        },
        {
        	path: 'others',
          component: TabOthers,
        },
      ]
    },
    {
      path: '/achievements',
      name: "achievements",
      component: AppPageAchievements,
    },
    {
      path: '/user',
      name: "user",
      component: AppPageUser,
    },
    {
      path: '/changelog',
      name: "changelog",
      component: AppPageChangelog,
    },
    {
      path: '/blog',
      name: "blog",
      component: AppPageBlog,
    },
    {
      path: '/blog/:id',
			name: "blog",
      component: AppPagePost,
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
