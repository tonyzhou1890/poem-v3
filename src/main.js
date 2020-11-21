// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './icons' // icon

import './directives/loading' // v-loading

import '@/styles/index.less'

// 服务端渲染，不需要进度条了
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css'// progress bar style

// NProgress.configure({ showSpinner: false })// NProgress Configuration
// router.beforeEach((to, from, next) => {
//   NProgress.start() // start progress bar
//   next()
// })

// router.afterEach(() => {
//   NProgress.done() // finish progress bar
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
