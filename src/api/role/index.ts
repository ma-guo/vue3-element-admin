import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { RoleQuery, RolePageResult, RoleForm } from "./types";

/**
 * 获取角色分页数据
 *
 * @param queryParams
 */
export function getRolePage(
  queryParams?: RoleQuery
): AxiosPromise<RolePageResult> {
  return request({
    url: "/api/v1/roles/page/",
    method: "get",
    params: queryParams,
  });
}

/**
 * 获取角色下拉数据
 *
 * @param queryParams
 */
export function getRoleOptions(
  queryParams?: RoleQuery
): AxiosPromise<OptionTypeWrap> {
  return request({
    url: "/api/v1/roles/options/",
    method: "get",
    params: queryParams,
  });
}

/**
 * 获取角色的菜单ID集合
 *
 * @param queryParams
 */
export function getRoleMenuIds(
  roleId: number
): AxiosPromise<CommArray<number>> {
  return request({
    url: "/api/v1/roles/menuids/",
    method: "get",
    params: { roleId },
  });
}

/**
 * 分配菜单权限给角色
 *
 * @param queryParams
 */
export function updateRoleMenus(
  roleId: number,
  data: number[]
): AxiosPromise<any> {
  return request({
    url: "/api/v1/roles/menus/",
    method: "post",
    data: { menuIds: data, roleId },
  });
}

/**
 * 获取角色详情
 *
 * @param id
 */
export function getRoleForm(id: number): AxiosPromise<RoleForm> {
  return request({
    url: "/api/v1/roles/form/",
    method: "get",
    params: { id },
  });
}

/**
 * 添加角色
 *
 * @param data
 */
export function addRole(data: RoleForm) {
  return request({
    url: "/api/v1/roles/add/",
    method: "post",
    data: data,
  });
}

/**
 * 更新角色
 *
 * @param id
 * @param data
 */
export function updateRole(id: number, data: RoleForm) {
  return request({
    url: "/api/v1/roles/update/",
    method: "post",
    data: { ...data, id },
  });
}

/**
 * 批量删除角色，多个以英文逗号(,)分割
 *
 * @param ids
 */
export function deleteRoles(ids: string) {
  return request({
    url: "/api/v1/roles/delete/",
    method: "post",
    data: { ids },
  });
}
