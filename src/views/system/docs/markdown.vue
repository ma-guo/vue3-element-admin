<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryRef" :model="queryParams" :inline="true">
        <el-form-item prop="keyword" label="关键字">
          <el-input v-model="queryParams.name" placeholder="文章标题" clearable @keyup.enter="fetchDocs" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="fetchDocs()"><i-ep-search />搜索</el-button>
          <el-button type="success" @click="addNewDoc()"><i-ep-plus />添加文章</el-button>
          <el-button @click="resetQueryForm()"><i-ep-refresh />重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row :gutter="10">
      <el-col :lg="5" :xs="24">
        <el-table v-loading="state.loading" :data="docs" highlight-current-row border
          @current-change="handleCurrentChange">
          <el-table-column label="文章标题" prop="name" align="start" />
        </el-table>

        <pagination v-if="state.total > 0" v-model:total="state.total" v-model:page="queryParams.page"
          v-model:limit="queryParams.size" @pagination="fetchDocs()" layout="total, prev, next" />
      </el-col>
      <el-col :lg="19" :xs="24">
        <el-card shadow="never" class="markdown">
          <template #header>
            <div class="flex doc-header">
              <el-input class="input" v-model="form.name" placeholder="文字名称" clearable />
              <el-button type="primary" :disabled="form.name == ''"
                @click="submitDocData()"><i-ep-upload />保存</el-button>
              <el-button type="info" @click="copyDocUrl()">复制地址</el-button>
              <el-button @click="showDrafts()" v-if="drafts.length > 0">草稿</el-button>
            </div>
          </template>
          <mavon-editor class="editor" ref="mavonEditorRef" v-model="state.markdown" :ishljs="true" @imgAdd="imageAdd"
            @change="onEditorChange" />
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="文章草稿" v-model="state.draftVisible" width="50%" @close="handleDraftClose()">
      <el-table v-loading="state.loading" :data="drafts" highlight-current-row border>
        <el-table-column label="文章标题" prop="name" align="start" />
        <el-table-column label="保存时间" prop="create_at" align="center" width="160" />
        <el-table-column label="操作" align="center" width="80">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleDraftChange(row)">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>
      <pagination v-if="state.draftTotal > 0" v-model:total="state.draftTotal" v-model:page="state.draftPage"
        v-model:limit="state.draftSize" @pagination="fetchDrafts(form.id)" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getDocumentDraftPage, getDocumentPage, setDocumentAdd, setDocumentUpdate } from "@/api/admin/api";
import { uploadFileApi } from "@/api/file";


defineOptions({
  name: "Markdown",
  inheritAttrs: false,
});

const queryRef = ref(ElForm);


const state = reactive({
  loading: false,
  total: 0,
  visible: false,
  markdown: '',
  haschange: false,
  draftVisible: false,
  draftTotal: 0,
  draftPage: 1,
  draftSize: 10,
})

const queryParams = reactive<AdminCore.DocumentPageReq>({
  page: 1,
  size: 10,
  name: "",
});

const mavonEditorRef = ref()

const docs = ref<AdminCore.DocumentItem[]>([]);
const drafts = ref<AdminCore.DocumentItem[]>([]);

const form = reactive<AdminCore.DocumentItem>({
  id: 0,
  name: "",
  markdown: '',
  html: '',
  version: 0,
  create_at: "",
  update_at: '',
  url: '',
});


const addNewDoc = () => {
  resetForm()
  state.markdown = '';
  state.haschange = false;
  drafts.value = []
}
const copyDocUrl = () => {
  if (form.url) {
    navigator.clipboard.writeText(form.url).then(() => {
      ElMessage.success("复制成功");
    });
  }
}
const imageAdd = async (pos: number, file: File) => {
  const rsp = await uploadFileApi(file)
  if (rsp.result == 0) {
    const edit = mavonEditorRef.value as any
    edit.$img2Url(pos, rsp.data.url)
  }
}
const onEditorChange = (mdtext: string, html: string) => {
  console.log({ mdtext, html })
  if (mdtext != form.markdown) {
    state.haschange = true
  }
  form.markdown = mdtext
  form.html = html

}
const fetchDocs = async () => {
  state.loading = true
  const rsp = await getDocumentPage(queryParams);
  state.loading = false
  if (rsp.result == 0) {
    docs.value = rsp.data.items;
    state.total = rsp.data.total
  }
}

const fetchDrafts = async (doc_id: number) => {
  state.loading = true
  const rsp = await getDocumentDraftPage({ doc_id, page: state.draftPage, size: state.draftSize });
  state.loading = false
  if (rsp.result == 0) {
    drafts.value = rsp.data.items
    state.draftTotal = rsp.data.total
  } else {
    drafts.value = []
    state.draftTotal = 0
  }
}

const handleCurrentChange = (row: AdminCore.DocumentItem) => {
  if (!row) {
    return
  }
  const change = () => {
    form.markdown = row.markdown
    form.html = row.html
    form.id = row.id
    form.version = row.version
    form.name = row.name
    form.url = row.url
    state.markdown = row.markdown
    state.haschange = false
    fetchDrafts(row.id)
  }
  if (state.haschange) {
    ElMessageBox.confirm('文章内容已发生修改, 需要切换文章吗',)
      .then(() => {
        change()
      })
      .catch(() => {
        // catch error
      })
  } else {
    change()
  }
}

const handleDraftChange = (row: AdminCore.DocumentItem) => {
  if (!row) {
    return
  }
  const change = () => {
    // 只更新 markdown 和版本号
    form.markdown = row.markdown
    form.version = row.version
    state.markdown = row.markdown
    state.haschange = false
    state.draftVisible = false
  }
  if (state.haschange) {
    ElMessageBox.confirm('文章内容已发生修改, 需要切换文章吗',)
      .then(() => {
        change()
      })
      .catch(() => {
        // catch error
      })
  } else {
    change()
  }
}

/** 重置查询 */
function resetQueryForm() {
  queryRef.value.resetFields();
  queryParams.page = 1;
  queryParams.name = "";
  queryParams.size = 10;
  fetchDocs();
}



/** 保存文章 */
const submitDocData = async () => {
  if (!form.name) {
    ElMessage.error("名称不能为空");
    return
  }
  if (!state.haschange) {
    console.log('doc no change')
    return
  }

  state.loading = true;
  if (form.id > 0) {
    const rsp = await setDocumentUpdate(form);
    state.loading = false
    if (rsp.result == 0) {
      ElMessage.success("文章已修改");
      state.haschange = false
      fetchDocs();
      fetchDrafts(form.id)
    }
  } else {
    const rsp = await setDocumentAdd(form);
    state.loading = false;
    if (rsp.result == 0) {
      form.id = rsp.data.id
      state.haschange = false
      ElMessage.success("文章已添加");
      fetchDocs();
      fetchDrafts(form.id)
    }
  }
}

const resetForm = () => {
  form.id = 0
  form.name = ''
  form.markdown = ''
  form.html = ''
  form.version = 0
  form.create_at = ''
  form.update_at = ''
}

const showDrafts = () => {
  state.draftVisible = true
}

const handleDraftClose = () => {
  state.draftVisible = false
}

onMounted(() => {
  fetchDocs();
});
</script>

<style lang="scss" scoped>
.doc-header {
  display: flex;
  align-items: center;

  .input {
    margin-right: 10px;
    max-width: 600px;
  }
}

.editor {
  min-height: calc(min(60vh, 600px));
}
</style>
