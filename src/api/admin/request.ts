
import originRequest from "@/utils/request";

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
