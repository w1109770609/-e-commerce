import Home from '@/views/home/home.vue'
import Index from '@/views/index/index.vue'
import Classify from '@/views/classify/classify.vue'
import Shopcar from '@/views/shopcar/shopcar.vue'
import Mine from '@/views/mine/mine.vue'
import Search from '@/views/search/search.vue'
import Detail from '@/views/detail/detail.vue'
import Login from '@/views/login/login.vue'
import Register from '@/views/register/register.vue'
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
];
export default routes;
