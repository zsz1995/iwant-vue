import axios from "axios"
import {Message} from "element-ui"

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10 * 1000
});


// request 拦截器
service.interceptors.request.use(
config => {
  return config
},
error => {
  Message.error("请求超时");
  return Promise.resolve(error)
});

service.interceptors.response.use(
response => {
  const res = response.data;
  if (response.status && response.status === 200 && res.errorCode !== 0) {
    Message.error(res.errorMsg);
    return res
  }
  return res
},
error => {
  if (error.response.status === 504 || error.response.status === 404) {
    Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  } else if (error.response.status === 403) {
    Message.error({message: '权限不足,请联系管理员!'});
  } else {
    Message.error({message: '未知错误!'});
  }
  return Promise.resolve(error);
}
);


export default service
