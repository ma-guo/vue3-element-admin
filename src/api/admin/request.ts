
import originRequest from "@/utils/request";

/** get 请求 */
export const ajax_get = (path: string, data: {}): Promise<any> => {
  return originRequest({
    method: "get",
    url: fillApi(path),
    params: data,
  });
};
/** post 请求 */
export const ajax_post = (path: string, data: {}): Promise<any> => {
  return originRequest({
    method: "post",
    url: fillApi(path),
    data: data,
  });
};

export const ajax_any = (method: string, path: string, data: {}): Promise<any> => {
  return originRequest({
    method: method,
    url: fillApi(path),
    data: data,
  });
};


const fillApi = (path: string): string => {
  if (path.startsWith("/api")) {
    return path;
  }
  return "/api" + path;
};
