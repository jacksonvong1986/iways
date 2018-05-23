import Vue from 'vue'
import Router from 'vue-router'
import Scene from './scene'
import ZhiKu from './zhiku'

import Index from '../page/index.vue'
import Login from '../page/login/login.vue'
import Home from '../page/home/index.vue'

import qggk from '../page/zhiku/cyc/sales/countrySituation.vue'

Vue.use(Router);

export default new Router({
	mode: 'hash',
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/home',
      children: [
        {path: 'home', component: Home},
        ...Scene,
        ...ZhiKu,
      ]
    },


    {path: '/login', name: 'login', component: Login},
    {path: '/logout', name: 'logout'},
    {path: '*', redirect: '/home'},
  ]
})
