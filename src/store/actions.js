import { ADD_CARTLIST_COUNT, PUSH_TO_CARTLIST } from "./mutations-types";

export default {
  addCart(context, payload) {
    //payload表示新添加的商品
    // let oldProduct = null;
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }
    //   查找之前的数组是否含有该商品

    let oldProduct = context.state.cartList.find(
      (item) => item.iid === payload.iid
    );

    if (oldProduct) {
      context.commit(ADD_CARTLIST_COUNT, oldProduct);
    } else {
      payload.count = 1;
      // context.state.cartList.push(payload);
      context.commit(PUSH_TO_CARTLIST, payload);
    }
  },
};
