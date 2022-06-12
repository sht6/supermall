import axios from "./axios";

export function getHomeMultidata() {
  return axios({
    url: "/home/multidata",
  });
}

// 请求获取商品数据
export function getHomeData(type, page) {
  return axios({
    url: "/home/data",
    params: {
      type,
      page,
    },
  });
}
