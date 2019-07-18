import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/front',
      name: 'home',
      component: Home
    },
    {
      path: '/front/map',
      name: 'map',
      component: () => import('./views/map.vue')
    },
    {
      path: '/front/:name/sensorDetail',
      name: 'SensorDetail',
      component: () => import('./views/SensorDetail.vue'),
      props: true
    },
    {
      path: '/front/sensorlist',
      name: 'sensorList',
      component: () => import('./views/SensorList.vue')
    },
    {
      path: '/front/signup',
      name: 'SignUp',
      component: () => import('./views/auth/SignUp.vue')
    },{
      path: '/front/signin',
      name: 'signin',
      component: ()=> import('./views/auth/SignIn.vue')
    },{
      path: '/front/dashboard',
      name : 'dashboard',
      component: ()=>import('./views/auth/DashBoard.vue')
    },{
      path: '/front/sensorregister',
      name : 'sensorregister',
      component: ()=>import('./views/SensorRegister.vue')
    },{
      path: '/front/:nameOld/editsensor',
      name : 'editsensor',
      component: ()=>import('./views/SensorEdit.vue'),
      props: true
    }
  ]
})