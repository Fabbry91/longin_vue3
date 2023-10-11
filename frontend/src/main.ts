import { createApp } from "vue";
import App from "./App.vue";
import {router} from "./routes/router";
import store from "./store";
import { authHeader } from "./services/auth-header";

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log(requiresAuth)
  if (requiresAuth && !authHeader()) {
    next('/login'); // Redirige a la página de inicio de sesión si no está autenticado
  } else {
    next(); // Continúa con la navegación
  }
});

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
