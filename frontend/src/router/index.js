import {createRouter, createWebHistory} from "vue-router";
import store from "../store";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {requiresAuth: false},
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: true,
      roles: ["User", "Editor", "Admin"],
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/AdminView.vue"),
    meta: {
      requiresAuth: true,
      roles: ["Admin"],
    },
  },
  {
    path: "/editor",
    name: "Editor",
    component: () => import("../views/EditorView.vue"),
    meta: {
      requiresAuth: true,
      roles: ["Editor", "Admin"],
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isLoggedIn;
  const userRoles = store.getters.userRoles;
  const userStatus = store.getters.userStatus;

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next({name: "Login"});
      return;
    }

    if (userStatus !== "Enabled") {
      alert("Your account is not active. Please contact support.");
      store.dispatch("logout");
      next({name: "Login"});
      return;
    }

    if (to.meta.roles && to.meta.roles.length > 0) {
      const hasRequiredRole = to.meta.roles.some((role) =>
        userRoles.includes(role)
      );

      if (!hasRequiredRole) {
        alert("You don't have permission to access this page.");
        next({name: "Home"});
        return;
      }
    }
  }

  if (to.name === "Login" && isAuthenticated) {
    next({name: "Home"});
    return;
  }

  next();
});

export default router;
