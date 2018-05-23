import Vue from 'vue'

export const ADMIN_SIGNIN = 'ADMIN_SIGNIN' //登录成功
export const ADMIN_SIGNOUT = 'ADMIN_SIGNOUT' //退出登录
export const ADMIN_MENUS = 'ADMIN_MENUS' //初始化节点
export const ADMIN_REFRESH_TOKEN = 'ADMIN_REFRESH_TOKEN' //刷新令牌

export default {
  strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
  state: function() {
    return JSON.parse(sessionStorage.getItem('admin')) || {};
  },
  actions: {
    [ADMIN_SIGNIN]({commit}, admin) {
      commit(ADMIN_SIGNIN, admin)
    },
    [ADMIN_SIGNOUT]({commit}) {
      commit(ADMIN_SIGNOUT)
    },
    [ADMIN_MENUS]({commit}, menus) {
      commit(ADMIN_MENUS, menus)
    },
    [ADMIN_REFRESH_TOKEN]({commit}, token) {
      commit(ADMIN_REFRESH_TOKEN, token)
    },
  },
  mutations: {
    [ADMIN_SIGNIN](state, admin) {
      sessionStorage.setItem('admin', JSON.stringify(admin))
      Object.assign(state, admin)
    },
    [ADMIN_SIGNOUT](state) {
      sessionStorage.removeItem('admin')
      Object.keys(state).forEach(k => Vue.delete(state, k))
    },
    [ADMIN_MENUS](state, menus) {
      var admin = JSON.parse(sessionStorage.getItem('admin'))
      admin['menus'] = menus
      sessionStorage.setItem('admin', JSON.stringify(admin))
      Object.assign(state, admin)
    },
    [ADMIN_REFRESH_TOKEN](state, token) {
      var admin = JSON.parse(sessionStorage.getItem('admin'))
      admin['token'] = token
      sessionStorage.setItem('admin', JSON.stringify(admin))
      Object.assign(state, admin)
    },
  },
}
