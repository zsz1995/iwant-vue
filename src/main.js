import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui"
import layer from "vue-layer"
import "@/assets"

Vue.use(ElementUI);
Vue.prototype.$layer = layer(Vue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
