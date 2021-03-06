import Vue from 'vue'

export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录
export const USER_MENUS = 'USER_MENUS' //初始化节点
export const USER_REFRESH_TOKEN = 'USER_REFRESH_TOKEN' //刷新令牌
export const USER_DIMENSION = 'USER_DIMENSION' //退出登录

export default {
  state: function() {
    let user = JSON.parse(Vue.cookies.get('user')) || {} 
    user['menus'] = JSON.parse(localStorage.getItem('menus')) || []
    if (!user['menus'] || user['menus'].length == 0) {
      Vue.cookies.remove('user')
      return {}
    }
    return user
  },
  mutations: {
    [USER_SIGNIN](state, user) {
      localStorage.removeItem('iways_uuid')
      localStorage.removeItem('iways_uuid_b')
      Vue.cookies.set('user', JSON.stringify(user), 3600 * 12, '/') 
      Object.assign(state, user)
    },
    [USER_SIGNOUT](state) {
      Vue.cookies.remove('user') 
      Object.keys(state).forEach(k => Vue.delete(state, k))
    },
    [USER_REFRESH_TOKEN](state, token) {
      var user = JSON.parse(Vue.cookies.get('user')) || {} 
      user['token'] = token
      Vue.cookies.set('user', JSON.stringify(user), 3600 * 12, '/') 
      Object.assign(state, user)
    },
    [USER_MENUS](state, menus) {
      localStorage.setItem('menus', JSON.stringify(menus))
    },
    [USER_DIMENSION](state, dimension) {
      var user = JSON.parse(Vue.cookies.get('user')) || {} 
      user['dimension'] = dimension
      Vue.cookies.set('user', JSON.stringify(user), 3600 * 12, '/') 
      Object.assign(state, user)
    },
  },
  actions: {
    [USER_SIGNIN]({commit}, user) {
      commit(USER_SIGNIN, user)
    },
    [USER_SIGNOUT]({commit}) {
      commit(USER_SIGNOUT)
    },
    [USER_REFRESH_TOKEN]({commit}, token) {
      commit(USER_REFRESH_TOKEN, token)
    },
    [USER_MENUS]({commit}, menus) {
      commit(USER_MENUS, menus)
    },
    [USER_DIMENSION]({commit}, dimension) {
      commit(USER_DIMENSION, dimension)
    },
  }
}