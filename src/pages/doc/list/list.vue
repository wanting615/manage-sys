<template>
  <div>
    <div class="list-header">
      <div class="list-title">{{ data.docTypeName }}文档列表</div>
      <div class="act-btn">
        <el-button :icon="RefreshLeft" circle @click="reset()" />
        <el-button type="primary" @click="onAddDoc()">新建文档</el-button>
      </div>
    </div>
    <ListComponent @handlerPageChange="handlerPageChange" :docList="data.docList" :pages="data.pages" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'list'
};
</script>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { RefreshLeft } from '@element-plus/icons';
import { getDocByType } from '@/api/doc';
import { Doc } from '@/types/doc';
import ListComponent from '../components/list-component/list.component.vue';
import { onActivated } from 'vue';
const router = useRouter();

const data = reactive<{
  docList: Doc[]; ///文档列表
  page: number; // 当前页
  pages: number;
  docTypeName: string;
}>({
  docList: [],
  page: 1,
  pages: 1,
  docTypeName: ''
});

onActivated(() => {
  console.log('onActivated');
});

const route = useRoute();
const urlParams = {
  id: route.params.id,
  contentType: route.params.type
};

onBeforeRouteUpdate((e) => {
  const params = e.params;
  urlParams.id = params.id;
  urlParams.contentType = params.type;
  reset();
});

//获取type类型的文档
const getDocs = () => {
  getDocByType(Number(urlParams.id), urlParams.contentType as string, data.page).then((res) => {
    if (res.status) {
      data.docList = res.data;
      data.pages = res.pages;
      data.docTypeName = res.name;
    }
  });
};

const reset = () => {
  data.page = 1;
  data.pages = 1;
  data.docList = [];
  getDocs();
};

if (urlParams.id != null) reset();

const onAddDoc = () => {
  router.push('/doc/detail/new');
};

// 翻页
const handlerPageChange = (currentPage: number) => {
  data.page = currentPage;
  getDocs();
};
</script>
<style lang="scss" scoped>
@import './list.scss';
</style>
