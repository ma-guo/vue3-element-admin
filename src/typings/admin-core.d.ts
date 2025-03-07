
// Generated by niuhe.idl, search "niuhe" plugin for vscode
// 重新生成时本文件将被复写, 请不要手动修改. 配置 "#tstypes" 可指定新路径

declare namespace AdminCore {

	// gen enum const

	/**
	* 通用状态枚举 
	*
	* 成员包括 Enable(1), Disable(0)
	*/
	enum CommStatusEnum {
		/** 启用 */
		Enable = 1,
		/** 停用 */
		Disable = 0,
	}

	/**
	* 用户性别定义 
	*
	* 成员包括 Unknow(0), Man(1), Woman(2)
	*/
	enum GenderEnum {
		/** 未知 */
		Unknow = 0,
		/** 男 */
		Man = 1,
		/** 女 */
		Woman = 2,
	}

	/**
	* 数据权限 
	*
	* 成员包括 All(0), DeptSub(1), Dept(2), Self(3)
	*/
	enum DataScopeEnum {
		/** 所有数据 */
		All = 0,
		/** 部门及子部门数据 */
		DeptSub = 1,
		/** 本部门数据 */
		Dept = 2,
		/** 本人数据 */
		Self = 3,
	}

	/**
	* 菜单状态枚举 
	*
	* 成员包括 Visible(1), InVisible(0)
	*/
	enum MenuStatusEnum {
		/** 显示 */
		Visible = 1,
		/** 隐藏 */
		InVisible = 0,
	}

	/**
	* 菜单状态枚举 
	*
	* 成员包括 NULL("NULL"), CATALOG("CATALOG"), MENU("MENU"), BUTTON("BUTTON"), EXTLINK("EXTLINK")
	*/
	enum MenuTypeEnum {
		/** 无类型 */
		NULL = "NULL",
		/** 目录 */
		CATALOG = "CATALOG",
		/** 菜单 */
		MENU = "MENU",
		/** 按钮 */
		BUTTON = "BUTTON",
		/** 外链 */
		EXTLINK = "EXTLINK",
	}

	/**
	* 菜单类型组 
	*
	* 成员包括 MENU(1), CATALOG(2), EXTLINK(3), BUTTON(4)
	*/
	enum MenuTypeGroup {
		/** MENU */
		MENU = 1,
		/** CATALOG */
		CATALOG = 2,
		/** EXTLINK */
		EXTLINK = 3,
		/** BUTTON */
		BUTTON = 4,
	}

	/**
	* 七牛存储区域 
	*
	* 成员包括 Huadong("ZoneHuadong"), Huabei("ZoneHuabei"), Huanan("ZoneHuanan"), Beimei("ZoneBeimei"), Xinjiapo("ZoneXinjiapo"), ZheJiang2("ZoneHuadongZheJiang2")
	*/
	enum QiniuZoneEnum {
		/** 华东机房 */
		Huadong = "ZoneHuadong",
		/** 华北机房 */
		Huabei = "ZoneHuabei",
		/** 华南机房 */
		Huanan = "ZoneHuanan",
		/** 北美机房 */
		Beimei = "ZoneBeimei",
		/** 新加坡机房 */
		Xinjiapo = "ZoneXinjiapo",
		/** 华东浙江 2 区 */
		ZheJiang2 = "ZoneHuadongZheJiang2",
	}

	/**
	* 文件存储提供商 
	*
	* 成员包括 Local("local"), Qiniu("qiniu"), Aliyun("aliyun"), Tencent("tencent")
	*/
	enum FileVendorEnum {
		/** 本机存储 */
		Local = "local",
		/** 七牛存储 */
		Qiniu = "qiniu",
		/** 阿里云存储 */
		Aliyun = "aliyun",
		/** 腾讯云存储 */
		Tencent = "tencent",
	}

	// gen model v1


	/** 本请求不需要参数 */
	interface NoneReq { }


	/** 返回数据为空 */
	interface NoneRsp { }


	/**
	 * 选项数值
	 *
	 * 成员包括 value, label
	 */
	interface LongOptionItem {
		/** 选项ID */
		value: number;
		/** 选项名称 */
		label: string;
	}

	/**
	 * 选项数值
	 *
	 * 成员包括 value, label
	 */
	interface StringOptionItem {
		/** 选项ID */
		value: string;
		/** 选项名称 */
		label: string;
	}

	/** 成员包括 value, label, children */
	interface LongOptions {
		/** 选项ID */
		value: number;
		/** 选项名称 */
		label: string;
		/** 子选项 */
		children: LongOptions[];
	}

