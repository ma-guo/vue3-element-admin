import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStoreHook } from "@/store/modules/user";

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { result, message } = response.data;
    if (result === 0) {
      return response.data;
    }
    // 响应数据为二进制流处理(Excel导出)
    if (response.data instanceof ArrayBuffer) {
      return response;
    }
    const type = response.headers['content-type']
    // 下载文件
    if (type && type.indexOf('application/vnd.') > -1) {
      let filename = response.headers['content-disposition'].split('filename=')[1] || '导出文件.xlsx'
      download(response.data, filename, type)
      return { result: 0, message: '下载成功', data: {} };
    }
    const msg = message || "系统出错"
    showMessageOrToLogin(result, msg)
    if (result != 1000) {
      return response.data;
    }
    return { result: -1, message: msg };
  },
  (error: any) => {
    if (error.response.data) {
      const data: { result: number, message: string } = error.response.data;
      const { result, message } = data;
      // const {  message } = error.response.data;
      // token 过期,重新登录
      showMessageOrToLogin(result, message)
    } else {
      ElMessage.error(error.message || "系统出错");
    }
    return Promise.resolve({ result: -1, message: error.message });
  }
);

const showMessageOrToLogin = (result: number, message: string) => {
  if (result === 1000) {
    ElMessageBox.confirm("当前页面已失效，请重新登录", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      const userStore = useUserStoreHook();
      userStore.resetToken().then(() => {
        location.reload();
      });
    });
  } else {
    ElMessage.error(message || "系统出错");
  }
};

const download = (data: any, filename: string, fileType: string) => {
  console.log({ filename, fileType })
  const fileName = decodeURI(filename);
  const blob = new Blob([data], { type: fileType });
  const downloadUrl = window.URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = downloadUrl;
  downloadLink.download = fileName;

  document.body.appendChild(downloadLink);
  downloadLink.click();

  document.body.removeChild(downloadLink);
  window.URL.revokeObjectURL(downloadUrl);
}
// 导出 axios 实例
export default service;
