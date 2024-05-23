<template>
  <div class="container">
    <SearchContainer :header-title="'用户列表'" :show-btn-container="true" @on-fold="onFold" @on-refresh="getUserList">
      <el-form :inline="true" :model="searchModel">
        <el-form-item v-for="item in searchConfig" :label="item.label" :key="item.model">
          <template v-if="item.type === 'select'">
            <el-select
              filterable
              v-model="searchModel[item.model]"
              clearable
              placeholder="请选择"
              @change="searchChange"
            >
              <el-option
                v-for="(option, index) in data.searchOptions[item.model]"
                :key="index"
                :label="option"
                :value="option"
              />
            </el-select>
          </template>

          <template v-if="item.type === 'local-select'">
            <el-select
              filterable
              v-model="searchModel[item.model]"
              clearable
              placeholder="请选择"
              @change="searchChange"
            >
              <el-option
                v-for="(option, index) in item.options"
                :key="index"
                :label="option.label"
                :value="option.value"
              />
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
    </SearchContainer>
    <el-container ref="tableEl">
      <el-table
        :data="data.dataList"
        :border="true"
        :stripe="true"
        :max-height="height"
        :hide-on-single-page="true"
        :show-overflow-tooltip="true"
      >
        <el-table-column type="index" lable="#" width="50px" :fixed="true" :align="'center'" />
        <el-table-column prop="username" label="用户账号" :align="'center'" />
        <el-table-column prop="name" label="用户名称" :align="'center'">
          <template #default="scope">{{ scope.row.name || '-' }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号码" :align="'center'">
          <template #default="scope">{{ scope.row.phone || '-' }}</template>
        </el-table-column>
        <el-table-column prop="level" label="权限等级" :align="'center'">
          <template #default="scope">
            <el-rate v-model="scope.row.level" disabled :max="scope.row.level" />
          </template>
        </el-table-column>
        <el-table-column prop="gen_time" label="注册时间" :formatter="dataFormat" :align="'center'" />
        <el-table-column prop="status" label="状态" :align="'center'">
          <template #default="scope">{{ scope.row.status === 1 ? '启用' : '禁用' }}</template>
        </el-table-column>
        <el-table-column label="操作" :align="'center'" width="150">
          <template #default="scope">
            <el-button link type="primary" size="small">详情</el-button>
            <el-divider direction="vertical" />
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              inline-prompt
              active-text="启用"
              inactive-text="禁用"
              :before-change="changeUserStatus(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,sizes,prev, pager, next"
        :total="data.count"
        :page-count="data.count"
        :page-sizes="[10, 20, 30, 40, 50]"
        v-model:currentPage="data.page"
        v-model:page-size="data.limit"
        @change="onChangeSize"
      />
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { UserInfo, UserSearchOption, UserKey } from '@/types/user';
import { getUsers, setUserStatus, getUserSearchOptions } from '@/api/user';
import { ElMessage } from 'element-plus';
import { useFormatTime } from '@/until/format';
import { searchConfig } from './user.config';
import { useTableHeight } from '@/hooks/useTableHeight';

const data = reactive<{
  dataList: UserInfo[];
  searchOptions: UserSearchOption;
  page: number;
  count: number;
  limit: number;
}>({
  dataList: [],
  searchOptions: {
    username: [],
    name: [],
    phone: []
  },
  page: 1,
  count: 0,
  limit: 10
});
const { tableEl, height, setTableHeight } = useTableHeight();

const searchModel = reactive<{ [key in UserKey]?: any }>({});

const handelWhere = () => {
  const _where: any = {};
  Object.keys(searchModel).forEach((key) => {
    const _val = searchModel[key as UserKey];
    if (_val || _val === 0) {
      _where[key] = _val;
    }
  });
  return _where;
};

const getUserList = () => {
  getUsers(data.page, data.limit, handelWhere()).then((res) => {
    if (res.status) {
      data.count = Math.ceil(res.count / data.limit);
      data.dataList = res.data;
    } else {
      ElMessage.error(res.message);
    }
  });
};

getUserList();

getUserSearchOptions().then((res) => {
  data.searchOptions = res.data;
});

const changeUserStatus = (user: UserInfo) => {
  return (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setUserStatus(user.userId, user.status === 1 ? 0 : 1).then((res) => {
        res.status ? resolve(true) : reject(new Error('Error'));
        res.status ? ElMessage.success(res.message) : ElMessage.error(res.message);
      });
    });
  };
};

const dataFormat = (row: UserInfo) => {
  return useFormatTime('YYYY-mm-dd HH:MM', row.createAt);
};

const searchChange = () => {
  getUserList();
};

const onChangeSize = () => {
  getUserList();
};

const onFold = () => {
  setTableHeight();
  console.log(height.value);
};
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 10px;
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
