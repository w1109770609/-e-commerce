import Home from '@/views/home/home.vue'
import Index from '@/views/index/index.vue'
// import Classify from '@/views/classify/classify.vue'
const Classify = () => import(/* webpackChunkName: "Classify" */ '@/views/classify/classify.vue')
// import Shopcar from '@/views/shopcar/shopcar.vue'
const Shopcar = () => import(/* webpackChunkName: "Shopcar" */ '@/views/shopcar/shopcar.vue')
import Mine from '@/views/mine/mine.vue'
import Search from '@/views/search/search.vue'
import Detail from '@/views/detail/detail.vue'
import Login from '@/views/login/login.vue'
import Register from '@/views/register/register.vue'
import Myorder from '@/views/myorder/myorder.vue'
import Allorder from '@/views/allorder/allorder.vue'
import Obligation from '@/views/obligation/obligation.vue'
import Ungoods from '@/views/ungoods/ungoods.vue'
import Goods from '@/views/goods/goods.vue'
import Aftersale from '@/views/aftersale/aftersale.vue'
import ResultOrder from '@/views/resultOrder/resultOrder.vue'

let routes = [
  {
    path: '/',
    redirect: '/index/home',
  },
  {
    name: 'index',
    path: '/index',
    component: Index,
    children: [
      {
        name: 'home',
        path: 'home',
        component: Home,
      },
      {
        name: 'classify',
        path: 'classify',
        component: Classify,
      },
      {
        name: 'shopcar',
        path: 'shopcar',
        component: Shopcar,
      },
      {
        name: 'mine',
        path: 'mine',
        component: Mine,
      },
    ],
  },
  {
    name: 'search',
    path: '/search',
    component: Search,
  },
  {
    name: 'detail',
    path: '/detail',
    component: Detail,
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
  },
  {
    name: 'resultOrder',
    path: '/resultOrder',
    component: ResultOrder,
  },
  {
    name: 'myorder',
    path: '/myorder',
    component: Myorder,
    children:[
      {
        name:'allorder',
        path:'allorder',
        component: Allorder
      },
      {
        name: 'obligation',
        path: 'obligation',
        component: Obligation
      },
      {
        name: 'ungoods',
        path: 'ungoods',
        component: Ungoods
      },
      {
        name: 'ungoods',
        path: 'ungoods',
        component: Ungoods
      },
      {
        name: 'goods',
        path: 'goods',
        component: Goods
      },
      {
        name: 'aftersale',
        path: 'aftersale',
        component: Aftersale
      }
    ]
  }
];
export default routes;
