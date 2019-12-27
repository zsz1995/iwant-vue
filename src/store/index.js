import Vue from "vue"
import Vuex from "vuex"
import {login, doRegister} from "@/api/login";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    currentUser: {}
  },
  mutations: {
    
    SET_ISLOGIN: ((state, isLogin) => {
      state.isLogin = isLogin
    }),
    
    SET_USER: ((state, user) => {
      state.user = user
    })
    
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        login(user.username, user.password).then(data => {
          commit("SET_ISLOGIN", true);
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    register({commit}, input) {
      return new Promise(((resolve, reject) => {
        doRegister(input.username, input.password).then(res => {
          commit("SET_ISLOGIN", false);
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      }))
    },
    frontLogout({commit}) {
      return new Promise(() => {
        commit('SET_TOKEN', "");
        commit('SET_ID', "");
        commit('SET_USERNAME', "");
      }).catch(() => {
      })
    }
  },
  modules: {}
})
