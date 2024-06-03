<!--字典类型-->

<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="关键字" prop="name">
          <el-input v-model="queryParams.keywords" placeholder="字典类型名称/编码" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery()"><i-ep-search />搜索</el-button>
          <el-button @click="resetQuery()"><i-ep-refresh />重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never" class="table-container">
      <template #header>
        <el-button v-hasPerm="['sys:dict_type:add']" type="success" @click="openDialog()"><i-ep-plus />新增</el-button>
        <el-button type="danger" :disabled="ids.length === 0" @click="handleDelete()"><i-ep-delete />删除</el-button>
      </template>
      <el-table v-loading="loading" highlight-current-row :data="dictTypeList" border
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="字典类型名称" prop="name" width="200" />
        <el-table-column label="字典类型编码" prop="code" width="200" />
        <el-table-column label="状态" align="center" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 1" type="success">启用</el-tag>
            <el-tag v-else type="info">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" align="center" />
        <el-table-column fixed="right" label="操作" align="center" width="220">
          <template #default="scope">
            <el-button type="primary" link size="small"
              @click.stop="openDictDialog(scope.row)"><i-ep-Collection />字典数据</el-button>
            <el-button v-hasPerm="['sys:dict_type:edit']" type="primary" link size="small"
              @click.stop="openDialog(scope.row.id)"><i-ep-edit />编辑</el-button>
            <el-button v-hasPerm="['sys:dict_type:delete']" type="primary" link size="small"
              @click.stop="handleDelete(scope.row.id)"><i-ep-delete />删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-if="total > 0" v-model:total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="handleQuery" />
    </el-card>

    <el-dialog v-model="dialog.visible" :title="dialog.title" @close="closeDialog">
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典编码" prop="code">
          <el-input v-model="formData.code" placeholder="请输入字典编码" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">正常</el-radio>
            <el-radio :value="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="字典类型备注"
            :autosize="{ minRows: 2, maxRows: 4 }" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!--字典数据弹窗-->
    <el-dialog v-model="dictDataDialog.visible" :title="dictDataDialog.title" @close="closeDictDialog">
      <dict-item v-model:typeCode="selectedDictType.typeCode" v-model:typeName="selectedDictType.typeName" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  getDictTypesForm,
  getDictTypesPage,
  setDictTypesAdd,
  setDictTypesDelete,
  setDictTypesUpdate,
} from "@/api/admin/api";

defineOptions({
  name: "DictType",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);
const dataFormRef = ref(ElForm);

const loading = ref(false);
const ids = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<AdminCore.V1DictTypesPageReq>({
  keywords: "",
  pageNum: 1,
  pageSize: 10,
});

const dictTypeList = ref<AdminCore.V1DictTypesItem[]>();

const dialog = reactive({
  title: "",
  visible: false,
});

const formData = reactive<AdminCore.V1DictTypesAddReq>({
  id: 0,
  name: "",
  code: "",
  status: 1,
  remark: "",
});

const rules = reactive({
  name: [{ required: true, message: "请输入字典类型名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入字典类型编码", trigger: "blur" }],
});

/** 查询 */
const handleQuery = async () => {
  loading.value = true;
  const rsp = await getDictTypesPage(queryParams);
  loading.value = false;
  if (rsp.result == 0) {
    dictTypeList.value = rsp.data.list;
    total.value = rsp.data.total;
  }
}

/**
 * 重置查询
 */
function resetQuery() {
  queryFormRef.value.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中  */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id);
}

/**
 * 打开字典类型表单弹窗
 *
 * @param dicTypeId 字典类型ID
 */
const openDialog = async (dicTypeId?: number) => {
  dialog.visible = true;
  if (dicTypeId) {
    dialog.title = "修改字典类型";
    const rsp = await getDictTypesForm({ id: dicTypeId });
    if (rsp.result == 0) {
      Object.assign(formData, rsp.data);
    }
  } else {
    dialog.title = "新增字典类型";
  }
}

/** 字典类型表单提交 */
function handleSubmit() {
  dataFormRef.value.validate(async (isValid: boolean) => {
    if (isValid) {
      loading.value = true;
      const dictTypeId = formData.id;
      if (dictTypeId) {
        const rsp = await setDictTypesUpdate(formData);
        loading.value = false;
        if (rsp.result == 0) {
          ElMessage.success("修改成功");
          closeDialog();
          handleQuery();
        }
      } else {
        const rsp = await setDictTypesAdd(formData);
        loading.value = false;
        if (rsp.result == 0) {
          ElMessage.success("新增成功");
          closeDialog();
          handleQuery();
        }
      }
    }
  });
}

/** 关闭字典类型弹窗 */
function closeDialog() {
  dialog.visible = false;
  resetForm();
}

/**  重置字典类型表单 */
function resetForm() {
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();

  formData.id = 0;
  formData.status = 1;
}

/** 删除字典类型 */
function handleDelete(dictTypeId?: number) {
  const dictTypeIds = [dictTypeId || ids.value].join(",");
  if (!dictTypeIds) {
    ElMessage.warning("请勾选删除项");
    return;
  }

  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const rsp = await setDictTypesDelete({ ids: dictTypeIds });
    if (rsp.result == 0) {
      ElMessage.success("删除成功");
      resetQuery();
    }
  });
}

const dictDataDialog = reactive({
  title: "",
  visible: false,
});

const selectedDictType = reactive({ typeCode: "", typeName: "" }); // 当前选中的字典类型

/** 打开字典数据弹窗 */
function openDictDialog(row: AdminCore.V1DictTypesItem) {
  dictDataDialog.visible = true;
  dictDataDialog.title = "【" + row.name + "】字典数据";

  selectedDictType.typeCode = row.code;
  selectedDictType.typeName = row.name;
}

/**  关闭字典数据弹窗 */
function closeDictDialog() {
  dictDataDialog.visible = false;
}

onMounted(() => {
  handleQuery();
});
</script>
