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
      <el-table ref="dataTableRef" v-loading="loading" :data="fileItems" highlight-current-row border
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
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

      <pagination v-if="total > 0" v-model:total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="handleQuery" />
    </el-card>

    <!-- 文件表单弹窗 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="500px" @close="closeDialog">
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

const loading = ref(false);
const ids = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<AdminCore.V1FilePageReq>({
  pageNum: 1,
  pageSize: 10,
  vendor: "",
  name: "",
});

const fileItems = ref<AdminCore.V1FileItem[]>();

const dialog = reactive({
  title: "",
  visible: false,
});

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
function handleQuery() {
  loading.value = true;
  getFilesPage(queryParams)
    .then(({ data }) => {
      fileItems.value = data.items;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}
/** 重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行checkbox 选中事件 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id);
}

/** 打开角色表单弹窗 */
function openDialog(roleId: number) {
  dialog.visible = true;
  dialog.title = "修改文件名";
  getFilesForm({ id: roleId }).then(({ data }) => {
    Object.assign(formData, data);
  });
}

/** 角色保存提交 */
function handleSubmit() {
  fileFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const roleId = formData.id;
      if (roleId) {
        setFilesUpdate(formData)
          .then(() => {
            ElMessage.success("修改成功");
            closeDialog();
            resetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        loading.value = false;
      }
    }
  });
}

/** 关闭表单弹窗 */
function closeDialog() {
  dialog.visible = false;
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
  }).then(() => {
    loading.value = true;
    setFilesDelete({ filePath })
      .then(() => {
        ElMessage.success("删除成功");
        resetQuery();
      })
      .finally(() => (loading.value = false));
  });
}

onMounted(() => {
  handleQuery();
});
</script>
