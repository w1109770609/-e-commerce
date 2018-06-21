import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './until/http'
import '../static/reset.css'
import '../static/font/iconfont.css'
import Lazload from 'vue-lazyload';
import toast from './until/toast/toast'
Vue.use(toast,{
  timeout:2000
})
Vue.use(http)
Vue.use(Lazload, {
  loading: '../static/image/1.gif',
})
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
