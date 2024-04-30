declare module "xlsx/xlsx.mjs";

/**
 * 登录用户信息
 */
declare interface UserInfo {
  userId?: number;
  username?: string;
  nickname?: string;
  avatar?: string;
  roles: string[];
  perms: string[];
}
