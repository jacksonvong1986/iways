import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../page/index.vue'
import Home from '../page/home.vue'
import About from '../page/about.vue'
import Contact from '../page/contact.vue'
import Login from '../page/login.vue'
import OosLogin from '../page/oos_login.vue'
import OosLogout from '../page/oos_logout.vue'
import NewsIndex from '../page/news/index.vue'
import NewsHome from '../page/news/home.vue'
import NewsList from '../page/news/list.vue'
import NewsDetail from '../page/news/detail.vue'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/home',
      children: [
        {path: '/home', component: Home},
        {
          path: '/news',
          component: NewsIndex,
          children:[
            {path: '/news', component: NewsHome},
            {path: '/news/list', component: NewsList},
            {path: '/news/detail', component: NewsDetail},
          ]
        },
      ]
    },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login },
    { path: '/oos_login', component: OosLogin },
    { path: '/oos_logout', component: OosLogout },
  ],
})
