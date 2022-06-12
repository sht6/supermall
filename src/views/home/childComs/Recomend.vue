<template>
  <div class="recommend">
    <div class="item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  flex: 1;
  width: 100%;
  text-align: center;
  padding: 20px 7px 20px;
  font-size: 14px;
  border-bottom: 10px solid #eee;
}
.recommend img {
  width: 70px;
  height: 70px;
  margin: 0 10px 10px 10px;
}
</style>
