<template>
  <div class="right-menu">
    <el-tooltip content="搜索" placement="bottom" >
      <el-icon @click="onOpenSearchModal"><Search /></el-icon>
    </el-tooltip>

    <el-tooltip :content="fullscreenTips" placement="bottom" >
      <el-icon @click="onFullScreen"><SvgIcon :name="fullscreenSvgName" fill-color="#606266"/></el-icon>
    </el-tooltip>

    <el-tooltip content="消息" placement="bottom">
      <el-icon><SvgIcon name="message" fill-color="#606266"/></el-icon>
    </el-tooltip>

    <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <el-avatar :icon="UserFilled" :size="30" />
          <span>{{ userType }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item  @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    <SearchModal v-model="modalVisible"/>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import screenfull from "screenfull";
import { Search, UserFilled} from '@element-plus/icons';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import SearchModal from "./components/searchModal.vue"
import { useStore } from '@/store';
import { UserLevel } from "@/types/user"

const store = useStore();
const router = useRouter();
// 用户类型
const userType = computed(() => {
  return store.state.user.userInfo?.level === UserLevel.admin ? '管理员' : '普通用户'
})

// 退出
const logout = () => {
  localStorage.removeItem('token');
  store.commit('setIslogin', false);
  store.commit('setToken', '');
  router.push('/home')
}
/** 搜索 */
const modalVisible = ref(false);
const onOpenSearchModal = () => {
  modalVisible.value = true;
}

/** 全屏 */
const isFullscreen = ref<boolean>(false)
const fullscreenTips = computed(() => {
  return isFullscreen.value ? '退出全屏' : '全屏'
})

const fullscreenSvgName = computed(() => {
  return isFullscreen.value ? "fullScreen-exit" : "fullScreen"
})
const onFullScreen = () => {
  const dom = document.querySelector('html') || undefined;
  screenfull.isEnabled ? screenfull.toggle(dom) : ElMessage.error('该浏览器暂不支持');
}
const handleFullscreenChange = () => {
  isFullscreen.value = screenfull.isFullscreen
}

watchEffect((onCleanup) => {
  // 挂载组件时自动执行
  screenfull.on("change", handleFullscreenChange)
  // 卸载组件时自动执行
  onCleanup(() => {
    screenfull.isEnabled && screenfull.off("change", handleFullscreenChange)
  })
})

</script>

<style lang="scss" scoped>
.el-icon {
  margin-right: 18px;
  cursor: pointer;
}

.right-menu {
  margin-right: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  color: #606266;
  .right-menu-item {
    padding: 0 10px;
    cursor: pointer;
    .right-menu-avatar {
      display: flex;
      align-items: center;
      .el-avatar {
        margin-right: 10px;
      }
      span {
        font-size: 14px;
      }
    }
  }
}
</style>