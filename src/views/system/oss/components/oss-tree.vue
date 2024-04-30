<!-- OSS 树 -->
<template>
  <el-card shadow="never">
    <el-tree
      ref="deptTreeRef"
      class="mt-2"
      :data="osstList"
      :props="{ children: 'children', label: 'label', disabled: '' }"
      :expand-on-click-node="false"
      default-expand-all
      @node-click="handleNodeClick"
    />
  </el-card>
</template>

<script setup lang="ts">
import { getVendorList } from "@/api/admin/api";

const props = defineProps({
  modelValue: {
    type: [String],
    default: "",
  },
});

const osstList = ref<AdminCore.StringOptions[]>(); // 部门列表
const ossTreeRef = ref(ElTree); // 部门树
const deptName = ref(); // 部门名称

const emits = defineEmits(["node-click"]);

const ossValue = useVModel(props, "modelValue", emits);

watchEffect(
  () => {
    ossTreeRef.value; //.filter(deptName.value);
  },
  {
    flush: "post", // watchEffect会在DOM挂载或者更新之前就会触发，此属性控制在DOM元素更新后运行
  }
);

/** OSS树节点 Click */
function handleNodeClick(data: { [key: string]: any }) {
  ossValue.value = data.value;
  emits("node-click");
}

onBeforeMount(() => {
  getVendorList({}).then((rsp) => {
    osstList.value = rsp.data.items;
  });
});
</script>
