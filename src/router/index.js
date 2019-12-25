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
        component: () =>
        import("@/views/Index.vue")
      },
      {
        path: "/notice",
        component: () =>
        import("@/views/Notice.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router
