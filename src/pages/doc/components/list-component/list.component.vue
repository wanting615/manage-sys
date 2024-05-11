<template>
  <el-table :data="docList" :cell-style="{ 'max-height': '100px' }" :border="true" :max-height="data.tableHeight">
    <el-table-column type="index" lable="序号" :fixed="true" :align="'center'" />
    <el-table-column prop="title" label="标题" width="140" />
    <el-table-column prop="typeName" label="类型" width="70" />
    <el-table-column prop="content" label="内容" class-name="doc-table-content">
      <template #default="scope">
        <div class="doc-table-content">{{ scope.row.content }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="autor" label="作者" width="80" />
    <el-table-column prop="creatAt" label="上传时间" width="150" :formatter="dataFormat" />
    <el-table-column label="操作" width="120">
      <template #default="scope">
        <el-button type="primary" link @click="handleDetail(scope.row)">详情</el-button>
        <el-divider direction="vertical" />
        <el-button type="danger" link @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :page-count="pages" v-model:currentPage="currentPage" />
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { delDoc } from '@/api/doc';
import { Doc } from '@/types/doc';
import { useFormatTime } from '@/until/format';
import { useComfirm } from '@/hooks/comfirm';

const emit = defineEmits(['handlerPageChange']);
const currentPage = ref(1); // 当前页

const props = withDefaults(defineProps<{ docList: Doc[]; pages: number }>(), {
  docList: () => [],
  pages: 1
});

const data = reactive<{
  tableHeight: string;
}>({
  tableHeight: '500px'
});

onMounted(() => {
  const _tableHeight = window.innerHeight - 56 - 56 - 58;
  data.tableHeight = _tableHeight + 'px';
});

const dataFormat = (row: Doc) => {
  return useFormatTime('YYYY-mm-dd HH:MM', row.creatAt);
};

const router = useRouter();
const handleDetail = (row: Doc) => {
  router.push(`/doc/detail/${row.id}`);
};

const handleDelete = (index: number, row: Doc) => {
  useComfirm(`确认删除<span style="color: red"> ${row.title}</span> ?`)
    .then(() => {
      delDoc(row.id).then((res) => {
        ElMessage({ message: res.message, type: 'success' });
        // eslint-disable-next-line vue/no-mutating-props
        props.docList.splice(index, 1);
      });
    })
    .catch(() => {});
};

watch(currentPage, (val: number) => {
  emit('handlerPageChange', val);
});
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 8px;
  text-align: center;
  justify-content: flex-end;
}
.doc-table-content {
  height: 84px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
