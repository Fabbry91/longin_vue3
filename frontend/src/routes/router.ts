import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

const routes:RouteRecordRaw[] = [
    {
        path: "/",
        alias: "/home",
        name: "home",
        component: () => import("../pages/Home.vue"),
        meta: { requiresAuth: true } // Ruta privada
    },
    {
        path: "/",
        alias: "/user/:id",
        name: "edit",
        component: () => import("../components/CardUser.vue"),
        meta: { requiresAuth: true } // Ruta privada
      },
    {
        path: "/login",
        component: () => import("../auth/Login.vue"),
      },
     {
        path: "/register",
        component: () => import("../auth/Register.vue"),
      },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

