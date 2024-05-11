<template>
  <div class="container">
    <div class="list-header">
      <div class="list-title">文档类型列表</div>
      <div class="act-btn">
        <el-button type="primary" round v-button="'button-defalut'" @click="onOpenDrawer">新建文档类型</el-button>
      </div>
    </div>
    <el-container style="padding: 8px; background-color: #fff">
      <el-table :data="data.docTypeList" :border="true" :stripe="true" style="width: 100%" row-class-name="table">
        <el-table-column label="文档类型图标">
          <template #default="scope">
            <img :src="baseUrl + scope.row.iconUrl" width="30" />
          </template>
        </el-table-column>
        <el-table-column label="文档类型">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文档子类型">
          <template #default="scope">
            <span style="margin-left: 10px" v-for="item in scope.row.contents" :key="item.name">{{ item.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" type="primary" link @click="onEdit(scope.row)">编辑</el-button>
            <el-divider direction="vertical" />
            <el-switch
              v-model="scope.row.disabled"
              :active-value="1"
              :inactive-value="0"
              inline-prompt
              active-text="启用"
              inactive-text="禁用"
              :before-change="changeUserStatus(scope.row)"
            />
            <!-- <el-popconfirm
            width="220"
            confirm-button-text="确定"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确定删除?"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger" link>删除</el-button>
            </template>
          </el-popconfirm> -->
          </template>
        </el-table-column>
      </el-table>
    </el-container>

    <DocTypeDrawerComponent v-model="drawerVisible" :doc-type="data.rowData" @closeDarwer="onCloseDarwer" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { DocType } from '@/types/doc';
import { enableDocType, getDocTypeList } from '@/api/doc';
import DocTypeDrawerComponent from '@/components/doc-type-drawer/drawer.vue';
import { ElMessage } from 'element-plus';

const baseUrl = import.meta.env.VITE_BASE_URL;
const data = reactive<{
  docTypeList: DocType[]; //文档类型列表
  rowData: DocType | null; //当前编辑行引用
}>({
  docTypeList: [],
  rowData: null
});
const drawerVisible = ref(false);

//禁用某文档类型
const changeUserStatus = (row: DocType) => {
  return (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      enableDocType(row.id, row.disabled === 1 ? 0 : 1).then((res) => {
        if (res.status) {
          resolve(true);
          ElMessage.success(res.message);
          getList();
        } else {
          reject(new Error('Error'));
          ElMessage.error(res.message);
        }
      });
    });
  };
};

// 删除文档类型
// const handleDelete = (row: DocType) => {
//   delDoc(row.id).then((res) => {
//     ElMessage({ message: res.message, type: "success" });
//     getList();
//   });
// };

const getList = () => {
  //获取文档类型列表
  getDocTypeList().then((res) => {
    data.docTypeList = res.data;
  });
};

getList();

const onEdit = (row: DocType) => {
  data.rowData = row;
  drawerVisible.value = true;
};

//关闭drawer回调
const onCloseDarwer = (arg: boolean | DocType) => {
  typeof arg !== 'boolean' && data.docTypeList.push(arg);
};

// 打开drawer
const onOpenDrawer = () => {
  drawerVisible.value = true;
};
</script>

<style scoped>
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
</style>
