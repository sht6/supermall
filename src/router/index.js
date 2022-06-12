import Vue from "vue";
import VueRouter from "vue-router";

// 1.通过Vue.use安装路由
Vue.use(VueRouter);

// 2.定义路由映射
const home = () => import("views/home/Home");
const category = () => import("views/category/Category");
const cart = () => import("views/cart/Cart");
const profile = () => import("views/profile/Profile");
const detail = () => import("views/detail/Detail");

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: home,
  },
  {
    path: "/category",
    component: category,
  },
  {
    path: "/cart",
    component: cart,
  },
  {
    path: "/profile",
    component: profile,
  },
  {
    path: "/detail/:iid",
    component: detail,
  },
];

// 3.创建对象
const router = new VueRouter({
  mode: "history",
  routes,
});

// 4.到处对象
export default router;
