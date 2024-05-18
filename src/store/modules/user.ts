import { resetRouter } from "@/router";
import { store } from "@/store";

import { getUsersMe, setAuthLogin, setAuthLogout } from "@/api/admin/api";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserInfo>({
    roles: [],
    perms: [],
  });

  /**
   * 登录
   *
   * @param {AdminCore.AuthLoginReq}
   * @returns
   */
  const login = async (loginData: AdminCore.AuthLoginReq) => {
    const rsp = await setAuthLogin(loginData);
    if (rsp.result == 0) {
      const { tokenType, accessToken } = rsp.data;
      localStorage.setItem("accessToken", tokenType + " " + accessToken);
    }
    return rsp
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getUserInfo() {
    return new Promise<UserInfo>(async (resolve, reject) => {
      const { result, message, data } = await getUsersMe({});
      if (result != 0) {
        return reject(message);
      }

      if (!data.roles || data.roles.length <= 0) {
        reject("getUserInfo: roles must be a non-null array!");
        return;
      }
      Object.assign(user.value, { ...data });
      resolve(data);

    });
  }

  // user logout
  function logout() {
    return new Promise<void>(async (resolve, reject) => {
      const rsp = await setAuthLogout({});
      if (rsp.result != 0) {
        reject(rsp.message);
        return;
      }
      localStorage.setItem("accessToken", "");
      location.reload(); // 清空路由
      resolve();
    });
  }

  // remove token
  function resetToken() {
    console.log("resetToken");
    return new Promise<void>((resolve) => {
      localStorage.setItem("accessToken", "");
      resetRouter();
      resolve();
    });
  }

  return {
    user,
    login,
    getUserInfo,
    logout,
    resetToken,
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
