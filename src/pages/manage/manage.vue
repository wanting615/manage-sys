<template>
  <div class="manage">
    <el-table :data="data.docTypeList" style="width: 100%" row-class-name="table">
      <el-table-column label="文档类型图标">
        <template #default="scope">
          <img :src="baseUrl + scope.row.iconUrl" width="30">
        </template>
      </el-table-column>
      <el-table-column label="文档类型">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文档子类型">
        <template #default="scope">
          <span style="margin-left: 10px" v-for="item in scope.row.contentTypes">{{item}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" class="edit" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <modalComponnet :dialogVisible="data.dialogVisible" :rowData="data.rowData" @closeModal="closeModal"></modalComponnet>
</template>

<script lang="ts" setup>
import { DocType, Doc } from "@/types/doc";
import { getDocTypeList, updateDocType } from '@/api/doc'
import { reactive } from "vue";
import modalComponnet from './components/model.vue'
import { ElMessage } from "element-plus";

const baseUrl = import.meta.env.VITE_BASE_URL;
const data = reactive<{
  docTypeList: DocType[]; //文档类型列表
  rowData: DocType | null,//当前编辑行引用
  rowIndex:number,//当前编辑行索引
  dialogVisible: boolean,
}>({
  docTypeList: [],
  rowData: null,
  rowIndex: 0,
  dialogVisible: false
})

const handleEdit = (index: number, row: DocType) => {
  data.dialogVisible = true
  data.rowData = row;
  data.rowIndex = index;
}
// 删除文档类型
const handleDelete = (index: number, row: DocType) => {
  data.docTypeList.splice(index,1)
}


//获取文档类型列表
getDocTypeList().then((res) => {
  data.docTypeList = res.data;
});

const closeModal = (docType: DocType | null)=>{
  if(docType){ 
    updateDocType(docType.id,docType.name,docType.contentTypes.join(","),docType.iconUrl).then(res => {
      if(res.status){
        data.docTypeList[data.rowIndex] = JSON.parse(JSON.stringify(docType));
        data.dialogVisible = false;
      }else{
        ElMessage({ message: res.message, type: 'error' })
      }
    })
  }else{
    data.dialogVisible = false;
  }
}

</script>

<style>
.el-table .table tr:first-child{
  background-color:red;
}
</style>