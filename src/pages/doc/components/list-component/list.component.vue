<template>
  <el-table :data="docList" :cell-style="{ 'max-height': '100px' }" :border="true" :max-height="data.tableHeight">
    <el-table-column type="index"  lable="序号" :fixed="true" :align="'center'"/>
    <el-table-column prop="title" label="标题" width="140"></el-table-column>
    <el-table-column prop="typeName" label="类型" width="70"></el-table-column>
    <el-table-column prop="content" label="内容" class-name="doc-table-content">
      <template #default="scope">
        <div class="doc-table-content">{{ scope.row.content}}</div>
      </template>
    </el-table-column>
    <el-table-column prop="autor" label="作者" width="80"></el-table-column>
    <el-table-column prop="creatAt" label="上传时间" width="150" :formatter="dataFormat"></el-table-column>
    <el-table-column label="操作" width="250">
      <template #default="scope">
        <el-button type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button type="primary" @click="handlePreview(scope.row)">预览</el-button>
        <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :page-count="pages" v-model:currentPage="currentPage"/>
  <el-dialog
    v-model="data.dialogVisible"
    :title="data.detailTitle"
    destroy-on-close
    class="md-dialog"
  >
    <v-md-preview :text="data.detailText"  />
  </el-dialog>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch} from 'vue';
import { ElMessage } from 'element-plus';
import { delDoc } from '@/api/doc';
import { Doc } from '@/types/doc';
import { useFormatTime } from "@/until/format"
import { useComfirm } from '@/hooks/comfirm';


const emit = defineEmits(["editEvent","handlerPageChange"])
const currentPage = ref(1);// 当前页

const props = withDefaults(defineProps<{ docList: Doc[], pages: number }>(), {
  docList: () => [],
  pages: 1
})

const data = reactive<{
  dialogVisible: Boolean;
  detailTitle: string;
  detailText: string;
  tableHeight: string;
}>({
  dialogVisible: false,
  detailTitle: '',
  detailText: '',
  tableHeight: '500px'
})

onMounted(() => {
  const _tableHeight = window.innerHeight - 56 - 56 - 58;
  data.tableHeight = _tableHeight + 'px';
})

const dataFormat = (row: Doc) => {
  return useFormatTime("YYYY-mm-dd HH:MM", row.creatAt);
}
const handleEdit = (index: number, row: Doc) => {
  emit('editEvent', row);
}
const handlePreview = (row: Doc) => {
  data.detailText = row.content;
  data.detailTitle = row.title;
  data.dialogVisible = true;
}
const handleDelete = (index: number, row: Doc) => {
  useComfirm(`确认删除<span style="color: red"> ${row.title}</span> ?`).then(() => {
    delDoc(row.id).then(res => {
      ElMessage({ message: res.message, type: 'success' })
      props.docList.splice(index, 1);
    })
  }).catch(() => {})
}

watch(currentPage, (val: number) => {
  emit('handlerPageChange',val)
})

</script>

<style lang="scss" scoped>

.el-pagination{
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