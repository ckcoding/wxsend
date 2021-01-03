import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/Users.vue'
import Send from '../components/Send.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'./login'
   
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect:'/welcome',
    children:
    [
      {path: '/welcome',component: Welcome},
    {path: '/users',component: Users},
    {path: '/send',component: Send}

  ]
  }
 
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]
  
const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path ==='/login') return next()
  const tokenStr =window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

export default router
