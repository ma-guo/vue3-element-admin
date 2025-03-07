<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item prop="name" label="文件名">
          <el-input v-model="queryParams.name" placeholder="文件名搜索" clearable @keyup.enter="handleQuery" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleQuery"><i-ep-search />搜索</el-button>
          <el-button @click="resetQuery"><i-ep-refresh />重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never" class="table-container">
      <el-table ref="dataTableRef" v-loading="state.loading" :data="fileItems" highlight-current-row border>
        <el-table-column label="ID" prop="id" width="60" align="center" />
        <el-table-column label="文件名" prop="name" min-width="100" />
        <el-table-column label="文件路径" prop="url" />
        <el-table-column label="存储方式" prop="vendorName" width="120" align="center" />
        <!-- <el-table-column label="状态" align="center" width="100">
          <template #default="scope">
            <el-tag v-if="!scope.row.deleted" type="success">正常</el-tag>
            <el-tag v-else type="info">已删除</el-tag>
          </template>
</el-table-column> -->
        <el-table-column label="上传时间" prop="createTime" width="160" align="center" />

        <el-table-column fixed="right" label="操作" width="140" align="center">
          <template #default="scope">
            <el-button type="primary" size="small" link @click="openDialog(scope.row.id)">
              <i-ep-edit />编辑
            </el-button>
            <el-button type="primary" size="small" link @click="handleDelete(scope.row.url)">
              <i-ep-delete />删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-if="state.total > 0" v-model:total="state.total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="handleQuery" />
    </el-card>

    <!-- 文件表单弹窗 -->
    <el-dialog v-model="state.visible" :title="state.title" @close="closeDialog">
      <el-form ref="fileFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="文件ID" prop="id">
          <el-input v-model="formData.id" disabled placeholder="请输入新的文件名" />
        </el-form-item>
        <el-form-item label="文件名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入新的文件名" />
        </el-form-item>
      </el-form>

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
import { setFilesUpdate } from "@/api/admin/api";
import { setFilesDelete } from "@/api/admin/api";
import { getFilesForm } from "@/api/admin/api";
import { getFilesPage } from "@/api/admin/api";

defineOptions({
  name: "Files",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);
const fileFormRef = ref(ElForm);

const state = reactive({
  total: 0,
  loading: false,
  title: '',
  visible: false,
});

const queryParams = reactive<AdminCore.V1FilePageReq>({
  pageNum: 1,
  pageSize: 10,
  vendor: "",
  name: "",
});

const fileItems = ref<AdminCore.V1FileItem[]>();


const formData = reactive<AdminCore.V1RolesAddReq>({
  id: 0,
  name: "",
  code: "",
  status: 1,
  sort: 1,
  dataScope: 0,
});

const rules = reactive({
  name: [{ required: true, message: "请输入文件名", trigger: "blur" }],
});

/** 查询 */
const handleQuery = async () => {
  state.loading = true;
  const rsp = await getFilesPage(queryParams);
  state.loading = false;
  if (rsp.result == 0) {
    fileItems.value = rsp.data.items;
    state.total = rsp.data.total;
  }
}
/** 重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}


/** 打开角色表单弹窗 */
const openDialog = async (roleId: number) => {
  state.visible = true;
  state.title = "修改文件名";
  const rsp = await getFilesForm({ id: roleId });
  if (rsp.result == 0) {
    Object.assign(formData, rsp.data);
  }
}

/** 角色保存提交 */
function handleSubmit() {
  fileFormRef.value.validate(async (valid: any) => {
    if (valid) {
      state.loading = true;
      const roleId = formData.id;
      if (roleId) {
        const rsp = await setFilesUpdate(formData);
        state.loading = false;
        if (rsp.result == 0) {
          ElMessage.success("修改成功");
          closeDialog();
          resetQuery();
        }
      } else {
        state.loading = false;
      }
    }
  });
}

/** 关闭表单弹窗 */
function closeDialog() {
  state.visible = false;
  resetForm();
}

/** 重置表单 */
function resetForm() {
  fileFormRef.value.resetFields();
  fileFormRef.value.clearValidate();

  formData.id = 0;
  formData.sort = 1;
  formData.status = 1;
}

/** 删除文件 */
function handleDelete(filePath: string) {
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    state.loading = true;
    const rsp = await setFilesDelete({ filePath });
    state.loading = false;
    if (rsp.result == 0) {
      ElMessage.success("删除成功");
      resetQuery();
    }
  });
}

onMounted(() => {
  handleQuery();
});
</script>
