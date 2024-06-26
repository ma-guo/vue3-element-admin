<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="queryParams.keyword" placeholder="部门名称" @keyup.enter="handleQuery" />
        </el-form-item>

        <el-form-item label="部门状态" prop="status">
          <el-select v-model="queryParams.status" placeholder="全部" clearable class="!w-[100px]">
            <el-option :value="1" label="正常" />
            <el-option :value="0" label="禁用" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="filter-item" type="primary" @click="handleQuery">
            <i-ep-search />
            搜索
          </el-button>
          <el-button @click="resetQuery"> <i-ep-refresh />重置 </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never" class="table-container">
      <template #header>
        <el-button v-hasPerm="['sys:dept:add']" type="success"
          @click="openDialog(0, undefined)"><i-ep-plus />新增</el-button>
        <el-button v-hasPerm="['sys:dept:delete']" type="danger" :disabled="ids.length === 0"
          @click="handleDelete()"><i-ep-delete />删除
        </el-button>
      </template>

      <el-table v-loading="loading" :data="deptList" row-key="id" default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="name" label="部门名称" min-width="200" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
            <el-tag v-else type="info">禁用</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="sort" label="排序" width="100" />

        <el-table-column label="操作" fixed="right" align="left" width="200">
          <template #default="scope">
            <el-button v-hasPerm="['sys:dept:add']" type="primary" link size="small"
              @click.stop="openDialog(scope.row.id, undefined)"><i-ep-plus />新增
            </el-button>
            <el-button v-hasPerm="['sys:dept:edit']" type="primary" link size="small"
              @click.stop="openDialog(scope.row.parentId, scope.row.id)"><i-ep-edit />编辑
            </el-button>
            <el-button v-hasPerm="['sys:dept:delete']" type="primary" link size="small"
              @click.stop="handleDelete(scope.row.id)">
              <i-ep-delete />删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialog.visible" :title="dialog.title" @closed="closeDialog">
      <el-form ref="deptFormRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="上级部门" prop="parentId">
          <el-tree-select v-model="formData.parentId" placeholder="选择上级部门" :data="deptOptions" filterable check-strictly
            :render-after-expand="false" />
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="显示排序" prop="sort">
          <el-input-number v-model="formData.sort" controls-position="right" style="width: 100px" :min="0" />
        </el-form-item>
        <el-form-item label="部门状态">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">正常</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit"> 确 定 </el-button>
          <el-button @click="closeDialog"> 取 消 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { setDeptUpdate } from "@/api/admin/api";
import { setDeptDelete } from "@/api/admin/api";
import {
  getDeptList,
  getDeptOptions,
  getDeptForm,
  setDeptAdd,
} from "@/api/admin/api";

defineOptions({
  name: "Dept",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);
const deptFormRef = ref(ElForm);

const loading = ref(false);
const ids = ref<number[]>([]);
const dialog = reactive({
  title: "",
  visible: false,
});

const queryParams = reactive<AdminCore.V1DeptListReq>({
  keyword: "",
  status: 1,
});
const deptList = ref<AdminCore.V1DeptItem[]>();

const deptOptions = ref<AdminCore.LongOptions[]>();

const formData = reactive<AdminCore.V1DeptAddReq>({
  id: 0,
  status: 1,
  parentId: 0,
  sort: 1,
  name: "",
});

const rules = reactive({
  parentId: [{ required: true, message: "上级部门不能为空", trigger: "blur" }],
  name: [{ required: true, message: "部门名称不能为空", trigger: "blur" }],
  sort: [{ required: true, message: "显示排序不能为空", trigger: "blur" }],
});

/** 查询 */
const handleQuery = async () => {
  loading.value = true;
  const rsp = await getDeptList(queryParams);
  loading.value = false;
  if (rsp.result == 0) {
    deptList.value = rsp.data.items;
  }
}

/**重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id);
}

/** 获取部门下拉数据  */
const loadDeptOptions = async () => {
  const rsp = await getDeptOptions({});
  if (rsp.result == 0) {
    deptOptions.value = [{
      value: 0,
      label: "顶级部门",
      children: rsp.data.items,
    }];
  }
}

/**
 * 打开弹窗
 *
 * @param parentId 父部门ID
 * @param deptId 部门ID
 */
const openDialog = async (parentId?: number, deptId?: number) => {
  await loadDeptOptions();
  dialog.visible = true;
  if (deptId) {
    dialog.title = "修改部门";
    const rsp = await getDeptForm({ id: deptId });
    loading.value = false;
    if (rsp.result == 0) {
      Object.assign(formData, rsp.data);
    }
  } else {
    dialog.title = "新增部门";
    formData.parentId = parentId ?? 0;
  }
}

/** 表单提交 */
function handleSubmit() {
  deptFormRef.value.validate(async (valid: any) => {
    if (valid) {
      const deptId = formData.id;
      loading.value = true;
      if (deptId) {
        const rsp = await setDeptUpdate(formData);
        loading.value = false
        if (rsp.result != 0) {
          return;
        }
        ElMessage.success("修改成功");
        closeDialog();
        handleQuery();

      } else {
        const rsp = await setDeptAdd(formData);
        loading.value = false;
        if (rsp.result != 0) {
          return;
        }
        ElMessage.success("新增成功");
        closeDialog();
        handleQuery();
      }
    }
  });
}

/** 删除部门 */
function handleDelete(deptId?: number) {
  const deptIds = [deptId || ids.value].join(",");

  if (!deptIds) {
    ElMessage.warning("请勾选删除项");
    return;
  }

  ElMessageBox.confirm(`确认删除已选中的数据项?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    setDeptDelete({ ids: deptIds }).then(() => {
      ElMessage.success("删除成功");
      resetQuery();
    });
  });
}

/** 关闭弹窗 */
function closeDialog() {
  dialog.visible = false;
  resetForm();
}

/** 重置表单  */
function resetForm() {
  deptFormRef.value.resetFields();
  deptFormRef.value.clearValidate();

  formData.id = 0;
  formData.parentId = 0;
  formData.status = 1;
  formData.sort = 1;
}

onMounted(() => {
  handleQuery();
});
</script>
