import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);
const state = {
  cartList: [],
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

// 取挂载到vue实例上
export default store;
