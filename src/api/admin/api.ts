
// Generated by niuhe.idl, search "niuhe" plugin for vscode
// 重新生成时本文件将被复写, 请不要手动修改. 配置 "#tsapi" 可指定新路径

import { ajax_get, ajax_post } from "./request";


/**
 * 登录
 * @param username string 用户名
 * @param password string 密码
 * @param captchaKey string 验证码key
 * @param captchaCode string 验证码
 * @returns AdminCore.AauthLoginRsp
 */
export const setAuthLogin = (data: AdminCore.AuthLoginReq): Promise<Rsp<AdminCore.AauthLoginRsp>> => {
	return ajax_post("/v1/auth/login/", data);
};

/**
 * 登出
 * @returns AdminCore.NoneRsp
 */
export const setAuthLogout = (data: AdminCore.NoneReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/auth/logout/", data);
};

/**
 * 获取验证码
 * @returns AdminCore.AuthCaptchaRsp
 */
export const getAuthCaptcha = (data: AdminCore.NoneReq): Promise<Rsp<AdminCore.AuthCaptchaRsp>> => {
	return ajax_get("/v1/auth/captcha/", data);
};

/**
 * 获取当前登录用户信息
 * @returns AdminCore.V1UsersMeRsp
 */
export const getUsersMe = (data: AdminCore.NoneReq): Promise<Rsp<AdminCore.V1UsersMeRsp>> => {
	return ajax_get("/v1/users/me/", data);
};

/**
 * 用户分页列表
 * @param keywords string 关键字
 * @param status number 用户状态
 * @param deptId number 部门ID
 * @param pageNum number 页码
 * @param pageSize number 每页条数
 * @param startTime string 开始时间-年月日
 * @param endTime string 结束时间-年月日
 * @returns AdminCore.V1UsersPageRsp
 */
export const getUsersPage = (data: AdminCore.V1UsersPageReq): Promise<Rsp<AdminCore.V1UsersPageRsp>> => {
	return ajax_get("/v1/users/page/", data);
};

/**
 * 新增用户
 * @param id number 用户ID
 * @param username string 用户名
 * @param nickname string 用户昵称
 * @param password string 密码
 * @param mobile string 手机号
 * @param gender number 性别
 * @param avatar string 头像地址
 * @param email string 用户邮箱
 * @param status number 用户状态
 * @param deptId number 部门ID
 * @param roleIds number 角色ID集合
 * @returns AdminCore.NoneRsp
 */
export const setUsersAdd = (data: AdminCore.V1UsersAddReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/users/add/", data);
};

/**
 * 用户表单
 * @param userId number 用户ID
 * @returns AdminCore.V1UserFormRsp
 */
export const getUsersForm = (data: AdminCore.V1UserFormReq): Promise<Rsp<AdminCore.V1UserFormRsp>> => {
	return ajax_get("/v1/users/form/", data);
};

/**
 * 修改用户
 * @param id number 用户ID
 * @param username string 用户名
 * @param nickname string 用户昵称
 * @param mobile string 手机号
 * @param gender number 用户状态
 * @param avatar string 头像地址
 * @param email string 用户邮箱
 * @param status number 用户状态
 * @param deptId number 部门ID
 * @param roleIds number 角色ID集合
 * @returns AdminCore.NoneRsp
 */
export const setUsersUpdate = (data: AdminCore.V1UserUpdateReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/users/update/", data);
};

/**
 * 删除用户
 * @param ids string 用户ID，多个以英文逗号(,)分割
 * @returns AdminCore.NoneRsp
 */
export const setUsersDelete = (data: AdminCore.V1UsersDeleteReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/users/delete/", data);
};

/**
 * 导出用户
 * @param keywords string 关键字
 * @param status number 用户状态
 * @param deptId number 部门ID
 * @param pageNum number 页码
 * @param pageSize number 每页条数
 * @param startTime string 开始时间-年月日
 * @param endTime string 结束时间-年月日
 * @returns AdminCore.NoneRsp
 */
export const getUsersExport = (data: AdminCore.V1UsersPageReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_get("/v1/users/export/", data);
};

/**
 * 用户导入模板下载
 * @returns AdminCore.NoneRsp
 */
