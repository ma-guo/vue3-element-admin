/** 通用返回结构 */
interface Rsp<T> {
  result: number;
  message: string;
  data: T;
  // header?: WechatMiniprogram.IAnyObject
}
