import Vue from 'vue'
import Router from 'vue-router'

import Index from '../page/index.vue'
import Login from '../page/login.vue'
import Home from '../page/home/index.vue'
import Group from '../page/account/group.vue'
import Role from '../page/account/role.vue'
import User from '../page/account/user.vue'
import Log from '../page/account/log.vue'
import Module from '../page/auth/module.vue'
import Privilege from '../page/auth/privilege.vue'
import Allot from '../page/auth/allot.vue'
import Article from '../page/article/index.vue'
import ArticleCategory from '../page/article/category.vue'
import Message from '../page/message/index.vue'
import MessageList from '../page/message/list.vue'
import Feedback from '../page/feedback/index.vue'
import FeedbackList from '../page/feedback/list.vue'
import FeedBackDetail from '../page/feedback/detail.vue'
import Shouhou from '../page/shouhou/index.vue'
import ShouhouUpload from '../page/shouhou/upload.vue'
import ShouhouView from '../page/shouhou/view.vue'
import ShouhouCategory from '../page/shouhou/category.vue'
import ShouhouDownload from '../page/shouhou/download.vue'

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index',
      children: [
        {path: 'index/main', component: Home},
        {path: 'system', redirect: 'account'},
        {path: 'account', redirect: 'group'},
        {path: 'group/index', component: Group},
        {path: 'group', component: Group},
        {path: 'role/index', component: Role},
        {path: 'role', component: Role},
        {path: 'user/index', component: User},
        {path: 'user', component: User},
        {path: 'log/index', component: Log},
        {path: 'log', component: Log},

        {path: 'menu/index', component: Module},
        {path: 'menu', component: Module},
        {path: 'node/index', component: Privilege},
        {path: 'node', component: Privilege},
        {path: 'allot', component: Allot},

        {path: 'article', component: Article},
        {path: 'article/index', component: Article},
        {path: 'article_category/index', component: ArticleCategory},

        {path: 'message',  redirect: 'message/index'},
        {path: 'message/index', component: Message},
        {path: 'message/list', component: MessageList},

        {path: 'feedback',  redirect: 'feedback/index'},
        {path: 'feedback/index', component: Feedback},
        {path: 'feedback/list', component: FeedbackList},
        {path: 'feedback/detail', component: FeedBackDetail},

        {path: 'shouhou/index', component: Shouhou},
        {path: 'shouhou/upload', component: ShouhouUpload},
        {path: 'shouhou/view', component: ShouhouView},
        {path: 'shouhou/category', component: ShouhouCategory},
        {path: 'shouhou/download', component: ShouhouDownload},

      ]
    },
    {path: '/login', name: 'login', component:Login},
    {path: '/logout', name: 'logout'},
    {path: '*', redirect: 'index/main'},
  ]
})