	/** 成员包括 value, label, children */
	interface StringOptions {
		/** 选项ID */
		value: string;
		/** 选项名称 */
		label: string;
		/** 子选项 */
		children: StringOptions[];
	}

	/** 成员包括 id, name, code, remark, status */
	interface V1DictTypesItem {
		/** 主键 */
		id: number;
		/** 类型名称 */
		name: string;
		/** 类型编码 */
		code: string;
		/** 备注 */
		remark: string;
		/** 状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
	}

	/**
	 * 菜单视图对象
	 *
	 * 成员包括 id, name, perm
	 */
	interface V1MenuTiny {
		/** 菜单ID */
		id: number;
		/** 菜单名称 */
		name: string;
		/** 按钮权限标识 */
		perm: string;
	}

	/**
	 * 登录请求参数
	 *
	 * 成员包括 username, password, captchaKey, captchaCode
	 */
	interface AuthLoginReq {
		/** 用户名 */
		username: string;
		/** 密码 */
		password: string;
		/** 验证码key */
		captchaKey: string;
		/** 验证码 */
		captchaCode: string;
	}

	/**
	 * 登录返回参数
	 *
	 * 成员包括 accessToken, tokenType, refreshToken, expiresIn
	 */
	interface AauthLoginRsp {
		/** 访问token */
		accessToken: string;
		/** token 类型, 固定为 Bearer */
		tokenType: string;
		/** 刷新token */
		refreshToken: string;
		/** token 过期时间, 单位毫秒 */
		expiresIn: number;
	}

	/**
	 * 验证码返回参数
	 *
	 * 成员包括 captchaKey, captchaBase64, width, height
	 */
	interface AuthCaptchaRsp {
		/** 验证码key */
		captchaKey: string;
		/** 验证码, base64字符串。[data:image/png;base64,] 开头 */
		captchaBase64: string;
		/** 图片宽度 */
		width: number;
		/** 图片高度 */
		height: number;
	}

	/**
	 * 获取当前登录用户信息返回参数
	 *
	 * 成员包括 userId, username, nickname, avatar, roles, perms
	 */
	interface V1UsersMeRsp {
		/** 用户ID */
		userId: number;
		/** 用户名 */
		username: string;
		/** 用户昵称 */
		nickname: string;
		/** 头像地址 */
		avatar: string;
		/** 用户角色编码集合 */
		roles: string[];
		/** 用户权限标识集合 */
		perms: string[];
	}

	/**
	 * 用户分页列表项数据结构
	 *
	 * 成员包括 id, username, nickname, mobile, genderLabel, avatar, email, status, deptName, roleNames, createTime
	 */
	interface V1UserPageItem {
		/** 用户ID */
		id: number;
		/** 用户名 */
		username: string;
		/** 用户昵称 */
		nickname: string;
		/** 手机号 */
		mobile: string;
		/** 性别 */
		genderLabel: string;
		/** 头像地址 */
		avatar: string;
		/** 用户邮箱 */
		email: string;
		/** 用户状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 部门名称 */
		deptName: string;
		/** 角色名称 */
		roleNames: string;
		/** 创建时间 */
		createTime: string;
	}

	/** 成员包括 keywords, status, deptId, pageNum, pageSize, startTime, endTime */
	interface V1UsersPageReq {
		/** 关键字 */
		keywords: string;
		/** 用户状态 */
		status: number;
		/** 部门ID */
		deptId: number;
		/** 页码 */
		pageNum: number;
		/** 每页条数 */
		pageSize: number;
		/** 开始时间-年月日 */
		startTime: string;
		/** 结束时间-年月日 */
		endTime: string;
	}

	/**
	 * 用户分页列表返回参数
	 *
	 * 成员包括 total, list
	 */
	interface V1UsersPageRsp {
		/** 总数 */
		total: number;
		/** 用户列表 */
		list: V1UserPageItem[];
	}

	/**
	 * 新增用户请求参数
	 *
	 * 成员包括 id, username, nickname, password, mobile, gender, avatar, email, status, deptId, roleIds
	 */
	interface V1UsersAddReq {
		/** 用户ID */
		id: number;
		/** 用户名 */
		username: string;
		/** 用户昵称 */
		nickname: string;
		/** 密码 */
		password: string;
		/** 手机号 */
		mobile: string;
		/** 性别 取值范围及含义: 0 - 未知; 1 - 男; 2 - 女; */
		gender: number;
		/** 头像地址 */
		avatar: string;
		/** 用户邮箱 */
		email: string;
		/** 用户状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 部门ID */
		deptId: number;
		/** 角色ID集合 */
		roleIds: number[];
	}

