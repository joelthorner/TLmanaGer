
import Vue from 'vue'
import App from './App'

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import rippleJS from 'vanilla-ripplejs' // no remove, works

import AppPageHome from '@options/pages/home/AppPageHome'
import AppPageOptions from '@options/pages/options/AppPageOptions'
import AppPageAchievements from '@options/pages/achievements/AppPageAchievements'
import AppPageUser from '@options/pages/user/AppPageUser'
import AppPageChangelog from '@options/pages/changelog/AppPageChangelog'
import AppPageBlog from '@options/pages/blog/AppPageBlog'
import AppPagePost from '@options/pages/blog/AppPagePost'

import TabLogicommerce from '@options/pages/options/tabs/TabLogicommerce'
import TabFluidTools from '@options/pages/options/tabs/TabFluidTools'
import TabZendesk from '@options/pages/options/tabs/TabZendesk'
import TabOthers from '@options/pages/options/tabs/TabOthers'

import TabAvatar from '@options/pages/user/tabs/TabAvatar'
import TabInfo from '@options/pages/user/tabs/TabInfo'
import TabStats from '@options/pages/user/tabs/TabStats'
import TabReset from '@options/pages/user/tabs/TabReset'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: AppPageHome,
    },
    {
      path: '/options',
      redirect: '/options/logicommerce',
      name: "options",
      component: AppPageOptions,
      children: [
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
      ],
    },
    {
      path: '/achievements',
      name: "achievements",
      component: AppPageAchievements,
    },
    {
      path: '/user',
      name: "user",
      redirect: '/user/info',
      component: AppPageUser,
      children: [
        {
          path: 'avatar',
          component: TabAvatar,
        },
        {
          path: 'info',
          component: TabInfo,
        },
        {
          path: 'stats',
          component: TabStats,
        },
        {
          path: 'reset',
          component: TabReset,
        },
      ],
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
