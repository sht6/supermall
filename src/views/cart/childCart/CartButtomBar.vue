<template>
  <div class="buttom-bar">
    <div class="select-all">
      <check-button
        :isChecked="isSelectAll"
        class="check-button"
        @click.native="clickSelectAll"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计: ¥{{ totalPrice }}</div>
    <div class="buy-product" @click="calcClick">去计算({{ cartCount }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";

import { mapGetters } from "vuex";

export default {
  name: "CartButtomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return this.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.nowPrice * item.count;
        }, 0)
        .toFixed(2);
    },
    cartCount() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length == 0) return false;
      // 使用filter
      // return !this.cartList.filter((item) => !item.checked).length;
      // 使用find
      // return !this.cartList.find((item) => !item.checked);

      // 普通遍历
      for (let item of this.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    clickSelectAll() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    // 判断去计算时，购物车里面的数据有没有，然后弹出文字
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请去选择喜欢的商品添加到购物车", 1500);
      }
    },
  },
};
</script>

<style scoped>
.buttom-bar {
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 50px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
.buttom-bar .select-all {
  width: 60px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.buttom-bar .select-all .check-button {
  line-height: 20px;
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.buttom-bar .total-price {
  flex: 1;
  margin-left: 20px;
}
.buttom-bar .buy-product {
  width: 100px;
  background-color: var(--color-tint);
  text-align: center;
}
</style>
