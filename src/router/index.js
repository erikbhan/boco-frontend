import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import NewPasswordView from "../views/NewPasswordView";

const routes = [
  {
    path: "/endre", //Endre før push
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/register",
    name: "register",
    // route level code-splitting
    // this generates a separate chunk (register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/ChatView.vue"),
  },

  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/newPassword",
    name: "newPassword",
    component: NewPasswordView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
