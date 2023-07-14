<template>
   <div class="common-layout">
    <el-container>
      <el-header>
        <img src="../../assets/images/logo.png" alt="">
        <el-menu mode="horizontal"  :default-active="data.acitveIndex">
          <el-menu-item index="doc" @click="onSwith('/doc')">文档管理</el-menu-item>
          <el-menu-item index="user"  @click="onSwith('/user')">用户管理</el-menu-item>
          <el-menu-item index="manage"  @click="onSwith('/manage')">文档类型</el-menu-item>
        </el-menu>
        <div class="user-info">
          <span>{{ userInfo?.name || '未设置名称' }}</span>
          <el-divider direction="vertical" />
          <span>{{ userInfo?.level === 1 ? '管理员' : '普通用户' }}</span>
          <el-icon v-popover="popoverRef" v-click-outside="onClickOutside" ><CaretBottom /></el-icon>
        </div>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>

  <el-popover ref="popoverRef" trigger="click" virtual-triggering persistent >
    <div class="login-out" @click="loginOut()">退出 </div>
  </el-popover>

</template>
<script setup lang="ts">
import { computed, reactive, ref, unref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { CaretBottom } from "@element-plus/icons"
import { ClickOutside as vClickOutside } from 'element-plus'
import { useStore } from "@/store";


const store = useStore();
// 判断是否登录
const userInfo = computed(() => {
  return store.state.user.userInfo;
})

// 退出弹窗
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
const route = useRoute();
const router = useRouter();

const data = reactive<{
  docTypeDrawer: boolean; //文档类型弹窗
  acitveIndex: string; // 当前激活的顶部菜单
}>({
  docTypeDrawer: false,
  acitveIndex: '',
});


onBeforeRouteUpdate((e) => {
  getActiveIndex(e.path);
})

const getActiveIndex = (path: string) => {
  data.acitveIndex = path.split("/")[1] ?? '/doc'
}

getActiveIndex(route.path);

// 退出
const loginOut = () => {
  localStorage.removeItem('token');
  store.commit('setIslogin', false);
  store.commit('setToken', '');
  router.push('/home')
}


const onSwith = (url: string) => {
  router.push(url);
}

</script>
<style lang="scss" scoped>
@import './main.scss';
</style>