export const getUsersTemplate = (data: AdminCore.NoneReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_get("/v1/users/template/", data);
};


/**
 * 修改密码
 * @param userId number 用户id
 * @param password string 新密码
 * @returns AdminCore.NoneRsp
 */
export const setUsersPassword = (data: AdminCore.V1UsersPasswordReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/users/password/", data);
};

/**
 * 修改用户状态
 * @param userId number 用户ID
 * @param status number 用户状态
 * @returns AdminCore.NoneRsp
 */
export const setUsersStatus = (data: AdminCore.V1UsersStatusReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/users/status/", data);
};

/**
 * 角色分页列表
 * @param keywords string 搜索关键字
 * @param pageNum number 页码
 * @param pageSize number 每页数量
 * @returns AdminCore.V1RolesPageRsp
 */
export const getRolesPage = (data: AdminCore.V1RolesPageReq): Promise<Rsp<AdminCore.V1RolesPageRsp>> => {
	return ajax_get("/v1/roles/page/", data);
};

/**
 * 角色下拉列表
 * @returns AdminCore.V1RolesOptiosRsp
 */
export const getRolesOptions = (data: AdminCore.NoneReq): Promise<Rsp<AdminCore.V1RolesOptiosRsp>> => {
	return ajax_get("/v1/roles/options/", data);
};

/**
 * 新增角色
 * @param id number 角色ID
 * @param name string 角色名称
 * @param code string 角色编码
 * @param status number 角色状态
 * @param sort number 排序
 * @param dataScope number 数据权限
 * @returns AdminCore.NoneRsp
 */
export const setRolesAdd = (data: AdminCore.V1RolesAddReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/roles/add/", data);
};

/**
 * 角色表单数据
 * @param id number 角色ID
 * @returns AdminCore.V1RolesFormRsp
 */
export const getRolesForm = (data: AdminCore.V1RolesFormReq): Promise<Rsp<AdminCore.V1RolesFormRsp>> => {
	return ajax_get("/v1/roles/form/", data);
};

/**
 * 修改角色信息
 * @param id number 角色ID
 * @param name string 角色名称
 * @param code string 角色编码
 * @param status number 角色状态
 * @param sort number 排序
 * @param dataScope number 数据权限
 * @returns AdminCore.NoneRsp
 */
export const setRolesUpdate = (data: AdminCore.V1RolesUpdateReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/roles/update/", data);
};

/**
 * 删除角色
 * @param ids string 删除角色，多个以英文逗号(,)分割
 * @returns AdminCore.NoneRsp
 */
export const setRolesDelete = (data: AdminCore.V1RolesDeleteReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/roles/delete/", data);
};

/**
 * 获取角色的菜单ID集合
 * @param roleId number 角色ID
 * @returns AdminCore.V1RolesMenuIdsRsp
 */
export const getRolesMenuids = (data: AdminCore.V1RolesMenuIdsReq): Promise<Rsp<AdminCore.V1RolesMenuIdsRsp>> => {
	return ajax_get("/v1/roles/menuids/", data);
};

/**
 * 分配菜单权限给角色
 * @param roleId number 角色ID
 * @param menuIds number 菜单ID集合
 * @returns AdminCore.NoneRsp
 */
export const setRolesMenus = (data: AdminCore.V1RolesMenusReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/roles/menus/", data);
};

/**
 * 修改角色状态
 * @param roleId number 角色ID
 * @param status number 角色状态
 * @returns AdminCore.NoneRsp
 */
export const setRolesStatus = (data: AdminCore.V1RolesStatusReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/roles/status/", data);
};

/**
 * 菜单列表
 * @param keywords string 关键字
 * @param status number 状态
 * @param type number 菜单类型, 忽略本参数
 * @returns AdminCore.V1MenusListRsp
 */
export const getMenusList = (data: AdminCore.V1MenusListReq): Promise<Rsp<AdminCore.V1MenusListRsp>> => {
	return ajax_get("/v1/menus/list/", data);
};

/**
 * 删除菜单
 * @param ids string 菜单ID
 * @returns AdminCore.NoneRsp
 */
