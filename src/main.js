import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toast from "components/common/toast";

import VueLazyload from "vue-lazyload";

import FastClick from "fastclick";

Vue.use(toast);
Vue.use(VueLazyload, {
  loading: require("./assets/img/common/2.jpg"),
});

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();

// 解决移动端300ms延迟
FastClick.attach(document.body);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
