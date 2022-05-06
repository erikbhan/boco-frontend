import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";

/**
 * Guards routes.
 * If token is null, no user is logged in and only the
 * login, register, reset password, help and listing of public groups and items pages will be accessible.
 * Without a token the user gets redirected to the login page when trying to access guard routed pages.
 */
function guardRoute(to, from, next) {
  let isAuthenticated = store.state.user.token != null;
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next("/login"); // go to the login page
  }
}

/**
 * Guards routes for administartors. If token is null or
 * the user is not the administrator of the group, the user gets sent to the home page.
 */
function isAdmin(to, from, next) {
  if (store.state.user.adminList.includes(parseInt(from.params.communityID)))
    next(); // allow to enter route
  else
    next("/"); // go to the home page
}


const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/CommunityViews/CommunityView.vue"),
  },
  {
    path: "/community/:communityID",
    name: "communityHome",
    component: () => import("../views/CommunityViews/CommunityHomeView.vue"),
  },
  {
    path: "/community/:communityID/admin",
    name: "communityAdminPage",
    component: () => import("@/views/CommunityViews/AdminView.vue"),
    beforeEnter: [guardRoute, isAdmin],
  },
  {
    path: "/community/:communityID/memberlist",
    name: "memberlist",
    component: () => import("../views/CommunityViews/MemberListView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/community/:communityID/private/join",
    name: "communityRequest",
    component: () => import("../views/CommunityViews/CommunityRequestView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/help",
    name: "help",
    component: () => import("../views/HelpView.vue"),
  },
  {
    path: "/item/:id/edit",
    name: "editItem",
    component: () => import("../views/ItemViews/EditItemView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/itempage/:id",
    name: "itemInfo",
    component: () => import("../views/RentingViews/ItemInfoPageView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/UserAuthViews/LoginView.vue"),
  },
  {
    path: "/messages",
    name: "messages",
    component: () => import("../views/ChatViews/ChatView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/newCommunity",
    name: "newCommunity",
    component: () => import("../views/CommunityViews/NewCommunityView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/newItem",
    name: "newItem",
    component: () => import("../views/ItemViews/NewItemView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/newPassword",
    name: "newPassword",
    component: () => import("../views/UserAuthViews/NewPasswordView"),
    beforeEnter: guardRoute,
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: () => import("../views/UserProfileViews/ProfileView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/profile/communities",
    name: "myCommunities",
    component: () => import("../views/UserProfileViews/MyCommunitiesView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/profile/history",
    name: "history",
    component: () => import("../views/UserProfileViews/RentHistoryView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/UserAuthViews/RegisterView.vue"),
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: () => import("../views/UserAuthViews/ResetPasswordView.vue"),
  },
  {
    path: "/searchItemList",
    name: "searchItemList",
    component: () => import("../views/ItemViews/SearchItemListView.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/TestView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/user/userItems",
    name: "userItems",
    component: () => import("../views/UserProfileViews/UserItemsView.vue"),
    beforeEnter: guardRoute,
  },

  // Make sure it's your last route definition
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.resolve({
  name: "not-found",
  params: { pathMatch: ["not", "found"] },
}).href;

export default router;
