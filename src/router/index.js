import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/CommunityViews/CommunityView.vue";
import LoginView from "../views/FormViews/LoginView.vue";
import NewPasswordView from "../views/FormViews/NewPasswordView";

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
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: () => import("../views/UserProfileViews/ProfileView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/FormViews/RegisterView.vue"),
  },
  {
    path: "/messages",
    name: "messages",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "../views/ChatViews/ChatView.vue"
      ),
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
    component: () => import("../views/CommunityViews/SearchItemListView.vue"),
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: () => import("../views/FormViews/ResetPasswordView.vue"),
  },
  {
    path: "/createNewGroup",
    name: "createNewGroup",
    component: () => import("../views/CommunityViews/NewCommunityView.vue"),
  },
  {
    path: "/group/:id/memberlist",
    name: "memberlist",
    component: () => import("../views/CommunityViews/MemberListView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/addNewItem",
    name: "addNewItem",
    component: () => import("../views/CommunityViews/NewItemView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/notifications",
    name: "notifications",
    component: () => import("../views/NavigationViews/NotificationView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/user/:id/groups",
    name: "myGroups",
    component: () => import("../views/CommunityViews/MyCommunitiesView.vue"),
  },
  {
    path: "/groupHomePage",
    name: "GroupHome",
    component: () => import("../views/CommunityViews/CommunityHomeView.vue"),
    beforeEnter: guardRoute,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
