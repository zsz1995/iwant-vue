import Vue from "vue"
import Vuex from "vuex"
import {getToken, setToken} from "@/request/token";
import {login} from "@/api/login";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: "",
    username: "",
    avatar: "",
    token: getToken()
  },
  mutations: {
    SET_TOKEN: ((state, token) => {
      state.token = token
    }),
    
    SET_USERNAME: ((state, username) => {
      state.username = username
    }),
    
    SET_AVATAR: ((state, avatar) => {
      state.avatar = avatar
    }),
    
    SET_ID: ((state, id) => {
      state.id = id
    })
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        login(user.username, user.password).then(data => {
          commit('SET_TOKEN', data["token"]);
          setToken(data["token"]);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  modules: {}
})
