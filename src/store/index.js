import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user' // 引入user.js

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    isLogin: (state) => state.user.isLogin,
    username: (state) => state.user.username,
    userId: (state) => state.user.userId,
    userInfoObj: (state) => state.user.userInfoObj
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
