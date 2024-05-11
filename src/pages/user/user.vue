<template>
  <div class="container">
    <el-container class="search-container">
      <el-form :inline="true" :model="searchModel">
        <el-form-item v-for="item in searchConfig" :label="item.label">
          <template v-if="item.type === 'select'">
            <el-select filterable  v-model="searchModel[item.model]" clearable placeholder="请选择" @change="searchChange">
              <el-option v-for="(option,index) in data.searchOptions[item.model]" :key="index" :label="option" :value="option"></el-option>
            </el-select>
          </template>

          <template v-if="item.type === 'local-select'">
            <el-select filterable  v-model="searchModel[item.model]" clearable placeholder="请选择" @change="searchChange">
              <el-option v-for="(option,index) in item.options" :key="index" :label="option.label" :value="option.value"></el-option>
            </el-select>
          </template>

          <template v-if="item.type === 'date-line'">
            <el-date-picker
              v-model="searchModel[item.model]"
              @change="searchChange"
              type="daterange"
              unlink-panels
              range-separator="-"
              start-placeholder="请选择"
              end-placeholder="请选择"
              size="default"
            />
          </template>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container>
      <el-table :data="data.dataList" :cell-style="{ 'max-height': '100px' }" :border="true" :stripe="true" :max-height="data.tableHeight">
        <el-table-column type="index" lable="#" width="40px" :fixed="true" :align="'center'"/>
        <el-table-column prop="username" label="用户账号" :align="'center'"></el-table-column>
        <el-table-column prop="name" label="用户名称" :align="'center'">
          <template #default="scope">{{ scope.row.name || '-' }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号码" :align="'center'">
          <template #default="scope">{{ scope.row.phone || '-' }}</template>
        </el-table-column>
        <el-table-column prop="level" label="权限等级" :align="'center'">
          <template #default="scope">
            <el-rate v-model="scope.row.level" disabled :max="scope.row.level"/>
          </template>
        </el-table-column>
        <el-table-column prop="gen_time" label="注册时间"  :formatter="dataFormat" :align="'center'"></el-table-column>
        <el-table-column prop="status" label="状态" :align="'center'">
          <template #default="scope">{{ scope.row.status === 1 ? '启用' : '禁用' }}</template>
        </el-table-column>
        <el-table-column label="操作" :align="'center'" width="150">
          <template #default="scope">
            <el-button link type="primary" size="small">详情</el-button>
            <el-divider direction="vertical" />
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" inline-prompt active-text="启用" inactive-text="禁用" :before-change="changeUserStatus(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :page-count="data.count" v-model:currentPage="data.page"/>
    </el-container>
  </div>

</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { UserInfo, UserSearchOption, UserKey } from "@/types/user";
import { getUsers, setUserStatus, getUserSearchOptions} from "@/api/user";
import { ElMessage } from 'element-plus';
import { useFormatTime } from "@/until/format";
import { searchConfig } from "./user.config";

const data = reactive<{
  dataList: UserInfo[],
  searchOptions: UserSearchOption,
  page: number;
  count: number;
  limit: number;
  tableHeight: string;
}>({
  dataList: [],
  searchOptions: {
    username: [],
    name: [],
    phone: []
  },
  page: 1,
  count: 0,
  limit: 10,
  tableHeight: "400px"
})

const searchModel = reactive<{[key in UserKey]?: number | string | string[]}>({}); 

onMounted(() => {
  const _tableHeight = window.innerHeight - 56 - 56 - 58;
  data.tableHeight = _tableHeight + 'px';
})

const handelWhere = () => {
  const _where: any = {
  };
  Object.keys(searchModel).forEach((key) => {
    const _val = searchModel[key as UserKey];
    if (_val || _val === 0) {
      _where[key] = _val;
    }
  })
  return _where;
}

const getUserList = () => {
  getUsers(data.page, data.limit, handelWhere()).then(res => {
    if (res.status) {
      data.count = res.count;
      data.dataList = res.data;
    } else {
      ElMessage.error(res.message);
    }
  })
}

getUserList();

getUserSearchOptions().then(res => {
  data.searchOptions = res.data;
})

const changeUserStatus = (user: UserInfo) => {
  return () => {
    return new Promise((resolve, reject) => {
    setUserStatus(user.userId, user.status === 1 ? 0 : 1).then(res => {
      res.status ? resolve(true) : reject(new Error('Error'))
      res.status ? ElMessage.success(res.message) : ElMessage.error(res.message);
    })
  })
 }
}

const dataFormat = (row: UserInfo) => {
  return useFormatTime("YYYY-mm-dd HH:MM", row.createAt);
}

const searchChange = () => {
  console.log(searchModel);
  getUserList();
}



</script>

<style scoped lang="scss">

.search-container.el-container {
  padding-top: 16px;
  .el-form-item {
    margin-bottom: 10px;
  }
}

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

.el-select {
  min-width: 130px;
}
</style>