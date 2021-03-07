import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

import { auth } from "../services/firebase";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requireAuth);
  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