	/**
	 * 用户表单请求参数
	 *
	 * 成员包括 userId
	 */
	interface V1UserFormReq {
		/** 用户ID */
		userId: number;
	}

	/**
	 * 用户表单返回参数
	 *
	 * 成员包括 id, username, nickname, mobile, gender, avatar, email, status, deptId, roleIds
	 */
	interface V1UserFormRsp {
		/** 用户ID */
		id: number;
		/** 用户名 */
		username: string;
		/** 用户昵称 */
		nickname: string;
		/** 手机号 */
		mobile: string;
		/** 性别 取值范围及含义: 0 - 未知; 1 - 男; 2 - 女; */
		gender: number;
		/** 头像地址 */
		avatar: string;
		/** 用户邮箱 */
		email: string;
		/** 用户状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 部门ID */
		deptId: number;
		/** 角色ID集合 */
		roleIds: number[];
	}

	/**
	 * 修改用户信息参数
	 *
	 * 成员包括 id, username, nickname, mobile, gender, avatar, email, status, deptId, roleIds
	 */
	interface V1UserUpdateReq {
		/** 用户ID */
		id: number;
		/** 用户名 */
		username: string;
		/** 用户昵称 */
		nickname: string;
		/** 手机号 */
		mobile: string;
		/** 用户状态 取值范围及含义: 0 - 未知; 1 - 男; 2 - 女; */
		gender: number;
		/** 头像地址 */
		avatar: string;
		/** 用户邮箱 */
		email: string;
		/** 用户状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 部门ID */
		deptId: number;
		/** 角色ID集合 */
		roleIds: number[];
	}

	/**
	 * 删除用户请求参数
	 *
	 * 成员包括 ids
	 */
	interface V1UsersDeleteReq {
		/** 用户ID，多个以英文逗号(,)分割 */
		ids: string;
	}

	/**
	 * 修改密码请求参数
	 *
	 * 成员包括 userId, password
	 */
	interface V1UsersPasswordReq {
		/** 用户id */
		userId: number;
		/** 新密码 */
		password: string;
	}

	/**
	 * 修改用户状态请求参数
	 *
	 * 成员包括 userId, status
	 */
	interface V1UsersStatusReq {
		/** 用户ID */
		userId: number;
		/** 用户状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
	}

	/**
	 * 角色分页列表
	 *
	 * 成员包括 keywords, pageNum, pageSize
	 */
	interface V1RolesPageReq {
		/** 搜索关键字 */
		keywords: string;
		/** 页码 */
		pageNum: number;
		/** 每页数量 */
		pageSize: number;
	}

	/**
	 * 角色列表项
	 *
	 * 成员包括 id, name, code, status, sort, createTime, updateTime
	 */
	interface V1RolesItem {
		/** 角色ID */
		id: number;
		/** 角色名称 */
		name: string;
		/** 角色编码 */
		code: string;
		/** 角色状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 排序 */
		sort: number;
		/** 创建时间 */
		createTime: string;
		/** 更新时间 */
		updateTime: string;
	}

	/** 成员包括 list, total */
	interface V1RolesPageRsp {
		/** 数据项 */
		list: V1RolesItem[];
		/** 总数 */
		total: number;
	}

	/** 成员包括 items */
	interface V1RolesOptiosRsp {
		/** 角色下拉列表项 */
		items: LongOptionItem[];
	}

	/**
	 * 角色新增
	 *
	 * 成员包括 id, name, code, status, sort, dataScope
	 */
	interface V1RolesAddReq {
		/** 角色ID */
		id: number;
		/** 角色名称 */
		name: string;
		/** 角色编码 */
		code: string;
		/** 角色状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 排序 */
		sort: number;
		/** 数据权限 取值范围及含义: 0 - 所有数据; 1 - 部门及子部门数据; 2 - 本部门数据; 3 - 本人数据; */
		dataScope: number;
	}

	/**
	 * 角色表单数据请求结构
	 *
	 * 成员包括 id
	 */
	interface V1RolesFormReq {
		/** 角色ID */
		id: number;
	}

	/**
	 * 角色表单数据
	 *
	 * 成员包括 id, name, code, status, sort, dataScope
	 */
	interface V1RolesFormRsp {
		/** 角色ID */
		id: number;
		/** 角色名称 */
		name: string;
		/** 角色编码 */
		code: string;
		/** 角色状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 排序 */
		sort: number;
		/** 数据权限 取值范围及含义: 0 - 所有数据; 1 - 部门及子部门数据; 2 - 本部门数据; 3 - 本人数据; */
		dataScope: number;
	}

