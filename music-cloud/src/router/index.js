import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index.js'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/itemMusic',
    name:'ItemMusic',
    component:()=>import('../views/ItemMusic.vue')
  },
  {
    path:'/search',
    name:'Search',
    component:()=>import('../views/Search.vue')
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import('../views/Login.vue')
  },
  {
    path:'/me',
    name:'Me',
    component:()=>import('../views/Me.vue'),
    beforeEnter:(to,from,next)=>{
      if(store.state.isLogin||localStorage.getItem('token')||store.state.token)
        next()
      else{
        next('/login')
      }
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from)=>{  //路由改变前触发
  if(to.path=='/login'||to.path=='/me')
  {
    store.state.isFooterMusic=false}
  else{
    store.state.isFooterMusic=true
  }
})

export default router