export const setMenusDelete = (data: AdminCore.V1MenusDeleteReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/menus/delete/", data);
};

/**
 * 新增菜单
 * @param id number 菜单ID
 * @param parentId number 父菜单ID
 * @param name string 菜单名称
 * @param type string 菜单类型
 * @param path string 路由路径
 * @param component string 组件路径(vue页面完整路径，省略.vue后缀)
 * @param perm string 权限标识
 * @param visible number 显示状态
 * @param sort number 排序(数字越小排名越靠前)
 * @param icon string 菜单图标
 * @param redirect string 跳转路径
 * @param keepAlive number 是否开启缓存
 * @param alwaysShow number 是否总是显示
 * @returns AdminCore.NoneRsp
 */
export const setMenusAdd = (data: AdminCore.V1MenusAddReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/menus/add/", data);
};

/**
 * 菜单下拉列表
 * @returns AdminCore.V1MenusOptionsRsp
 */
export const getMenusOptions = (data: AdminCore.NoneReq): Promise<Rsp<AdminCore.V1MenusOptionsRsp>> => {
	return ajax_get("/v1/menus/options/", data);
};

/**
 * 路由列表
 * @returns AdminCore.MenuRouteRsp
 */
export const getMenusRoutes = (data: AdminCore.NoneReq): Promise<Rsp<AdminCore.MenuRouteRsp>> => {
	return ajax_get("/v1/menus/routes/", data);
};

/**
 * 菜单表单
 * @param id number 菜单ID
 * @returns AdminCore.V1MenusFormRsp
 */
export const getMenusForm = (data: AdminCore.V1MenusFormReq): Promise<Rsp<AdminCore.V1MenusFormRsp>> => {
	return ajax_get("/v1/menus/form/", data);
};

/**
 * 修改菜单
 * @param id number 菜单ID
 * @param parentId number 父菜单ID
 * @param name string 菜单名称
 * @param type string 菜单类型
 * @param path string 路由路径
 * @param component string 组件路径(vue页面完整路径，省略.vue后缀)
 * @param perm string 权限标识
 * @param visible number 显示状态
 * @param sort number 排序(数字越小排名越靠前)
 * @param icon string 菜单图标
 * @param redirect string 跳转路径
 * @param alwaysShow number 是否总是显示
 * @param keepAlive number 是否开启缓存
 * @returns AdminCore.NoneRsp
 */
export const setMenusUpdate = (data: AdminCore.V1MenusUpdateReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/menus/update/", data);
};

/**
 * 修改菜单状态
 * @param id number 菜单ID
 * @param visible number 菜单状态
 * @returns AdminCore.NoneRsp
 */
export const setMenusStatus = (data: AdminCore.V1MenusStatusReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/menus/status/", data);
};

/**
 * 获取部门列表
 * @param keyword string 搜索关键词
 * @param status number 状态
 * @returns AdminCore.V1DeptListRsp
 */
export const getDeptList = (data: AdminCore.V1DeptListReq): Promise<Rsp<AdminCore.V1DeptListRsp>> => {
	return ajax_get("/v1/dept/list/", data);
};

/**
 * 添加部门
 * @param id number 部门id, 前端使用
 * @param parentId number 父部门id
 * @param name string 部门名称
 * @param sort number 排序
 * @param status number 状态
 * @returns AdminCore.NoneRsp
 */
export const setDeptAdd = (data: AdminCore.V1DeptAddReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/dept/add/", data);
};

/**
 * 获取部门下拉列表
 * @returns AdminCore.V1DeptOptionsRsp
 */
export const getDeptOptions = (data: AdminCore.NoneReq): Promise<Rsp<AdminCore.V1DeptOptionsRsp>> => {
	return ajax_get("/v1/dept/options/", data);
};

/**
 * 修改部门
 * @param id number 部门id
 * @param parentId number 父部门id
 * @param name string 部门名称
 * @param sort number 排序
 * @param status number 状态
 * @returns AdminCore.NoneRsp
 */
export const setDeptUpdate = (data: AdminCore.V1DeptUpdateReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/dept/update/", data);
};

