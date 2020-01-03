import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from "element-ui"
import layer from "vue-layer"
import VueAMap from "vue-amap";
import store from './store'
import "@/assets"
import "@/router/index"
import md5 from "js-md5"
import request from "@/utils/request"
import {formatDate} from "element-ui/src/utils/date-util";
import {formatTime} from "@/utils/time";

Vue.use(ElementUI);
Vue.use(VueAMap);

Vue.prototype.$layer = layer(Vue);
Vue.prototype.$md5 = md5;
Vue.prototype.$request = request;
Vue.prototype.$formatDate = formatDate;
Vue.config.productionTip = false;

VueAMap.initAMapApiLoader({
  key: '27d903a6173e5eca28b91cb77590004f',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
});
// 时间格式化
Vue.filter('formatTime', formatTime);
Vue.filter('formatDate', formatDate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
