<template>
  <el-container style="min-height: 100vh" class="list">
    <!-- 左侧菜单 -->
    <el-aside width="180px">
      <el-menu
        :default-openeds="[0]"
        :default-active="data.acitveIndex"
        background-color="#324057"
        text-color="#bfcbd9"
        :router="true"
      >
        <el-sub-menu
          v-for="(item, num) in data.docTypeList"
          :key="item.id"
          :index="item.type + ''"
        >
          <template #title>
            <i class="el-icon-message"></i>
            {{ item.name }}
          </template>
          <el-menu-item
            v-for="(v, i) in item.contentTypes"
            :index="v + '-' + item.type"
            >{{ v }}</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧内容 -->
    <el-container>
      <!-- 右侧头部 -->
      <el-header>
        <div class="add-btn" v-if="isLogin">
          <el-button type="primary" icon="el-icon-plus" @click="showDocType">添加文档类型</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showDialog">添加文档</el-button>
        </div>
        <div class="manage">
          <el-button type="primary" @click="manage" v-if="isLogin">管理</el-button>
          <el-button type="primary" @click="login" v-if="!isLogin">登录</el-button>
          <el-dropdown class="dropdown" v-if="isLogin">
            <el-avatar :size="25" src="/src/assets/images/avatar.jpeg"></el-avatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        
      </el-header>
      <!-- 右侧内容 -->
      <!-- <router-view /> -->
      <RightComponnet @editEvent="editEvent" @handlerPageChange="handlerPageChange" 
      :docList="data.docList" :pages="data.pages"></RightComponnet>
    </el-container>
  </el-container>
  <!-- 添加文档类型 -->
  <DrawerComponent :drawer="data.drawer" @closeDarwer="closeDarwer" v-if="data.drawer"></DrawerComponent>
  <!-- 添加文档 -->
  <modalComponnet
    :dialogFormVisible="data.dialogFormVisible"
    @closeModal="closeModal"
    :docTypeList="data.docTypeList"
    :editData="data.editData"
  ></modalComponnet>
  <!-- 登录 -->
  <LoginModelComponnet :isShow="data.isShow" @loginCallBack="loginCallBack" v-if="data.isShow"></LoginModelComponnet>
</template>
<script setup lang="ts">
import { computed, reactive } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { getDocByType, getDocTypeList } from "@/api/doc";
import { DocType, Doc } from "@/types/doc";
import DrawerComponent from "./components/drawer.vue";
import modalComponnet from "./components/modal.vue";
import RightComponnet from "./components/right.vue";
import LoginModelComponnet from "./components/login-model.vue";
import { useStore } from "@/store";

const data = reactive<{
  docTypeList: DocType[]; //文档类型列表
  drawer: boolean; //控制打开添加文档类型弹窗
  dialogFormVisible: boolean; //控制打开添加文档弹窗
  acitveIndex: string; //当前激活的选项卡
  editData: Doc | null; //编辑数据
  docList: Doc[]; ///文档列表
  isShow: boolean; // 是否展示登录框
  pages: number;
}>({
  docTypeList: [],
  drawer: false,
  dialogFormVisible: false,
  acitveIndex: "0-0",
  editData: null,
  docList: [],
  isShow: false,
  pages: 1
});

// url 参数
const urlParams = {
  type: 0,
  contentType: ''
} 
// 页数
let page = 1;


//展示添加文档类型弹窗
const showDocType = () => {
  data.drawer = true;
};
//展示添加文档弹窗
const showDialog = () => {
  data.dialogFormVisible = true;
  data.editData = null;
};

//关闭drawer回调
const closeDarwer = (arg: boolean | DocType) => {
  data.drawer = false;
  typeof arg !== "boolean" && data.docTypeList.push(arg);
};

//关闭添加\编辑文档modal
const closeModal = (type: string, doc: Doc) => {
  data.dialogFormVisible = false;
  if (type === "add") {
    data.docList.unshift(doc);
  } else if (type === "edit") {
    const index = data.docList.findIndex((item) => item.id === doc.id);
    data.docList.splice(index, 1, doc);
  }
};

const route = useRoute();
//首次通过url参数来判断默认打开哪个选项卡
data.acitveIndex = route.params["id"] as string;

//获取type类型的文档
const getDocs = () => {
  getDocByType(urlParams.type, urlParams.contentType, page).then((res) => {
    if (res.status) {
      data.docList = res.data;
      data.pages = res.pages;
    }
  });
};

//根据url参数获取type和contentType
const paramsStr = route.params["id"] as string;
//获取url中参数 并请求数据
const getUrlParams = (paramsStr: string) => {
  const paramsArr = paramsStr ? paramsStr.split("-") : [];
  if (paramsArr.length === 2) {
    urlParams.type = Number(paramsArr[1]);
    urlParams.contentType = paramsArr[0];
    getDocs();
  }
};
// 首次进入加载
getUrlParams(paramsStr);

//监听路由变化
onBeforeRouteUpdate((to) => {
  page = 1;
  getUrlParams(to.params["id"] as string);
});

//获取文档类型列表
getDocTypeList().then((res) => {
  data.docTypeList = res.data;
});

//编辑回调
const editEvent = (doc: Doc) => {
  data.editData = doc;
  data.dialogFormVisible = true;
};

// 翻页
const handlerPageChange = (currentPage: number) => {
  page = currentPage;
  getDocs();
}

// 管理
const router = useRouter()
const manage = ()=>{
  router.push('/manage/index')
}

// 登录
const login = () =>{
  data.isShow = true;
}

// 保存token
const store = useStore();
const loginCallBack = (isLogin:boolean, token?: string) => {
  data.isShow = false;
  if(isLogin && token){
    store.commit('setIslogin',true);
    store.commit('setToken', token);
    localStorage.setItem('token',token)
  }
}

// 判断是否登录
const isLogin = computed(() => {
  return store.state.user.isLogin;
})

// 退出
const loginOut = () => {
  localStorage.removeItem('token');
  store.commit('setIslogin', false);
  store.commit('setToken', '');
}
</script>
<style lang="scss" scoped>
@import "./list.scss";
</style>
