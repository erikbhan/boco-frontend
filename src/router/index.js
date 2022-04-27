import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import NewPasswordView from "../views/NewPasswordView";

/**
 * Guards routes. If token is null, no user is logged in and only the
 * login page and the register page will be accessible.
 */
function guardRoute(to, from, next) {
  let isAuthenticated = store.state.user.token != null;
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next("/login"); // go to '/login';
  }
}

const routes = [
  {
    path: "/", //Endre før push
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/messages",
    name: "messages",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/ChatView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/newPassword",
    name: "newPassword",
    component: NewPasswordView,
    beforeEnter: guardRoute,
  },
  {
    path: "/searchItemList",
    name: "searchItemList",
    component: () => import("../views/SearchItemListView.vue"),
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: () => import("../views/ResetPasswordView.vue"),
  },
  {
    path: "/createNewGroup",
    name: "createNewGroup",
    component: () => import("../views/CreateNewGroupView.vue"),
  },
  {
    path: "/group/:id/memberlist",
    name: "memberlist",
    component: () => import("../views/MemberListView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/addNewItem",
    name: "addNewItem",
    component: () => import("../views/AddNewItemView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/notifications",
    name: "notifications",
    component: () => import("../views/NotificationView.vue"),
    beforeEnter: guardRoute,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
