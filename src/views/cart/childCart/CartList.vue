<template>
  <div class="content">
    <scroll class="scroll">
      <cart-list-item
        class="cart-list-item"
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";

import CartListItem from "./CartListItem.vue";

import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style scoped>
.content {
  height: calc(100% - 44px - 49px -40px);
}
.scroll {
  height: 100%;
  overflow: hidden;
}
.cart-list-item {
  height: 100%;
}
</style>
