import request from "@/utils/request";
import { AxiosPromise } from "axios";
import {
  DictTypeQuery,
  DictTypePageResult,
  DictTypeForm,
  DictQuery,
  DictForm,
  DictPageResult,
} from "./types";

/**
 * 字典类型分页列表
 *
 * @param queryParams
 */
export function getDictTypePage(
  queryParams: DictTypeQuery
): AxiosPromise<DictTypePageResult> {
  return request({
    url: "/api/v1/dict_types/page/",
    method: "get",
    params: queryParams,
  });
}

/**
 * 字典类型表单数据
 *
 * @param id
 */
export function getDictTypeForm(id: number): AxiosPromise<DictTypeForm> {
  return request({
    url: "/api/v1/dict_types/form/",
    method: "get",
    params: { id },
  });
}

/**
 * 新增字典类型
 *
 * @param data
 */
export function addDictType(data: DictTypeForm) {
  return request({
    url: "/api/v1/dict_types/add/",
    method: "post",
    data: data,
  });
}

/**
 * 修改字典类型
 *
 * @param id
 * @param data
 */
export function updateDictType(id: number, data: DictTypeForm) {
  return request({
    url: "/api/v1/dict_types/update/",
    method: "post",
    data: { ...data, id },
  });
}

/**
 * 删除字典类型
 */
export function deleteDictTypes(ids: string) {
  return request({
    url: "/api/v1/dict_types/delete/",
    method: "post",
    data: { ids },
  });
}

/**
 * 获取字典类型的数据项
 *
 * @param typeCode 字典类型编码
 */
export function getDictOptions(typeCode: string): AxiosPromise<OptionTypeWrap> {
  return request({
    url: "/api/v1/dict/options/",
    method: "get",
    params: { typeCode },
  });
}

/**
 * 字典分页列表
 */
export function getDictPage(
  queryParams: DictQuery
): AxiosPromise<DictPageResult> {
  return request({
    url: "/api/v1/dict/page/",
    method: "get",
    params: queryParams,
  });
}

/**
 * 获取字典表单数据
 *
 * @param id
 */
export function getDictFormData(id: number): AxiosPromise<DictForm> {
  return request({
    url: "/api/v1/dict/form/",
    method: "get",
    params: { id },
  });
}

/**
 * 新增字典
 *
 * @param data
 */
export function addDict(data: DictForm) {
  return request({
    url: "/api/v1/dict/add/",
    method: "post",
    data: data,
  });
}

/**
 * 修改字典项
 *
 * @param id
 * @param data
 */
export function updateDict(id: number, data: DictForm) {
  return request({
    url: "/api/v1/dict/update/",
    method: "post",
    data: { ...data, id },
  });
}

/**
 * 删除字典
 *
 * @param ids 字典项ID，多个以英文逗号(,)分割
 */
export function deleteDict(ids: string) {
  return request({
    url: "/api/v1/dict/delete/",
    method: "post",
    data: { ids },
  });
}
