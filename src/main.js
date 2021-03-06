// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { AjaxPlugin, ToastPlugin, LoadingPlugin } from 'vux'
import { util } from './util/util'

Vue.config.productionTip = false
Vue.use(ToastPlugin, { position: 'top' })
Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(util)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
