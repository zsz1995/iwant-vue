import {getToken, setToken, removeToken} from "@/utils/auth";
import {login, getInfo, logout} from "@/api/login";

const user = {
  state: {
    token: getToken(),
    user: {},
    avatar: "",
    roles: [],
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    }
  },
  
  actions: {
    // 登录
    Login({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password).then(res => {
          if(res.success) {
            const data = res.data;
            setToken(data.token);
            commit('SET_TOKEN', data.token);
            setUserInfo(data, commit);
            resolve(res)
          } else {
            reject(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
  
    // 获取用户信息
    GetInfo({commit}) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          setUserInfo(res, commit);
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({commit}) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          logOut(commit);
          resolve(res)
        }).catch(error => {
          logOut(commit);
          reject(error)
        })
      })
    }
  }
};

export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (res.roles && res.roles.length === 0) {
    commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
  } else {
    commit('SET_ROLES', res.roles)
  }
  commit('SET_USER', res.account)
};

export const logOut = (commit) => {
  commit('SET_TOKEN', '');
  commit('SET_ROLES', []);
  removeToken()
};

export default user
