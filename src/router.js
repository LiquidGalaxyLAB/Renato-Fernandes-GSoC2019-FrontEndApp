import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/:name/sensorDetail',
      name: 'SensorDetail',
      component: () => import('./views/SensorDetail.vue'),
      props: true
    },
    {
      path: '/sensorlist',
      name: 'sensorList',
      component: () => import('./views/SensorList.vue')
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('./views/auth/SignUp.vue')
    },{
      path: '/signin',
      name: 'signin',
      component: ()=> import('./views/auth/SignIn.vue')
    },{
      path: '/dashboard',
      name : 'dashboard',
      component: ()=>import('./views/auth/DashBoard.vue')
    }
  ]
})