	/**
	 * 角色表单数据
	 *
	 * 成员包括 id, name, code, status, sort, dataScope
	 */
	interface V1RolesUpdateReq {
		/** 角色ID */
		id: number;
		/** 角色名称 */
		name: string;
		/** 角色编码 */
		code: string;
		/** 角色状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 排序 */
		sort: number;
		/** 数据权限 取值范围及含义: 0 - 所有数据; 1 - 部门及子部门数据; 2 - 本部门数据; 3 - 本人数据; */
		dataScope: number;
	}

	/**
	 * 角色删除
	 *
	 * 成员包括 ids
	 */
	interface V1RolesDeleteReq {
		/** 删除角色，多个以英文逗号(,)分割 */
		ids: string;
	}

	/**
	 * 获取角色的菜单ID集合
	 *
	 * 成员包括 roleId
	 */
	interface V1RolesMenuIdsReq {
		/** 角色ID */
		roleId: number;
	}

	/**
	 * 获取角色的菜单ID集合
	 *
	 * 成员包括 items
	 */
	interface V1RolesMenuIdsRsp {
		/** 菜单ID集合 */
		items: number[];
	}

	/**
	 * 给角色分配权限
	 *
	 * 成员包括 roleId, menuIds
	 */
	interface V1RolesMenusReq {
		/** 角色ID */
		roleId: number;
		/** 菜单ID集合 */
		menuIds: number[];
	}

	/**
	 * 修改角色状态
	 *
	 * 成员包括 roleId, status
	 */
	interface V1RolesStatusReq {
		/** 角色ID */
		roleId: number;
		/** 角色状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
	}

	/**
	 * 菜单视图对象
	 *
	 * 成员包括 id, parentId, name, icon, path, routeName, component, sort, visible, redirect, type, perm, children
	 */
	interface MenuItem {
		/** 菜单ID */
		id: number;
		/** 父菜单ID */
		parentId: number;
		/** 菜单名称 */
		name: string;
		/** ICON */
		icon: string;
		/** 路由相对路径 */
		path: string;
		/** 路由名称 */
		routeName: string;
		/** 组件路径 */
		component: string;
		/** 菜单排序(数字越小排名越靠前) */
		sort: number;
		/** 是否可见 取值范围及含义: 1 - 显示; 0 - 隐藏; */
		visible: number;
		/** 跳转路径 */
		redirect: string;
		/** 菜单类型 取值范围及含义: NULL - 无类型; CATALOG - 目录; MENU - 菜单; BUTTON - 按钮; EXTLINK - 外链; */
		type: string;
		/** 按钮权限标识 */
		perm: string;
		/** 子菜单 */
		children: MenuItem[];
	}

	/**
	 * 菜单列表请求
	 *
	 * 成员包括 keywords, status, type
	 */
	interface V1MenusListReq {
		/** 关键字 */
		keywords: string;
		/** 状态 取值范围及含义: 1 - 显示; 0 - 隐藏; */
		status: number;
		/** 菜单类型, 忽略本参数 取值范围及含义: 1 - MENU; 2 - CATALOG; 3 - EXTLINK; 4 - BUTTON; */
		type: number;
	}

	/**
	 * 菜单列表响应
	 *
	 * 成员包括 items
	 */
	interface V1MenusListRsp {
		/** 菜单列表 */
		items: MenuItem[];
	}

	/**
	 * 菜单删除请求
	 *
	 * 成员包括 ids
	 */
	interface V1MenusDeleteReq {
		/** 菜单ID */
		ids: string;
	}

	/**
	 * 菜单表单对象
	 *
	 * 成员包括 id, parentId, name, type, path, component, perm, visible, sort, icon, redirect, keepAlive, alwaysShow
	 */
	interface V1MenusAddReq {
		/** 菜单ID */
		id: number;
		/** 父菜单ID */
		parentId: number;
		/** 菜单名称 */
		name: string;
		/** 菜单类型 取值范围及含义: NULL - 无类型; CATALOG - 目录; MENU - 菜单; BUTTON - 按钮; EXTLINK - 外链; */
		type: string;
		/** 路由路径 */
		path: string;
		/** 组件路径(vue页面完整路径，省略.vue后缀) */
		component: string;
		/** 权限标识 */
		perm: string;
		/** 显示状态 取值范围及含义: 1 - 显示; 0 - 隐藏; */
		visible: number;
		/** 排序(数字越小排名越靠前) */
		sort: number;
		/** 菜单图标 */
		icon: string;
		/** 跳转路径 */
		redirect: string;
		/** 是否开启缓存 */
		keepAlive: number;
		/** 是否总是显示 */
		alwaysShow: number;
	}

