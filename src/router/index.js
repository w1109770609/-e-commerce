import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)
import { getCookie } from '../until/cookie'
let router = new VueRouter({
  mode:'history',
  routes
})
export default router

router.beforeEach((to,from,next)=>{
  if (to.name === 'mine' || to.name === 'shopcar'){
    let token = getCookie('keyword')
    if (!token){
      next({
        name:'login',
        query: { from: to.name}
      })
    }else{
      next()
    }
  }else{
    next()
  }
})
