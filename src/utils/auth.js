import cookie from "js-cookie"
import config from "@/settings"

const TokenKey = config.TokenKey;

export function getToken() {
  return cookie.get(TokenKey)
}


export function setToken(token) {
  return cookie.set(TokenKey, token)
}

export function removeToken() {
  return cookie.remove(TokenKey)
}

