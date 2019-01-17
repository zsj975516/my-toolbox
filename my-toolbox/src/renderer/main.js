import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import api from './plugin/api'

import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(api)
Vue.use(elementUI)

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  store,
  template: '<App ref="root"/>'
}).$mount('#app')
