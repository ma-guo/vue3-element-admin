import router from "@/router";
import defaultSettings from "@/settings";
import { useUserStore, usePermissionStore, useSettingsStore } from "@/store";
import NProgress from "@/utils/nprogress";
import { ca } from "element-plus/es/locale";
import { RouteRecordRaw } from "vue-router";
const settingsStore = useSettingsStore();

export function setupPermission() {
  // 白名单路由
  const whiteList = ["/login"];

  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const hasToken = localStorage.getItem("accessToken");
    if (hasToken) {
      if (to.path === "/login") {
        // 如果已登录，跳转首页
        next({ path: "/" });
        NProgress.done();
      } else {
        const userStore = useUserStore();
        const hasRoles = userStore.user.roles && userStore.user.roles.length > 0;
        if (hasRoles) {
          // 未匹配到任何路由，跳转404
          if (to.matched.length === 0) {
            from.name ? next({ name: from.name }) : next("/404");
          } else {
            next();
          }
        } else {
          const permissionStore = usePermissionStore();
          try {
            const { roles, nickname } = await userStore.getUserInfo();
            settingsStore.watermarkContent =
              nickname || defaultSettings.watermarkContent;
            const accessRoutes = await permissionStore.generateRoutes(roles);
            accessRoutes.forEach((route: RouteRecordRaw) => {
              router.addRoute(route);
            });
            next({ ...to, replace: true });
          } catch (error) {
            // 移除 token 并跳转登录页
            await userStore.resetToken();
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        }
      }
    } else {
      // 未登录可以访问白名单页面
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  });

  router.afterEach(() => {
    console.log('after route change')
    NProgress.done();
  });
}
