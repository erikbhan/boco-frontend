import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";

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
    component: () => import("../views/CommunityViews/CommunityView.vue"),
  },
  {
    path: "/help",
    name: "help",
    component: () => import("../views/HelpView.vue"),
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: () => import("../views/UserProfileViews/ProfileView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/profile/history",
    name: "history",
    component: () => import("../views/UserProfileViews/RentHistoryView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/profile/communities",
    name: "myCommunities",
    component: () => import("../views/UserProfileViews/MyCommunitiesView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/UserAuthViews/RegisterView.vue"),
  },
  {
    path: "/messages",
    name: "messages",
    component: () => import("../views/ChatViews/ChatView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/UserAuthViews/LoginView.vue"),
  },
  {
    path: "/newPassword",
    name: "newPassword",
    component: () => import("../views/UserAuthViews/NewPasswordView"),
    beforeEnter: guardRoute,
  },
  {
    path: "/searchItemList",
    name: "searchItemList",
    component: () => import("../views/ItemViews/SearchItemListView.vue"),
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: () => import("../views/UserAuthViews/ResetPasswordView.vue"),
  },
  {
    path: "/newCommunity",
    name: "newCommunity",
    component: () => import("../views/CommunityViews/NewCommunityView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/community/:communityID/memberlist",
    name: "memberlist",
    component: () => import("../views/CommunityViews/MemberListView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/newItem",
    name: "newItem",
    component: () => import("../views/ItemViews/NewItemView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/community/:communityID",
    name: "communityHome",
    component: () => import("../views/CommunityViews/CommunityHomeView.vue"),
  },
  {
    path: "/community/:communityID/private/join",
    name: "communityRequest",
    component: () => import("../views/CommunityViews/CommunityRequestView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/TestView.vue"),
  },
  {
    path: "/community/:communityID/admin",
    name: "CommunityAdminView",
    component: () => import("@/views/CommunityViews/AdminView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/itempage/:id",
    name: "ItemInfo",
    component: () => import("../views/RentingViews/ItemInfoPageView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/item/:id/edit",
    name: "editItem",
    component: () => import("../views/ItemViews/EditItemView.vue"),
    beforeEnter: guardRoute,
  },
  {
    path: "/user/userItems",
    name: "UserItems",
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
