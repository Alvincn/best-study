import axios from 'axios';
import nProgress from 'nprogress';

// 引入进度条样式
import 'nprogress/nprogress.css';
// 1.利用axios对象的方法，创建一个axios实例
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径之中会自动拼上api
  baseURL: '/api',
  // 请求超时时间
  timeout: 5000,
});
// 请求拦截器，只要发请求，就可以检测到，可以在请求发送之前做一些事情
requests.interceptors.request.use((config) => {
  // config 配置对象，对象里边有一个属性很重要，就是header请求头
  // 进度条开始
  nProgress.start();
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 当响应成功时的回调
    // 进度条结束
    if (res.data.status == 200) {
      nProgress.done();
      return Promise.resolve(res);
    } else {
      return Promise.reject(res.data);
    }
    // return res;
  },
  // 当响应失败的回调
  (error) => {
    return Promise.reject('error');
  }
);

/*
 *封装get方法
 *@param{String} url [请求地址]
 *@param{Object} params 请求参数
 */
export function Get(url, params) {
  return new Promise((resolve, reject) => {
    requests
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}

/**
 *封装post方法
 *@param{String} url 请求地址
 *@param{Object} params 请求参数
 */
export function Post(url, params= {}) {
  return new Promise((resolve, reject) => {
    requests
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}

/**
 *封装put方法
 *@param{String} url 请求地址
 *@param{Object} params 请求参数
 */
export function Put(url, params) {
  return new Promise((resolve, reject) => {
    requests
      .put(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}

/**
 *封装patch方法
 *@param{String} url 请求地址
 *@param{Object} params 请求参数
 */
export function Patch(url, params) {
  return new Promise((resolve, reject) => {
    requests
      .put(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}

/**
 *封装delete方法
 *@param{String} url [请求地址]
 *@param{Object} params [请求参数]
 */
export function Delete(url, params) {
  return new Promise((resolve, reject) => {
    requests
      .delete(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}
