import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'


import http from './common/http'
import './common/prototype'
import './common/filters'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI, {locale});

Vue.prototype.$http = http

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
