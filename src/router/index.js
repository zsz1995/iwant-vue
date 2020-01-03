import router from "./router"
import NProgress from "nprogress"
import 'nprogress/nprogress.css'// progress bar style
import config from "@/settings"
import {getToken} from "@/utils/auth";
import store from "@/store"


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " | " + config.title
  }
  NProgress.start();
  const token = getToken();
  if (token && "undefined" !== token) {
    if (to.path === "/login") {
      next({path: "/"});
      NProgress.done()
    } else {
      if (store.getters.avatar.length === 0) {
        store.dispatch("GetInfo").then(() => {
        }).catch(error => {
          console.log(error);
        })
      }
      next()
    }
  } else {
    next();
    NProgress.done()
    
  }
  
});

router.afterEach(() => {
  NProgress.done() // finish progress bar
});
