<template>
  <el-container>
    <div class="list-header">
      <div class="list-title">文档列表</div>
      <div class="act-btn">
        <el-button :icon="RefreshLeft" circle @click="reset()"/>
        <el-button type="primary" @click="showModal()">新建文档</el-button>
      </div>
    </div>
    <ListComponent @editEvent="editEvent" @handlerPageChange="handlerPageChange" 
      :docList="data.docList" :pages="data.pages"></ListComponent>
  </el-container>
  <!-- 添加文档类型 -->
  <!-- <DrawerComponent :drawer="data.drawer" @closeDarwer="closeDarwer" v-if="data.drawer"></DrawerComponent> -->
  <!-- 添加文档 -->
  <DocDrawerCompnent
    :docDrawerVisible="data.docDrawerVisible"
    @closeDrawer="closeDrawer"
    :editData="data.editData"
  ></DocDrawerCompnent>
</template>
<script setup lang="ts">
import { reactive, watch } from "vue";
import { useRoute, onBeforeRouteUpdate} from "vue-router";
import { RefreshLeft } from "@element-plus/icons";
import { getDocByType } from "@/api/doc";
import { Doc } from "@/types/doc";
import ListComponent from "../components/list-component/list.component.vue";
import DocDrawerCompnent from "../components/doc-drawer/doc-drawer.vue";

const data = reactive<{
  docDrawerVisible: boolean; //控制打开添加文档弹窗
  editData: Doc | null; //编辑数据
  docList: Doc[]; ///文档列表
  page: number, // 当前页
  pages: number;
}>({
  docDrawerVisible: false,
  editData: null,
  docList: [],
  page: 1,
  pages: 1
});

const route = useRoute();
const urlParams = {
  id: route.params.id,
  contentType: route.params.type
} 

onBeforeRouteUpdate((e) => {
  const params = e.params;
  urlParams.id = params.id;
  urlParams.contentType = params.type;
  reset();
})

//获取type类型的文档
const getDocs = () => {
  getDocByType(Number(urlParams.id), urlParams.contentType as string, data.page).then((res) => {
    if (res.status) {
      data.docList = res.data;
      data.pages = res.pages;
    }
  });
};

const reset = () => {
  data.page = 1;
  data.pages = 1;
  data.docList = [];
  getDocs();
}

if (urlParams.id != null) reset();

//展示添加文档弹窗
const showModal = () => {
  data.docDrawerVisible = true;
  data.editData = null;
};

//关闭添加\编辑文档modal
const closeDrawer = (type: string, doc: Doc) => {
  data.docDrawerVisible = false;
  if (type === "add") {
    data.docList.unshift(doc);
  } else if (type === "edit") {
    const index = data.docList.findIndex((item) => item.id === doc.id);
    data.docList.splice(index, 1, doc);
  }
};

//编辑回调
const editEvent = (doc: Doc) => {
  data.editData = doc;
  data.docDrawerVisible = true;
};

// 翻页
const handlerPageChange = (currentPage: number) => {
  data.page = currentPage;
  getDocs();
}

</script>
<style lang="scss" scoped>
@import "./list.scss";
</style>