	/** 成员包括 value, label, children */
	interface MenuOptions {
		/** 菜单ID */
		value: number;
		/** 菜单名称 */
		label: string;
		/** 子菜单 */
		children: MenuOptions[];
	}

	/**
	 * 菜单选项列表响应
	 *
	 * 成员包括 items
	 */
	interface V1MenusOptionsRsp {
		/** 菜单选项列表 */
		items: MenuOptions[];
	}

	/** 成员包括 title, icon, hiddle, roles, keepAlive */
	interface MenuRouteMeta {
		/** 路由title */
		title: string;
		/** 路由icon */
		icon: string;
		/** 是否隐藏 */
		hiddle: boolean;
		/** 拥有路由权限的角色编码 */
		roles: string[];
		/** 是否开启缓存 */
		keepAlive: boolean;
	}

	/**
	 * 路由属性类型
	 *
	 * 成员包括 path, component, name, redirect, meta, children
	 */
	interface MenuRouteItem {
		/** 路由路径 */
		path: string;
		/** 组件路径 */
		component: string;
		/** 路由名称 */
		name: string;
		/** 跳转链接 */
		redirect: string;
		/** 路由元信息 */
		meta: MenuRouteMeta;
		/** 子路由 */
		children: MenuRouteItem[];
	}

	/** 成员包括 items */
	interface MenuRouteRsp {
		/** 路由列表 */
		items: MenuRouteItem[];
	}

	/**
	 * 菜单表单请求
	 *
	 * 成员包括 id
	 */
	interface V1MenusFormReq {
		/** 菜单ID */
		id: number;
	}

	/**
	 * 菜单表单数据
	 *
	 * 成员包括 id, parentId, name, type, path, component, perm, visible, sort, icon, redirect, alwaysShow, keepAlive
	 */
	interface V1MenusFormRsp {
		/** 菜单ID */
		id: number;
		/** 父菜单ID */
		parentId: number;
		/** 菜单名称 */
		name: string;
		/** 菜单类型 取值范围及含义: NULL - 无类型; CATALOG - 目录; MENU - 菜单; BUTTON - 按钮; EXTLINK - 外链; */
		type: string;
		/** 路由路径 */
		path: string;
		/** 组件路径(vue页面完整路径，省略.vue后缀) */
		component: string;
		/** 权限标识 */
		perm: string;
		/** 显示状态 取值范围及含义: 1 - 显示; 0 - 隐藏; */
		visible: number;
		/** 排序(数字越小排名越靠前) */
		sort: number;
		/** 菜单图标 */
		icon: string;
		/** 跳转路径 */
		redirect: string;
		/** 是否总是显示 */
		alwaysShow: number;
		/** 是否开启缓存 */
		keepAlive: number;
	}

	/**
	 * 修改菜单请求参数
	 *
	 * 成员包括 id, parentId, name, type, path, component, perm, visible, sort, icon, redirect, alwaysShow, keepAlive
	 */
	interface V1MenusUpdateReq {
		/** 菜单ID */
		id: number;
		/** 父菜单ID */
		parentId: number;
		/** 菜单名称 */
		name: string;
		/** 菜单类型 取值范围及含义: NULL - 无类型; CATALOG - 目录; MENU - 菜单; BUTTON - 按钮; EXTLINK - 外链; */
		type: string;
		/** 路由路径 */
		path: string;
		/** 组件路径(vue页面完整路径，省略.vue后缀) */
		component: string;
		/** 权限标识 */
		perm: string;
		/** 显示状态 取值范围及含义: 1 - 显示; 0 - 隐藏; */
		visible: number;
		/** 排序(数字越小排名越靠前) */
		sort: number;
		/** 菜单图标 */
		icon: string;
		/** 跳转路径 */
		redirect: string;
		/** 是否总是显示 */
		alwaysShow: number;
		/** 是否开启缓存 */
		keepAlive: number;
	}

	/**
	 * 修改菜单状态请求参数
	 *
	 * 成员包括 id, visible
	 */
	interface V1MenusStatusReq {
		/** 菜单ID */
		id: number;
		/** 菜单状态 取值范围及含义: 1 - 显示; 0 - 隐藏; */
		visible: number;
	}

	/**
	 * 菜单列表请求
	 *
	 * 成员包括 keywords, type, pageNum, pageSize
	 */
	interface V1MenusPageReq {
		/** 关键字 */
		keywords: string;
		/** 菜单类型, 忽略本参数 取值范围及含义: 1 - MENU; 2 - CATALOG; 3 - EXTLINK; 4 - BUTTON; */
		type: number;
		/** 页码 */
		pageNum: number;
		/** 每页记录数 */
		pageSize: number;
	}

