import request from "@/request"

export function login(username, password) {
  return request({
    url: "/login?username=" + username + "&password=" + password,
    method: "post"
  })
}

export function register(username, password) {
  const data = {
    username,
    password
  };
  return request({
    url: "/register",
    method: "post",
    data
  })
}




