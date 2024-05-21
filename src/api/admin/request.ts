import { AxiosRequestConfig, AxiosPromise } from "axios";
import axios from "axios";
import qs from "qs";
import originRequest from "@/utils/request";
// import store from '../store'
/* eslint-disable */
// const wwwForm = "application/x-www-form-urlencoded";
// const contentType = "Content-Type";
// axios.defaults.headers[contentType] = wwwForm;

// declare const process: any;
// // 从配置文件中读取的baseUrl
// const envBaseUrl = process.env.VUE_APP_API;

// // 创建axios实例
// const request = axios.create({
//   baseURL: envBaseUrl, // 项目根目录的base_url
//   timeout: 15000, // 请求超时时间
//   // withCredentials: true,
// });

// // request拦截器
// request.interceptors.request.use(
//   (config) => {
//     // if (store.getters.token) {
//     //     config.headers['Access-Token'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
//     // }
//     const method = (config.method || "").toLowerCase();
//     if (method == "post" || method == "put") {
//       if (config.data && typeof config.data != "string") {
//         config.data = qs.stringify(config.data);
//       }
//     }
//     console.log(envBaseUrl);
//     return config;
//   },
//   (error) => {
//     console.log(error);
//     Promise.reject(error);
//   }
// );

// // respone拦截器
// request.interceptors.response.use(
//   (rsp) => {
//     if (rsp.status < 200 || rsp.status > 300) {
//       console.log(rsp.status);
//     }
//     if (rsp.data.code == 401) {
//     }
//     return rsp.data;
//   },
//   (error) => {
//     return Promise.resolve({
//       code: -100,
//       message: error.message,
//     });
//   }
// );

// /* eslint-disable */

// const ajax = (config: AxiosRequestConfig): Promise<any> => {
//   const p = new Promise<any>(async (resolve, reject) => {
//     try {
//       const req = await request(config);
//       resolve(req);
//     } catch (e) {
//       console.log(e);
//       reject(e);
//     }
//   });
//   return p;
// };

/** get 请求 */
export const ajax_get = (path: string, data: {}): Promise<any> => {
  return originRequest({
    method: "get",
    url: "/api/" + path,
    params: data,
  });
  // return ajax({
  //   method: "get",
  //   url: path,
  //   params: data,
  // });
};
/** post 请求 */
export const ajax_post = (path: string, data: {}): Promise<any> => {
  return originRequest({
    method: "post",
    url: "/api" + path,
    data: data,
  });
  // return ajax({
  //   method: "post",
  //   url: path,
  //   data: data,
  // });
};

export const ajax_any = (method: string, path: string, data: {}): Promise<any> => {
  return originRequest({
    method: method,
    url: "/api" + path,
    data: data,
  });
};
