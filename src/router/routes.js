import { createWebHashHistory, createRouter } from "vue-router";
import store from '../store/index'
const UserList = () => import("../pages/users/UserList.vue");
const RequestList = () => import("../pages/requests/RequestList.vue");
const Login = () => import("../components/Login.vue");
const Layout = () => import("../pages/Layout.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Layout,
    meta: {
      isAuth: true,
    },
    children: [
      {
        path: "/users",
        name: "users",
        component: UserList,
        meta: {
          isAuth: true,
        },
      },
      {
        path: "/requests",
        name: "requests",
        component: RequestList,
        meta: {
          isAuth: true,
        },
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      isAuth: false,
    },
  },
  
  


];

const history = createWebHashHistory();

// create router instance
const router = createRouter({
  history,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { top: 0 };
      // return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});


router.beforeEach((to, from) => {
  if (to.meta.isAuth && !store.state.auth.isAuthenticated) {
    return {
      path: "/login"
    };
  }
});


export default router;
