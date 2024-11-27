<!-- 用户管理 -->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!-- 用户列表 -->
      <el-col :lg="24" :xs="24">
        <div class="search-container">
          <el-form ref="queryFormRef" :model="state" :inline="true">
            <el-form-item label="关键字" prop="keyword">
              <el-input v-model="state.keyword" placeholder="API 名称搜索" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleApiQuery"><template #icon><i-ep-search /></template>搜索</el-button>
              <el-button @click="resetQuery">
                <template #icon><i-ep-refresh /></template>
                重置</el-button>
            </el-form-item>
          </el-form>
        </div>

        <el-card shadow="never" class="table-container">
          <el-table v-loading="state.loading" :data="apiList" highlight-current-row border>
            <el-table-column label="方法" align="center" prop="method" width="100" />
            <el-table-column label="Path" align="center" prop="path" width="160" />
            <el-table-column label="名称" align="center" prop="name" />
            <el-table-column label="备注" align="center" prop="remark" />
            <el-table-column label="限制权限">
              <template #default="{ row }">
                <div class="tags">
                  <el-text v-for="(item, idx) in row.menus" type="success">{{ item }}</el-text>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" width="160" />
            <el-table-column label="操作" fixed="right" width="80">
              <template #default="{ row }">
                <el-button type="primary" link size="small" @click="openDialog(row.id)"><i-ep-edit />编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-if="state.total > 0" v-model:total="state.total" v-model:page="state.pageNum"
            v-model:limit="state.pageSize" @pagination="handleApiQuery" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 弹窗 -->
    <el-dialog v-model="state.visible" title="修改API配置" append-to-body @close="closeDialog">
      <!-- 用户新增/编辑表单 -->
      <el-form ref="userFormRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-text>{{ formData.name }}</el-text>
        </el-form-item>
        <el-form-item label="PATH" prop="path">
          <el-text>{{ formData.method }} {{ formData.path }}</el-text>
        </el-form-item>
        <el-form-item label="权限" prop="menus">
          <el-select v-model="formData.menus" placeholder="请选择权限" multiple remote filterable
            :remote-method="loadMenusOptions" :loading="state.searching">
            <el-option v-for="(item, idx) in menusList" :key="idx" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="请输入备注" />
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
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "OssStore",
  inheritAttrs: false,
});

import {
  getApiPage,
  getApiForm,
  setApiUpdate,
  getMenusPage,
} from "@/api/admin/api";


const queryFormRef = ref(ElForm); // 查询表单
const userFormRef = ref(ElForm); // 用户表单

const apiList = ref<AdminCore.V1ApiItem[]>();
const menusList = ref<AdminCore.V1MenuTiny[]>(); // 角色下拉数据源

const state = reactive({
  loading: false,
  total: 0,
  menuType: 4,
  visible: false,
  pageNum: 1,
  pageSize: 10,
  keyword: '',
  searching: false,
  menus: [] as AdminCore.V1MenuTiny[]
});


// 用户表单数据
const formData = reactive({
  id: 0,
  method: "",
  name: "",
  path: "",
  remark: "",
  menus: [] as number[]
});


// 校验规则
const rules = reactive({
  value: [{ required: true, message: "配置值不能为空", trigger: "blur" }],
  // remark: [{ required: true, message: "配置名不能为空", trigger: "blur" }],
});

const handleApiQuery = async () => {
  state.loading = true;
  const rsp = await getApiPage({
    keyword: state.keyword,
    pageNum: state.pageNum,
    pageSize: state.pageSize,
  });
  state.loading = false;
  if (rsp.result == 0) {
    apiList.value = rsp.data.items;
    state.total = rsp.data.total;
    state.menuType = rsp.data.button
  }
}

/** 重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  handleApiQuery();
}

const loadMenusOptions = async (keyword: string) => {
  state.searching = true
  const rsp = await getMenusPage({
    keywords: keyword,
    type: state.menuType,
    pageNum: 1,
    pageSize: 50,
  });
  state.searching = false;
  if (rsp.result != 0) {
    return;
  }
  const { items } = rsp.data;
  const dict: Set<number> = new Set();

  items.forEach((item) => {
    dict.add(item.id);
  });
  state.menus.forEach((item) => {
    if (!dict.has(item.id)) {
      dict.add(item.id);
      items.push(item)
    }
  });
  menusList.value = items;
}

/**
 * 打开弹窗
 * @param id 用户ID
 */
const openDialog = async (id: number) => {
  state.visible = true;

  const rsp = await getApiForm({ id });
  if (rsp.result != 0) {
    return;
  }
  const item = rsp.data;
  formData.id = item.id;
  formData.method = item.method;
  formData.name = item.name;
  formData.path = item.path;
  formData.remark = item.remark;
  formData.menus = item.menus.map((item) => item.id);
  state.menus = item.menus;

  loadMenusOptions('');
}

/**
 * 关闭弹窗
 */
function closeDialog() {
  state.visible = false;
  userFormRef.value.resetFields();
  userFormRef.value.clearValidate();

  formData.id = 0;
}

/** 表单提交 */
const handleSubmit = useThrottleFn(() => {
  userFormRef.value.validate(async (valid: any) => {
    if (valid) {
      state.loading = true;
      console.log({ ...formData })
      const rsp = await setApiUpdate(formData);
      state.loading = false;
      if (rsp.result == 0) {
        ElMessage.success("API修改成功");
        closeDialog();
        handleApiQuery();
      }
    }
  });
}, 3000);


onMounted(() => {
  handleApiQuery();
});
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
</style>