	/**
	 * 菜单列表响应
	 *
	 * 成员包括 items, total
	 */
	interface V1MenusPageRsp {
		/** 菜单列表 */
		items: V1MenuTiny[];
		/** 总记录数 */
		total: number;
	}

	/**
	 * 部门信息
	 *
	 * 成员包括 id, parentId, name, sort, status, createTime, updateTime, children
	 */
	interface V1DeptItem {
		/** 部门id */
		id: number;
		/** 父部门id */
		parentId: number;
		/** 部门名称 */
		name: string;
		/** 排序 */
		sort: number;
		/** 状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 创建时间 */
		createTime: string;
		/** 修改时间 */
		updateTime: string;
		/** 子部门 */
		children: V1DeptItem[];
	}

	/**
	 * 部门列表请求
	 *
	 * 成员包括 keyword, status
	 */
	interface V1DeptListReq {
		/** 搜索关键词 */
		keyword: string;
		/** 状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
	}

	/**
	 * 部门列表响应
	 *
	 * 成员包括 items
	 */
	interface V1DeptListRsp {
		/** 部门列表 */
		items: V1DeptItem[];
	}

	/**
	 * 部门添加请求参数
	 *
	 * 成员包括 id, parentId, name, sort, status
	 */
	interface V1DeptAddReq {
		/** 部门id, 前端使用 */
		id: number;
		/** 父部门id */
		parentId: number;
		/** 部门名称 */
		name: string;
		/** 排序 */
		sort: number;
		/** 状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
	}

	/**
	 * 部门下拉列表响应
	 *
	 * 成员包括 items
	 */
	interface V1DeptOptionsRsp {
		/** 部门列表 */
		items: LongOptions[];
	}

	/**
	 * 修改部门请求参数
	 *
	 * 成员包括 id, parentId, name, sort, status
	 */
	interface V1DeptUpdateReq {
		/** 部门id */
		id: number;
		/** 父部门id */
		parentId: number;
		/** 部门名称 */
		name: string;
		/** 排序 */
		sort: number;
		/** 状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
	}

	/**
	 * 获取部门表单数据请求参数
	 *
	 * 成员包括 id
	 */
	interface V1DeptFormReq {
		/** 部门id */
		id: number;
	}

	/**
	 * 获取部门表单数据返回参数
	 *
	 * 成员包括 id, parentId, name, sort, status
	 */
	interface V1DeptFormRsp {
		/** 部门id */
		id: number;
		/** 父部门id */
		parentId: number;
		/** 部门名称 */
		name: string;
		/** 排序 */
		sort: number;
		/** 状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
	}

	/**
	 * 删除部门请求参数
	 *
	 * 成员包括 ids
	 */
	interface V1DeptDeleteReq {
		/** 部门ID，多个以英文逗号(,)分割 */
		ids: string;
	}

	/** 成员包括 keywords, typeCode, pageNum, pageSize */
	interface V1DictPageReq {
		/** 关键字(类型名称/类型编码) */
		keywords: string;
		/** 字典类型编码 */
		typeCode: string;
		/** 页码 */
		pageNum: number;
		/** 每页记录数 */
		pageSize: number;
	}

	/** 成员包括 id, name, value, remark, status */
	interface V1DictItem {
		/** 主键 */
		id: number;
		/** 字典名称 */
		name: string;
		/** 字典值 */
		value: string;
		/** 备注 */
		remark: string;
		/** 状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
	}

	/** 成员包括 list, total */
	interface V1DictPageRsp {
		/** 列表 */
		list: V1DictItem[];
		/** 总记录数 */
		total: number;
	}

	/** 成员包括 typeCode */
	interface V1DictOptionsReq {
		/** 字典类型编码 */
		typeCode: string;
	}

	/** 成员包括 items */
	interface V1DictOptionsRsp {
		/** 选项列表 */
		items: StringOptions[];
	}

	/** 成员包括 id */
	interface V1DictFormReq {
		/** 字典ID */
		id: number;
	}

	/** 成员包括 id, typeCode, name, value, status, sort, remark */
	interface V1DictFormRsp {
		/** 主键 */
		id: number;
		/** 类型编码 */
		typeCode: string;
		/** 字典名称 */
		name: string;
		/** 字典值 */
		value: string;
		/** 状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 排序 */
		sort: number;
		/** 备注 */
		remark: string;
	}

