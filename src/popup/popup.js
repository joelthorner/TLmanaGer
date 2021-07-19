
import Vue from 'vue'
import App from './App'

import BootstrapVue from 'bootstrap-vue'
import rippleJS from 'vanilla-ripplejs' // no remove, works

Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