/**
 * 获取部门表单数据
 * @param id number 部门id
 * @returns AdminCore.V1DeptFormRsp
 */
export const getDeptForm = (data: AdminCore.V1DeptFormReq): Promise<Rsp<AdminCore.V1DeptFormRsp>> => {
	return ajax_get("/v1/dept/form/", data);
};

/**
 * 删除部门
 * @param ids string 部门ID，多个以英文逗号(,)分割
 * @returns AdminCore.NoneRsp
 */
export const setDeptDelete = (data: AdminCore.V1DeptDeleteReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/dept/delete/", data);
};

/**
 * 字典分页列表
 * @param keywords string 关键字(类型名称/类型编码)
 * @param typeCode string 字典类型编码
 * @param pageNum number 页码
 * @param pageSize number 每页记录数
 * @returns AdminCore.V1DictPageRsp
 */
export const getDictPage = (data: AdminCore.V1DictPageReq): Promise<Rsp<AdminCore.V1DictPageRsp>> => {
	return ajax_get("/v1/dict/page/", data);
};

/**
 * 字典下拉列表
 * @param typeCode string 字典类型编码
 * @returns AdminCore.V1DictOptionsRsp
 */
export const getDictOptions = (data: AdminCore.V1DictOptionsReq): Promise<Rsp<AdminCore.V1DictOptionsRsp>> => {
	return ajax_get("/v1/dict/options/", data);
};

/**
 * 字典数据表单数据
 * @param id number 字典ID
 * @returns AdminCore.V1DictFormRsp
 */
export const getDictForm = (data: AdminCore.V1DictFormReq): Promise<Rsp<AdminCore.V1DictFormRsp>> => {
	return ajax_get("/v1/dict/form/", data);
};

/**
 * 新增字典
 * @param id number 主键
 * @param typeCode string 类型编码
 * @param name string 字典名称
 * @param value string 字典值
 * @param status number 状态
 * @param sort number 排序
 * @param remark string 备注
 * @returns AdminCore.NoneRsp
 */
export const setDictAdd = (data: AdminCore.V1DictAddReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/dict/add/", data);
};

/**
 * 修改字典
 * @param id number 主键
 * @param typeCode string 类型编码
 * @param name string 字典名称
 * @param value string 字典值
 * @param status number 状态
 * @param sort number 排序
 * @param remark string 备注
 * @returns AdminCore.NoneRsp
 */
export const setDictUpdate = (data: AdminCore.V1DictUpdateReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/dict/update/", data);
};

/**
 * 删除字典
 * @param ids string 字典ID，多个以英文逗号(,)拼接
 * @returns AdminCore.NoneRsp
 */
export const setDictDelete = (data: AdminCore.V1DictDeleteReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/dict/delete/", data);
};

/**
 * 字典类型分页列表
 * @param keywords string 关键字(类型名称/类型编码)
 * @param pageNum number 页码
 * @param pageSize number 每页记录数
 * @returns AdminCore.V1DictTypesPageRsp
 */
export const getDictTypesPage = (data: AdminCore.V1DictTypesPageReq): Promise<Rsp<AdminCore.V1DictTypesPageRsp>> => {
	return ajax_get("/v1/dict_types/page/", data);
};

/**
 * 字典类型表单
 * @param id number 主键
 * @returns AdminCore.V1DictTypesFormRsp
 */
export const getDictTypesForm = (data: AdminCore.V1DictTypesFormReq): Promise<Rsp<AdminCore.V1DictTypesFormRsp>> => {
	return ajax_get("/v1/dict_types/form/", data);
};

/**
 * 新增字典类型
 * @param id number 主键
 * @param name string 类型名称
 * @param code string 类型编码-必填
 * @param status number 状态
 * @param remark string 备注
 * @returns AdminCore.NoneRsp
 */
export const setDictTypesAdd = (data: AdminCore.V1DictTypesAddReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/dict_types/add/", data);
};

/**
 * 修改字典类型
 * @param id number 主键
 * @param name string 类型名称
 * @param code string 类型编码
 * @param status number 状态
 * @param remark string 备注
 * @returns AdminCore.NoneRsp
 */
export const setDictTypesUpdate = (data: AdminCore.V1DictTypesUpdateReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/dict_types/update/", data);
};