	/** 成员包括 id, typeCode, name, value, status, sort, remark */
	interface V1DictAddReq {
		/** 主键 */
		id: number;
		/** 类型编码 */
		typeCode: string;
		/** 字典名称 */
		name: string;
		/** 字典值 */
		value: string;
		/** 状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 排序 */
		sort: number;
		/** 备注 */
		remark: string;
	}

	/** 成员包括 id, typeCode, name, value, status, sort, remark */
	interface V1DictUpdateReq {
		/** 主键 */
		id: number;
		/** 类型编码 */
		typeCode: string;
		/** 字典名称 */
		name: string;
		/** 字典值 */
		value: string;
		/** 状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 排序 */
		sort: number;
		/** 备注 */
		remark: string;
	}

	/** 成员包括 ids */
	interface V1DictDeleteReq {
		/** 字典ID，多个以英文逗号(,)拼接 */
		ids: string;
	}

	/** 成员包括 keywords, pageNum, pageSize */
	interface V1DictTypesPageReq {
		/** 关键字(类型名称/类型编码) */
		keywords: string;
		/** 页码 */
		pageNum: number;
		/** 每页记录数 */
		pageSize: number;
	}

	/** 成员包括 list, total */
	interface V1DictTypesPageRsp {
		/** 列表 */
		list: V1DictTypesItem[];
		/** 总记录数 */
		total: number;
	}

	/** 成员包括 id */
	interface V1DictTypesFormReq {
		/** 主键 */
		id: number;
	}

	/** 成员包括 id, name, code, status, remark */
	interface V1DictTypesFormRsp {
		/** 主键 */
		id: number;
		/** 类型名称 */
		name: string;
		/** 类型编码 */
		code: string;
		/** 状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 备注 */
		remark: string;
	}

	/** 成员包括 id, name, code, status, remark */
	interface V1DictTypesAddReq {
		/** 主键 */
		id: number;
		/** 类型名称 */
		name: string;
		/** 类型编码-必填 */
		code: string;
		/** 状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 备注 */
		remark: string;
	}

	/** 成员包括 id, name, code, status, remark */
	interface V1DictTypesUpdateReq {
		/** 主键 */
		id: number;
		/** 类型名称 */
		name: string;
		/** 类型编码 */
		code: string;
		/** 状态 取值范围及含义: 1 - 启用; 0 - 停用; */
		status: number;
		/** 备注 */
		remark: string;
	}

	/** 成员包括 ids */
	interface V1DictTypesDeleteReq {
		/** 字典类型ID，多个以英文逗号(,)分割 */
		ids: string;
	}

	/**
	 * 文件结构信息
	 *
	 * 成员包括 id, name, url, key, vendor, createTime, deleted, vendorName
	 */
	interface V1FileItem {
		/** 文件ID */
		id: number;
		/** 文件名 */
		name: string;
		/** 文件URL */
		url: string;
		/** 文件key */
		key: string;
		/** 菜单类型 取值范围及含义: local - 本机存储; qiniu - 七牛存储; aliyun - 阿里云存储; tencent - 腾讯云存储; */
		vendor: string;
		/** 创建时间 */
		createTime: string;
		/** 是否删除 */
		deleted: boolean;
		/** 文件存储提供商 */
		vendorName: string;
	}

	/**
	 * 文件上传请求
	 *
	 * 成员包括 name, url
	 */
	interface V1FilesUploadRsp {
		/** 文件名 */
		name: string;
		/** 文件URL */
		url: string;
	}

	/**
	 * 文件删除请求
	 *
	 * 成员包括 filePath
	 */
	interface V1FilesDeleteReq {
		/** 文件路径 */
		filePath: string;
	}

	/** 成员包括 url */
	interface V1FileFetchReq {
		/** 文件URL */
		url: string;
	}

	/**
	 * 文件分页请求
	 *
	 * 成员包括 pageNum, pageSize, vendor, name
	 */
	interface V1FilePageReq {
		/** 页码 */
		pageNum: number;
		/** 每页数量 */
		pageSize: number;
		/** 文件存储提供商 */
		vendor: string;
		/** 文件名 */
		name: string;
	}

	/** 成员包括 items, total */
	interface V1FilePageRsp {
		/** 文件列表 */
		items: V1FileItem[];
		/** 总数 */
		total: number;
	}

	/**
	 * 文件修改弹窗请求参数
	 *
	 * 成员包括 id
	 */
	interface V1FileFormReq {
		/** 文件 ID */
		id: number;
	}

