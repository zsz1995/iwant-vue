import axios from "axios"
import {Message} from "element-ui"

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10 * 1000
});


// request 拦截器
service.interceptors.request.use(
config => {
  console.log(process.env.BASE_URL)
  return config
},
error => {
  Promise.reject(error)
});

service.interceptors.response.use(
response => {
  // 全局统一处理 session
  if (response.headers["session_time_out"] === "timeout") {
    console.log("timeout");
    return Promise.reject("error")
  }
  const res = response.data;
  if (res.errorCode !== 0) {
    Message.error(res.errorMsg);
    return Promise.reject("error")
  }else {
    return res.data;
  }
  
},
error => {
  Message.error("连接超时");
  return Promise.reject(error)
}
);


export default service
