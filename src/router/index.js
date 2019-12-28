import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: "/",
        component: r => require.ensure([], () => r(require('@/views/Index')), 'index')
      },
      {
        path: "/meeting",
        component: r => require.ensure([], () => r(require('@/views/AllMeeting')), 'AllMeeting')
      },
      {
        path: "/eidtUser",
        component: r => require.ensure([], () => r(require('@/views/user/UserEdit')), 'UserEdit')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});



export default router
