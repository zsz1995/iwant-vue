import request from "@/utils/request"

export function login(username, password) {
  return request({
    url: "auth/login",
    method: "post",
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: "auth/info",
    method: "get"
  })
}

export function logout() {
  return request({
    url: "auth/logout",
    method: "get"
  })
}

export function register(username, password) {
  const data = {
    username,
    password
  };
  return request({
    url: "/auth/register",
    method: "post",
    data
  })
}




