import Toast from "./Toast";
const obj = {};

obj.install = function (Vue) {
  // 创建组件构造器
  const toastContrustor = Vue.extend(Toast);
  // new的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastContrustor();
  // 将组件对象手动挂载带某一个元素上
  toast.$mount(document.createElement("div"));
  // toast.$el对象的就是div
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
};

export default obj;
