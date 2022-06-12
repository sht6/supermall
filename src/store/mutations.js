import { ADD_CARTLIST_COUNT, PUSH_TO_CARTLIST } from "./mutations-types";
export default {
  // mutations唯一的目的就是修改state种状态
  // mutations中的每一个方法尽可能完成的事情比较单一一点
  [ADD_CARTLIST_COUNT](state, payload) {
    payload.count++;
  },
  [PUSH_TO_CARTLIST](state, payload) {
    payload.checked = false;
    state.cartList.push(payload);
  },
};
