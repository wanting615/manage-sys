<template>
  <div class="container">
    <el-container>
      <el-table :data="data.dataList" :cell-style="{ 'max-height': '200px' }" :border="true" :stripe="true" :max-height="data.tableHeight">
        <el-table-column type="index" lable="#" width="40px" :fixed="true" :align="'center'"/>
        <el-table-column prop="level" label="类型" width="100px" :align="'center'"></el-table-column>
        <el-table-column prop="message" label="内容" :align="'center'">
          <template #default="scope"><text-trunvated :data="scope.row.message" :showRow="2"></text-trunvated></template>
        </el-table-column>
        <el-table-column prop="createAt" label="日志时间" width="180px"  :formatter="dataFormat" :align="'center'"></el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :page-count="data.count" v-model:currentPage="data.page"/> 
    </el-container>
  </div>

</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useFormatTime } from "@/until/format";
import { LogItem } from '@/types/log';
import { getLogs } from "@/api/log"

const data = reactive<{
  dataList: LogItem[];
  page: number;
  count: number;
  limit: number;
  tableHeight: string;
}>({
  dataList: [],
  page: 1,
  count: 0,
  limit: 10,
  tableHeight: "400px"
})

onMounted(() => {
  const _tableHeight = window.innerHeight - 56 - 58;
  data.tableHeight = _tableHeight + 'px';
})

const getUserList = () => {
  getLogs(data.page, data.limit).then(res => {
    if (res.status) {
      data.count = res.count;
      data.dataList = res.data;
    } else {
      ElMessage.error(res.message);
    }
  })
}

getUserList();


const dataFormat = (row: LogItem) => {
  return useFormatTime("YYYY-mm-dd HH:MM", row.createAt);
}


</script>

<style scoped lang="scss">


.el-container {
    display: block;
    padding: 8px 12px;
    background-color: #fff;
}
.el-pagination {
    margin-top: 8px;
    text-align: center;
    justify-content: flex-end;
}
.el-switch {
  margin-right: 8px;
}
</style>