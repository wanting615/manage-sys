<template>
  <el-main>
    <el-table :data="docList" :cell-style="{ 'max-height': '100px' }" border>
      <el-table-column type="index" :index="indexMethod" lable="序号"/>
      <el-table-column prop="title" label="标题" width="140"></el-table-column>
      <el-table-column prop="typeName" label="类型" width="70"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="autor" label="作者" width="80"></el-table-column>
      <el-table-column prop="creatAt" label="上传时间" width="150" :formatter="dataFormat"></el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click="handlePreview(scope.$index, scope.row)">预览</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-count="pages" v-model:currentPage="currentPage"/>
  </el-main>
  <el-dialog
    v-model="data.dialogVisible"
    :title="data.detailTitle"
    destroy-on-close
    custom-class="md-dialog"
  >
    <md-editor v-model="data.detailText" :previewOnly="true" />
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref, watch} from 'vue';
// import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import MdEditor from "md-editor-v3";
import 'md-editor-v3/lib/style.css';
import { delDoc } from '@/api/doc';
import { Doc } from '@/types/doc';
import { useFormatTime } from "@/until/format"
import { useComfirm } from '@/hooks/comfirm';


const emit = defineEmits(["editEvent","handlerPageChange"])
const currentPage = ref(1);// 当前页

// const route = useRoute();
const props = withDefaults(defineProps<{ docList: Doc[], pages: number }>(), {
  docList: () => [],
  pages: 1
})

const data = reactive<{
  dialogVisible: Boolean;
  detailTitle: string;
  detailText: string
}>({
  dialogVisible: false,
  detailTitle: '',
  detailText: ''
})
const dataFormat = (row: Doc) => {
  return useFormatTime("YYYY-mm-dd HH:MM", row.creatAt);
}
const handleEdit = (index: number, row: Doc) => {
  emit('editEvent', row);
}
const handlePreview = (index: number, row: Doc) => {
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
  })
}

watch(currentPage, (val: number) => {
  emit('handlerPageChange',val)
})

const indexMethod = (index: number) => {
  return ((currentPage.value -1 ) * 10) + index + 1
}
</script>

<style lang="scss" scoped>
.el-main{
  background: #fff;
}
.el-pagination{
  margin-top: 20px;
  text-align: center;
}
</style>