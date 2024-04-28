import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { MenuQuery, MenuVO, MenuForm } from "./types";

/**
 * 获取路由列表
 */
export function listRoutes() {
  return request({
    url: "/api/v1/menus/routes/",
    method: "get",
  });
}

/**
 * 获取菜单树形列表
 *
 * @param queryParams
 */
export function listMenus(
  queryParams: MenuQuery
): AxiosPromise<CommArray<MenuVO>> {
  return request({
    url: "/api/v1/menus/list/",
    method: "get",
    params: queryParams,
  });
}

/**
 * 获取菜单下拉树形列表
 */
export function getMenuOptions(): AxiosPromise<OptionTypeWrap> {
  return request({
    url: "/api/v1/menus/options/",
    method: "get",
  });
}

/**
 * 获取菜单表单数据
 *
 * @param id
 */
export function getMenuForm(id: number): AxiosPromise<MenuForm> {
  return request({
    url: "/api/v1/menus/form/",
    method: "get",
    params: { id },
  });
}

/**
 * 添加菜单
 *
 * @param data
 */
export function addMenu(data: MenuForm) {
  return request({
    url: "/api/v1/menus/add/",
    method: "post",
    data: data,
  });
}

/**
 * 修改菜单
 *
 * @param id
 * @param data
 */
export function updateMenu(id: string, data: MenuForm) {
  return request({
    url: "/api/v1/menus/update/",
    method: "post",
    data: { ...data, id },
  });
}

/**
 * 删除菜单
 *
 * @param id 菜单ID
 */
export function deleteMenu(ids: number) {
  return request({
    url: "/api/v1/menus/delete/",
    method: "post",
    data: { ids },
  });
}
