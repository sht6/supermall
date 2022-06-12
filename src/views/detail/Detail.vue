<template>
  <div id="detail">
    <DetailNavBar
      class="detail-nav"
      @titleClick="titleClick"
      ref="navbar"
    ></DetailNavBar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <goods-base-info :goods="goods"></goods-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goodsList="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backTop" v-if="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import GoodsBaseInfo from "./childComps/GoodsBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "../../common/utils";
import { mapActions } from "vuex";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      isShowBackTop: false,
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    GoodsBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    BackTop,
    GoodsList,
  },
  created() {
    //   保存传入的iid

    this.iid = this.$route.params.iid;

    // 获取详情页的数据
    getDetail(this.iid).then((res) => {
      // 2.1.获取结果
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2.3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 获取商家的数据
      this.shop = new Shop(data.shopInfo);

      // 获取商品数据
      this.detailInfo = data.detailInfo;

      // 获取参数数据
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 获取评论数据
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }

      /* // 第一次渲染：
      // this.$refs.params.$el这个没有值，还没有被渲染玩
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // 其他页面渲染完成之后，在进行这个函数的回调
      // 第二次获取
      // 从home点进去，图片是没有加载完成的，就是图片没有就算再offsetTop之内
      this.$nextTick(() => {
        // 根据最新的数据，对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
        // offsetTop值不对的时候，都是因为图片的问题
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      }); */

      // 给getThemeTopY进行赋值(对给getThemeToyYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
      }, 100);
    });
    // 获取推荐列表的数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 获取滚动的位置
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;

      // 获取y值
      const positionY = -position.y;

      /*
        2.再positionY和主题中值进行对比
        再0-1之间，index为0
        再1-2之间，index为1
        再2-3之间，index为2
        再3之上或者等于三，index为3

      */
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // hack方法
        if (
          positionY >= this.themeTopYs[i] &&
          positionY <= this.themeTopYs[i + 1]
        ) {
          if (this.currentIndex != i) {
            this.currentIndex = i;
            this.$refs.navbar.currentIndex = this.currentIndex;
          }
        }

        // 普通情况
        // if (
        //   this.currentIndex != i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   this.$refs.navbar.currentIndex = this.currentIndex;
        // }
      }
    },
    // 点击详情页的导航栏，然后滚动到相应的位置
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    // 将商品添加到购物车
    addToCart() {
      // 创建一个对象，把购物车需要的数据存储起来
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.nowPrice = this.goods.nowPrice;
      product.iid = this.iid;

      //将商品添加到购物车里，面(1.Promise  2.mapActions)
      // this.$store.commit("addCart", product);
      this.addCart(product).then((res) => {
        console.log(this.$toast);
        this.$toast.show(res, 2000);
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        // }, 1500);
      });

      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  background-color: #fff;
  z-index: 9;
}
.content {
  /* height: calc(100%-44px); */
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 50px;
}
</style>
