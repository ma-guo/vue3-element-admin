<!-- 字典数据 -->
<template>
  <div class="app-container">
    <div class="search-container">
      <!-- 搜索表单 -->
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="关键字" prop="name">
          <el-input v-model="queryParams.keywords" placeholder="字典名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery"><i-ep-search />搜索</el-button>
          <el-button @click="resetQuery"> <i-ep-refresh />重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card shadow="never">
      <template #header>
        <el-button v-hasPerm="['sys:dict:add']" type="success" @click="openDialog()"><i-ep-plus />新增</el-button>
        <el-button v-hasPerm="['sys:dict:delete']" type="danger" :disabled="ids.length === 0"
          @click="handleDelete()"><i-ep-delete />删除</el-button>
      </template>

      <!-- 数据表格 -->
      <el-table v-loading="loading" :data="dictList" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" />
        <el-table-column label="字典名称" prop="name" />
        <el-table-column label="字典值" prop="value" />
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="状态" align="center" width="80">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 1" type="success">启用</el-tag>
            <el-tag v-else type="info">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="140">
          <template #default="scope">
            <el-button v-hasPerm="['sys:dict:edit']" type="primary" link
              @click="openDialog(scope.row.id)"><i-ep-edit />编辑</el-button>
            <el-button v-hasPerm="['sys:dict:delete']" type="primary" link
              @click.stop="handleDelete(scope.row.id)"><i-ep-delete />删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-if="total > 0" v-model:total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="handleQuery" />
    </el-card>

    <!-- 表单弹窗 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="500px" @close="closeDialog">
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="字典名称">{{ typeName }}</el-form-item>
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典值" prop="value">
          <el-input v-model="formData.value" placeholder="字典值" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="formData.sort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" />
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
import {
  getDictForm,
  getDictPage,
  setDictAdd,
  setDictDelete,
  setDictUpdate,
} from "@/api/admin/api";

defineOptions({
  name: "DictData",
  inheritAttrs: false,
});

const props = defineProps({
  typeCode: {
    type: String,
    default: () => {
      return "";
    },
  },
  typeName: {
    type: String,
    default: () => {
      return "";
    },
  },
});

watch(
  () => props.typeCode,
  (newVal: string) => {
    queryParams.typeCode = newVal;
    formData.typeCode = newVal;
    resetQuery();
  }
);

const queryFormRef = ref(ElForm);
const dataFormRef = ref(ElForm);

const loading = ref(false);
const ids = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<AdminCore.V1DictPageReq>({
  pageNum: 1,
  pageSize: 10,
  typeCode: props.typeCode,
  keywords: "",
});

const dictList = ref<AdminCore.V1DictItem[]>();

const dialog = reactive({
  title: "",
  visible: false,
});

const formData = reactive<AdminCore.V1DictAddReq>({
  id: 0,
  name: "",
  value: "",
  status: 1,
  typeCode: props.typeCode,
  sort: 1,
  remark: "",
});

const rules = reactive({
  name: [{ required: true, message: "请输入字典名称", trigger: "blur" }],
  value: [{ required: true, message: "请输入字典值", trigger: "blur" }],
});

/**
 * 查询
 */
const handleQuery = async () => {
  if (queryParams.typeCode) {
    loading.value = true;
    const rsp = await getDictPage(queryParams);
    loading.value = false;
    if (rsp.result == 0) {
      dictList.value = rsp.data.list;
      total.value = rsp.data.total;
    }
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

/**
 * 行checkbox change事件
 *
 * @param selection
 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id);
}

/**
 * 打开字典表单弹窗
 *
 * @param dictId 字典ID
 */
const openDialog = async (dictId?: number) => {
  dialog.visible = true;
  if (dictId) {
    dialog.title = "修改字典";
    const rsp = await getDictForm({ id: dictId });
    if (rsp.result == 0) {
      Object.assign(formData, rsp.data);
    }
  } else {
    dialog.title = "新增字典";
  }
}

/**
 * 字典表单提交
 */
function handleSubmit() {
  dataFormRef.value.validate(async (isValid: boolean) => {
    if (isValid) {
      loading.value = true;
      const dictId = formData.id;
      if (dictId) {
        const rsp = await setDictUpdate(formData);
        loading.value = false;
        if (rsp.result == 0) {
          ElMessage.success("修改成功");
          closeDialog();
          resetQuery();
        }
      } else {
        const rsp = await setDictAdd(formData);
        loading.value = false;
        if (rsp.result == 0) {
          ElMessage.success("新增成功");
          closeDialog();
          resetQuery();
        }
      }
    }
  });
}

/**
 * 关闭弹窗
 */
function closeDialog() {
  dialog.visible = false;
  resetForm();
}

/**
 * 重置表单
 */
function resetForm() {
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();

  formData.id = 0;
  formData.status = 1;
  formData.sort = 1;
  formData.typeCode = props.typeCode;
}

/**
 * 删除字典
 */
function handleDelete(dictId?: number) {
  const dictIds = [dictId || ids.value].join(",");
  if (!dictIds) {
    ElMessage.warning("请勾选删除项");
    return;
  }

  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const rsp = await setDictDelete({ ids: dictIds });
    if (rsp.result != 0) {
      return;
    }
    ElMessage.success("删除成功");
    resetQuery();
  });
}

onMounted(() => {
  handleQuery();
});
</script>
