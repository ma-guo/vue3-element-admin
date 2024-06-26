<!-- 用户管理 -->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!-- 部门树 -->
      <el-col :lg="5" :xs="24" class="mb-[12px]">
        <oss-tree v-model="ossQuery" @node-click="handleOssQuery" />
      </el-col>

      <!-- 用户列表 -->
      <el-col :lg="19" :xs="24">
        <div class="search-container">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="当前选用服务商" prop="status">
              <el-select v-model="currentVendor.value" placeholder="全部" class="!w-[140px]">
                <el-option v-for="item in vendorList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="venderChangeTipsVisible = true">
                <el-icon><Select /></el-icon>
                选用当前服务商</el-button>
            </el-form-item>
          </el-form>
        </div>

        <el-card shadow="never" class="table-container">
          <template #header>
            <div class="flex justify-between">
              <div class="row">
                OSS [{{ ossQuery.label }}] 配置信息
                <el-button type="primary" @click="loadOssVendorOptions"><i-ep-search />刷新</el-button>
              </div>
            </div>
          </template>

          <el-table v-loading="loading" :data="ossList">
            <!-- <el-table-column key="id" label="ID" align="center" prop="id" width="100" /> -->
            <el-table-column label="配置名" align="center" prop="name" />

            <el-table-column label="配置值" align="center" prop="value" />
            <el-table-column label="备注" align="center" prop="remark" />
            <el-table-column label="更新时间" align="center" prop="updateTime" width="160" />
            <el-table-column label="操作" fixed="right" width="80">
              <template #default="scope">
                <el-button v-hasPerm="['sys:oss:edit']" type="primary" link size="small"
                  @click="openDialog('user-form', scope.row.id)"><i-ep-edit />编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 弹窗 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" append-to-body @close="closeDialog">
      <!-- 用户新增/编辑表单 -->
      <el-form v-if="dialog.type === 'user-form'" ref="userFormRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="配置名" prop="name">
          <el-input v-model="formData.name" :readonly="true" placeholder="配置名" />
        </el-form-item>
        <el-form-item label="配置值" prop="value" v-if="!formOptions || formOptions.length == 0">
          <el-input v-model="formData.value" placeholder="请输入配置值" />
        </el-form-item>
        <el-form-item label="配置值" prop="value" v-if="formOptions && formOptions.length > 0">
          <el-select v-model="formData.value" placeholder="选择配置值" class="!w-[200px]">
            <el-option v-for="item in formOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="新的配置备注" />
        </el-form-item>
      </el-form>
      <!-- 弹窗底部操作按钮 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="venderChangeTipsVisible" title="切换确认" align-center>
      <span>切换服务商前请确认参数已配置正确, 同时旧参数勿删除,
        否则无法操作旧文件。 请谨慎操作</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="venderChangeTipsVisible = false">不切换</el-button>
          <el-button type="primary" @click="updateCurrentVendor">
            确认切换
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "OssStore",
  inheritAttrs: false,
});

import {
  getVendorForm,
  setVendorUpdate,
  getVendorList,
  getVendorPage,
} from "@/api/admin/api";

interface OssQueryWrap extends AdminCore.V1VendorPageReq {
  value: string;
  label: string;
}
const queryFormRef = ref(ElForm); // 查询表单
const userFormRef = ref(ElForm); // 用户表单

const loading = ref(false); //  加载状态
const queryParams = reactive<AdminCore.V1UsersPageReq>({
  keywords: "",
  status: 1,
  deptId: 0,
  pageNum: 1,
  pageSize: 10,
  startTime: "",
  endTime: "",
});

const ossQuery = reactive<OssQueryWrap>({
  vendor: "",
  pageNum: 1,
  pageSize: 10,
  value: "",
  label: "",
});

const ossList = ref<AdminCore.V1VendorItem[]>(); // OSS列表
const dateTimeRange = ref("");
const total = ref(0); // 数据总数
const vendorList = ref<AdminCore.StringOptionItem[]>(); // 角色下拉数据源
const currentVendor = ref<AdminCore.V1VendorItem>({
  id: 0,
  vendor: "",
  name: "",
  key: "",
  remark: "",
  value: "",
  updateTime: "",
}); // 当前选用服务商
const formOptions = ref<AdminCore.StringOptionItem[]>(); // 编辑选项数据源
const venderChangeTipsVisible = ref(false);

watch(dateTimeRange, (newVal) => {
  if (newVal) {
    queryParams.startTime = newVal[0];
    queryParams.endTime = newVal[1];
  }
});

// 弹窗对象
const dialog = reactive({
  visible: false,
  type: "user-form",
  width: 800,
  title: "",
});

// 用户表单数据
const formData = reactive<AdminCore.V1VendorItem>({
  id: 0,
  vendor: "",
  name: "",
  key: "",
  remark: "",
  value: "",
  updateTime: "",
});

// 用户导入数据
const importData = reactive({
  deptId: undefined,
  file: undefined,
  fileList: [],
});

// 校验规则
const rules = reactive({
  value: [{ required: true, message: "配置值不能为空", trigger: "blur" }],
  remark: [{ required: true, message: "配置名不能为空", trigger: "blur" }],
});

const handleOssQuery = async () => {
  loading.value = true;
  ossQuery.vendor = ossQuery.value;
  const rsp = await getVendorPage(ossQuery);
  loading.value = false;
  if (rsp.result == 0) {
    ossList.value = rsp.data.items;
    total.value = rsp.data.total;
  }
}

/** 重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  handleOssQuery();
}

const loadOssVendorOptions = async () => {
  const rsp = await getVendorList({});
  if (rsp.result != 0) {
    return;
  }
  const { current, items } = rsp.data;
  currentVendor.value = current;

  ossQuery.vendor = current.value;

  vendorList.value = items[0].children;
  if (current.value) {
    ossQuery.value = current.value;
    const tmp = vendorList.value.find((item) => item.value === current.value);
    if (tmp) {
      // console.log({ tmp, ossQuery })
      ossQuery.label = tmp.label;
    }
    handleOssQuery();
  }
}

/**
 * 打开弹窗
 *
 * @param type 弹窗类型  用户表单：user-form | 用户导入：user-import
 * @param id 用户ID
 */
const openDialog = async (type: string, id: number) => {
  dialog.visible = true;
  dialog.type = type;

  dialog.title = "修改配置";
  const rsp = await getVendorForm({ id });
  if (rsp.result != 0) {
    return;
  }
  const item = rsp.data.item;
  formOptions.value = rsp.data.options;
  Object.assign(formData, { ...item });
}

/**
 * 关闭弹窗
 */
function closeDialog() {
  dialog.visible = false;
  if (dialog.type === "user-form") {
    userFormRef.value.resetFields();
    userFormRef.value.clearValidate();

    formData.id = 0;
  } else if (dialog.type === "user-import") {
    importData.file = undefined;
    importData.fileList = [];
  }
}

/** 表单提交 */
const handleSubmit = useThrottleFn(() => {
  userFormRef.value.validate(async (valid: any) => {
    if (valid) {
      loading.value = true;
      const rsp = await setVendorUpdate(formData);
      loading.value = false;
      if (rsp.result == 0) {
        ElMessage.success("配置修改成功");
        closeDialog();
        handleOssQuery();
      }
    }
  });
}, 3000);

const updateCurrentVendor = async () => {
  venderChangeTipsVisible.value = false;
  const current = currentVendor.value;
  loading.value = true;
  await setVendorUpdate(current);
  ElMessage.success("已设置当前服务商");
  await loadOssVendorOptions();
  loading.value = false;
};

onMounted(() => {
  loadOssVendorOptions();
});
</script>
