/** 通用返回结构 */
interface Rsp<T> {
  code: number;
  errMsg: string;
  data: T;
  // header?: WechatMiniprogram.IAnyObject
}
