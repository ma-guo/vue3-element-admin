import { resetRouter } from "@/router";
import { store } from "@/store";

import { UserInfo } from "@/api/user/types";
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
  function login(loginData: AdminCore.AuthLoginReq) {
    return new Promise<void>((resolve, reject) => {
      setAuthLogin(loginData)
        .then((response) => {
          const { tokenType, accessToken } = response.data;
          // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          localStorage.setItem("accessToken", tokenType + " " + accessToken);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      getUsersMe({})
        .then(({ data }) => {
          if (!data) {
            reject("Verification failed, please Login again.");
            return;
          }
          if (!data.roles || data.roles.length <= 0) {
            reject("getUserInfo: roles must be a non-null array!");
            return;
          }
          Object.assign(user.value, { ...data });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // user logout
  function logout() {
    return new Promise<void>((resolve, reject) => {
      setAuthLogout({})
        .then(() => {
          localStorage.setItem("accessToken", "");
          location.reload(); // 清空路由
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
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
