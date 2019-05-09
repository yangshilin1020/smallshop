import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect:'/welcome',
      children :[
        {path:'/welcome',name:'welcome',component:Welcome}
      ]
    }
  ]
})
router.beforeEach((to,from,next)=>{
     if(to.path === '/login') return next()
     if(!sessionStorage.getItem('token')) return next('/login')
     next()
})


export default  router