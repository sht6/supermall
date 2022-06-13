module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗的宽度，对应的时我们设计搞得宽度
      viewportHeight: 667, // 视窗的高度，对应的时我们设计稿的高度(也可以不用配置)
      unitPrecision: 5, //指定‘px’转换为视窗单位值的小数位数(很多时候无法整除)
      viewportUnit: "vw", //指定需要转换城的视窗单位，建议使用vw
      selectorBlackList: ["ignore", "tab-bar"], //指定不需要转换的类。后面再将
      minPixelValue: 1, //小于或等于‘1px’不转换为视窗单位
      mediaQueey: false, //允许再媒体查询中转换为‘px’
      exclude: [/TabBar/],
    },
  },
};

// 1.再js中使用正则：/正则相关规则/
// 2.exclude中存放的元素必须时正则表达式
// 3.按照排除的文件写对应的正则
// 正则的规则：
// 1.^abc:表示匹配的内容，必须以什么内容开头(以abc开头)
// 2.abc$:表示匹配的内容，必须以什么内容结尾(以abc结尾)
