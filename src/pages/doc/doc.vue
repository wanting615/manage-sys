<template>
  <el-container>
    <el-aside width="150px">
      <el-menu :default-active="data.acitveDocIndex" :router="true" >
        <el-sub-menu v-for="item in data.docTypeList" :key="item.id" :index="item.type + ''">
          <template #title>
            <i class="el-icon-message"></i>
            {{ item.name }}
          </template>
          <el-menu-item v-for="v in item.routerUrls" :index="v.url" >{{ v.name }}</el-menu-item>
        </el-sub-menu>
      </el-menu>
      <el-button type="primary" class="add-doc-type" @click="addDocType">添加文档类型</el-button>
    </el-aside>
    <el-main>
      
      <router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
        <keep-alive >
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </el-main>
</el-container>

 <DocTypeDrawerComponent v-model="data.docTypeDrawer" @closeDarwer="closeDarwer" ></DocTypeDrawerComponent>

</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { DocType } from "@/types/doc";
import { getDocTypeList } from "@/api/doc";
import DocTypeDrawerComponent from "@/components/doc-type-drawer/drawer.vue";

const route = useRoute();
const router = useRouter();

const data = reactive<{
 docTypeDrawer: boolean; //文档类型弹窗
 docTypeList: DocType[]; //文档类型列表
 acitveDocIndex: string; //当前默认激活的文档选项卡
}>({
 docTypeDrawer: false,
 docTypeList: [],
 acitveDocIndex: '',
});


//获取文档类型列表
getDocTypeList().then((res) => {
 data.docTypeList = res.data.filter(res => res.disabled !== 0);
 data.docTypeList.forEach(item => {
   item.routerUrls = [];
   item.contentTypes.forEach(type => item.routerUrls?.push({ name: type, url: `/doc/${item.id}/${type}`}))
 })
  if (route.params.id == null && data.docTypeList[0]) {
    const _url = `/doc/${data.docTypeList[0].id}/${data.docTypeList[0].contentTypes[0]}`;
    router.push(_url)
    data.acitveDocIndex = _url;
  } else {
    data.acitveDocIndex = decodeURI(route.path);
  }
});

const addDocType = () => {
 data.docTypeDrawer = true;
}
//关闭drawer回调
const closeDarwer = (arg: boolean | DocType) => {
 typeof arg !== "boolean" && data.docTypeList.push(arg);
};

</script>
<style lang="scss" scoped>
.el-aside{
  height: calc(100vh - 56px);
  background-color: #fff;
  .el-menu{
    border:none;
  }

  .add-doc-type {
    position: absolute;
    left: 16px;
    bottom: 8px;
  }
}

main {
  height: calc(100vh - 56px);
  padding: 8px 12px;
}
</style>
