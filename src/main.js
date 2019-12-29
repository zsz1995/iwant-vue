import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import ElementUI from "element-ui"
import layer from "vue-layer"
import md5 from "js-md5"
import "@/assets"
import request from "@/utils/request"
import "@/router/index"
Vue.use(ElementUI);

Vue.prototype.$layer = layer(Vue);
Vue.prototype.$md5 = md5;
Vue.prototype.$request = request;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
