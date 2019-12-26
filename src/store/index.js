import Vue from "vue"
import Vuex from "vuex"
import {getToken, removeToken, setToken} from "@/request/token";
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
          commit('SET_TOKEN', data.token);
          commit('SET_ID', data.user.id);
          commit('SET_USERNAME', data.user.username);
          setToken(data["token"]);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    frontLogout({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', "");
        commit('SET_ID', "");
        commit('SET_USERNAME', "");
        removeToken();
        resolve()
      }).catch(error => {
        Promise.reject(error)
      })
    }
  },
  modules: {}
})