	/**
	 * 文件弹窗信息返回
	 *
	 * 成员包括 id, name, url, key, vendor, createTime, deleted, vendorName, createTime
	 */
	interface V1FileFromRsp {
		/** 文件ID */
		id: number;
		/** 文件名 */
		name: string;
		/** 文件URL */
		url: string;
		/** 文件key */
		key: string;
		/** 菜单类型 取值范围及含义: local - 本机存储; qiniu - 七牛存储; aliyun - 阿里云存储; tencent - 腾讯云存储; */
		vendor: string;
		/** 创建时间 */
		createTime: string;
		/** 是否删除 */
		deleted: boolean;
		/** 文件存储提供商 */
		vendorName: string;
	}

	/** 成员包括 id, name */
	interface V1FileUpdateReq {
		/** 文件ID */
		id: number;
		/** 文件名 */
		name: string;
	}

	/** 成员包括 id, vendor, name, key, value, remark, updateTime */
	interface V1VendorItem {
		/** 主键 */
		id: number;
		/** 文件存储提供商 */
		vendor: string;
		/** 配置名 */
		name: string;
		/** 配置键 */
		key: string;
		/** 配置值 */
		value: string;
		/** 备注 */
		remark: string;
		/** 更新时间 */
		updateTime: string;
	}

	/**
	 * 获取文件存储区域返回
	 *
	 * 成员包括 qiniu
	 */
	interface V1FilesZoneRsp {
		/** 文件存储提供商列表 */
		qiniu: StringOptionItem[];
	}

	/**
	 * 获取文件存储提供商列表返回
	 *
	 * 成员包括 items, current
	 */
	interface V1FilesVendorsRsp {
		/** 文件存储提供商列表 */
		items: StringOptions[];
		/** 当前文件存储提供商 */
		current: V1VendorItem;
	}

	/** 成员包括 vendor, pageNum, pageSize */
	interface V1VendorPageReq {
		/** 文件存储提供商 */
		vendor: string;
		/** 页码 */
		pageNum: number;
		/** 每页记录数 */
		pageSize: number;
	}

	/** 成员包括 items, total */
	interface V1VendorPageRsp {
		/** 列表 */
		items: V1VendorItem[];
		/** 总记录数 */
		total: number;
	}

	/** 成员包括 id */
	interface V1VendorFormReq {
		/** 配置 id */
		id: number;
	}

	/** 成员包括 item, options */
	interface V1VendorFormRsp {
		/** 配置项 */
		item: V1VendorItem;
		/** 文件存储提供商列表 */
		options: StringOptionItem[];
	}

	/** 成员包括 id, vendor, name, key, value, remark */
	interface V1VendorUpdateReq {
		/** 主键 */
		id: number;
		/** 文件存储提供商 */
		vendor: string;
		/** 配置名 */
		name: string;
		/** 配置键 */
		key: string;
		/** 配置值 */
		value: string;
		/** 备注 */
		remark: string;
	}

	/** 成员包括 id, method, name, path, menus, remark, updateTime */
	interface V1ApiItem {
		/** 主键 */
		id: number;
		/** 请求方法 */
		method: string;
		/** API名称 */
		name: string;
		/** API路径 */
		path: string;
		/** API 菜单列表 */
		menus: string[];
		/** 备注 */
		remark: string;
		/** 更新时间 */
		updateTime: string;
	}

	/** 成员包括 keyword, pageNum, pageSize */
	interface V1ApiPageReq {
		/** 路径名称搜索 */
		keyword: string;
		/** 页码 */
		pageNum: number;
		/** 每页记录数 */
		pageSize: number;
	}

	/**
	 * 分页获取API列表
	 *
	 * 成员包括 items, button, total
	 */
	interface V1ApiPageRsp {
		/** 列表 */
		items: V1ApiItem[];
		/** 按钮类型 */
		button: number;
		/** 总记录数 */
		total: number;
	}

	/** 成员包括 id */
	interface V1ApiFormReq {
		/** 配置 id */
		id: number;
	}

	/** 成员包括 id, method, name, path, menus, remark, methods */
	interface V1ApiFormRsp {
		/** 主键 */
		id: number;
		/** 请求方法 */
		method: string;
		/** API名称 */
		name: string;
		/** API路径 */
		path: string;
		/** API 菜单列表 */
		menus: V1MenuTiny[];
		/** 备注 */
		remark: string;
		/** 方法列表 */
		methods: string[];
	}

	/** 成员包括 id, method, name, path, menus, remark */
	interface V1ApiUpdateReq {
		/** 主键 */
		id: number;
		/** 方法名 */
		method: string;
		/** API名称 */
		name: string;
		/** API路径 */
		path: string;
		/** 权限菜单按钮ID列表 */
		menus: number[];
		/** 备注 */
		remark: string;
	}

}