/**
 * 删除字典类型
 * @param ids string 字典类型ID，多个以英文逗号(,)分割
 * @returns AdminCore.NoneRsp
 */
export const setDictTypesDelete = (data: AdminCore.V1DictTypesDeleteReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/dict_types/delete/", data);
};

/**
 * 文件上传请求
 * @returns AdminCore.V1FilesUploadRsp
 */
export const setFilesUpload = (data: AdminCore.NoneReq): Promise<Rsp<AdminCore.V1FilesUploadRsp>> => {
	return ajax_post("/v1/files/upload/", data);
};

/**
 * 文件删除请求
 * @param filePath string 文件路径
 * @returns AdminCore.NoneRsp
 */
export const setFilesDelete = (data: AdminCore.V1FilesDeleteReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/files/delete/", data);
};

/**
 * 文件下载请求
 * @param url string 文件URL
 * @returns AdminCore.NoneRsp
 */
export const getFilesFetch = (data: AdminCore.V1FileFetchReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_get("/v1/files/fetch/", data);
};

/**
 * 文件分页请求
 * @param pageNum number 页码
 * @param pageSize number 每页数量
 * @param vendor string 文件存储提供商
 * @param name string 文件名
 * @returns AdminCore.V1FilePageRsp
 */
export const getFilesPage = (data: AdminCore.V1FilePageReq): Promise<Rsp<AdminCore.V1FilePageRsp>> => {
	return ajax_get("/v1/files/page/", data);
};

/**
 * 文件修改弹窗请求
 * @param id number 文件 ID
 * @returns AdminCore.V1FileFromRsp
 */
export const getFilesForm = (data: AdminCore.V1FileFormReq): Promise<Rsp<AdminCore.V1FileFromRsp>> => {
	return ajax_get("/v1/files/form/", data);
};

/**
 * 文件修改请求
 * @param id number 文件ID
 * @param name string 文件名
 * @returns AdminCore.NoneRsp
 */
export const setFilesUpdate = (data: AdminCore.V1FileUpdateReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/files/update/", data);
};

/**
 * 获取文件存储区域
 * @returns AdminCore.V1FilesZoneRsp
 */
export const getVendorZones = (data: AdminCore.NoneReq): Promise<Rsp<AdminCore.V1FilesZoneRsp>> => {
	return ajax_get("/v1/vendor/zones/", data);
};

/**
 * 初始化文件提供商参数
 * @returns AdminCore.NoneRsp
 */
export const getVendorInit = (data: AdminCore.NoneReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_get("/v1/vendor/init/", data);
};

/**
 * 获取文件存储提供商列表
 * @returns AdminCore.V1FilesVendorsRsp
 */
export const getVendorList = (data: AdminCore.NoneReq): Promise<Rsp<AdminCore.V1FilesVendorsRsp>> => {
	return ajax_get("/v1/vendor/list/", data);
};

/**
 * 文件配置列表
 * @param vendor string 文件存储提供商
 * @param pageNum number 页码
 * @param pageSize number 每页记录数
 * @returns AdminCore.V1VendorPageRsp
 */
export const getVendorPage = (data: AdminCore.V1VendorPageReq): Promise<Rsp<AdminCore.V1VendorPageRsp>> => {
	return ajax_get("/v1/vendor/page/", data);
};

/**
 * 获取配置项详情值
 * @param id number 配置 id
 * @returns AdminCore.V1VendorFormRsp
 */
export const getVendorForm = (data: AdminCore.V1VendorFormReq): Promise<Rsp<AdminCore.V1VendorFormRsp>> => {
	return ajax_get("/v1/vendor/form/", data);
};

/**
 * 更新配置项
 * @param id number 主键
 * @param vendor string 文件存储提供商
 * @param name string 配置名
 * @param key string 配置键
 * @param value string 配置值
 * @param remark string 备注
 * @returns AdminCore.NoneRsp
 */
export const setVendorUpdate = (data: AdminCore.V1VendorUpdateReq): Promise<Rsp<AdminCore.NoneRsp>> => {
	return ajax_post("/v1/vendor/update/", data);
};
