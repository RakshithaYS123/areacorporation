import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import UserDashboard from "../views/UserDashboard.vue";
import CorporationDashboard from "../views/CorporationDashboard.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/register", name: "Register", component: Register },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/user-dashboard",
    name: "UserDashboard",
    component: UserDashboard,
    meta: { requiresAuth: true, userType: "user" },
  },
  {
    path: "/corporation-dashboard",
    name: "CorporationDashboard",
    component: CorporationDashboard,
    meta: { requiresAuth: true, userType: "corporation" },
  },
  { path: "/:pathMatch(.*)*", redirect: "/" }, // Redirect unknown routes to Home
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  if (to.meta.requiresAuth && !token) {
    return next({ name: "Login" });
  }

  if (to.meta.userType && to.meta.userType !== userType) {
    return next({ name: "Home" });
  }

  next();
});

export default router;
