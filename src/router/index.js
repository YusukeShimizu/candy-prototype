import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../Main.vue";
import Login from "../Login.vue";
import firebase from "firebase/app";
import "firebase/auth";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    meta: { requiresAuth: true },
    component: Main
  },
  {
    path: "/Login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    // 認証状態を取得
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next();
      } else {
        // 認証されていない場合、認証画面へ
        next({ name: "Login" });
      }
    });
  } else {
    next();
  }
});

export default router;
