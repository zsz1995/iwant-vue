import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter);

export const constantRouterMap = [
  {
    path: "/login",
    meta: {title: "登录", noCache: true},
    component: r => require.ensure([], () => r(require('@/views/Login')), 'Login')
  }, {
    path: "/register",
    meta: {title: "注册", noCache: true},
    component: r => require.ensure([], () => r(require('@/views/Register')), 'Register')
  }, {
    path: '/',
    meta: {title: "首页", noCache: true},
    redirect: "/latest",
    component: Index,
    children: [
      {
        path: "/latest",
        meta: {title: "最新活动", noCache: true},
        component: r => require.ensure([], () => r(require('@/views/meeting/Latest')), 'Latest')
      },
      {
        path: "/meetings",
        meta: {title: "所有活动", noCache: true},
        component: r => require.ensure([], () => r(require('@/views/Login')), 'AllMeeting')
      },
      {
        path: "/usercenter",
        meta: {title: "个人中心", noCache: true},
        redirect: "/filluser",
        component: r => require.ensure([], () => r(require('@/views/user/UserCenter')), 'UserCenter'),
        children: [
          {
            path: "/filluser",
            meta: {title: "信息维护", noCache: true, breadCrumb : [{title: "个人中心"}, {title: "信息维护"}]},
            component: r => require.ensure([], () => r(require('@/views/user/FillUser')), 'FillUser'),
          }
        ]
        
      }
    ]
  }
];


export default new VueRouter({
  // mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
