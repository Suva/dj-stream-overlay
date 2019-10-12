import Vue from 'vue'
import Router from 'vue-router'
import Overlay from './views/Overlay'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'overlay',
      component: Overlay
    },
    {
      path: '/interface',
      name: 'interface',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "interface" */ './views/Interface.vue')
    }
  ]
})
