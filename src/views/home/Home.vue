<template>
  <div id="home">
    <nav-bar id="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :title="['流行', '推荐', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isShowFixed"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="UpdateLoad"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend :recommends="recommend"></recommend>
      <feature></feature>
      <tab-control
        :title="['流行', '推荐', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
        class="tabControl2"
      ></tab-control>

      <goods-list :goodsList="showGoods" class="goods-list"></goods-list>
    </scroll>

    <back-top @click.native="backTop" v-if="isShowBoult"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComs/HomeSwiper.vue";
import Recommend from "./childComs/Recomend.vue";
import Feature from "./childComs/Feature.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeData } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    Recommend,
    Feature,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommend: [],
      // 商品数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBoult: false,
      tabOffsetTop: 0,
      isShowFixed: false,
      saveY: 0,
      itemImgListener: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata();

    // 获取商品的数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1.图片加载的事件处理
    let refresh = debounce(this.$refs.scroll.refresh, 50);
    // 监听item中的图片加载完成
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("homeItemImgLoad", this.itemImgListener);
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getSaveY();

    this.$bus.$off("homeItemImgLoad", this.itemImgListener);
  },
  methods: {
    /*
    事件监听相关的方法

  */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    // 获取滚动的位置
    contentScroll(position) {
      // 判断是否显示箭头
      this.isShowBoult = -position.y > 1000;

      // 判断是否显示tabControl
      this.isShowFixed = -position.y > this.tabOffsetTop;
    },
    // 监听上拉加载方法
    UpdateLoad() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /*
      网络请求相关的方法

    */
    // 获取轮播图和导航栏的数据的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    // 获取商品数据的方法
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeData(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
#home-nav {
  background-color: pink;
  color: #fff;

  /* 为了在原生里面不让导航跟着浏览器滚动 */
  /* position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 8;
}
.goods-list {
  margin-top: 2px;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}

/* .content {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
