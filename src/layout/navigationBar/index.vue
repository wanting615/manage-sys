<template>
  <div class="navigation-bar">
    <div class="hamburger" @click="toggleSidebar">
      <el-icon :size="20" class="icon">
        <Fold v-if="!store.state.app.closeSiderBar" />
        <Expand v-else />
      </el-icon>
    </div>
    <AppBreadcrumb />

    <AppRightMenu></AppRightMenu>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { Expand, Fold} from "@element-plus/icons-vue"
import AppBreadcrumb from "./breadcrumb.vue";
import AppRightMenu from "./rightMenu.vue"

const store = useStore();

const toggleSidebar = () => {
  store.commit('setCloseSiderBar', !store.state.app.closeSiderBar)
}

</script>

<style lang="scss">
.navigation-bar {
  height: var(--navigationbar-height);
  overflow: hidden;
  background: var(--header-bg-color);
  display: flex;
  justify-content: space-between;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    flex: 1;
    // 参考 Bootstrap 的响应式设计将宽度设置为 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .sidebar {
    flex: 1;
    // 设置 min-width 是为了让 Sidebar 里的 el-menu 宽度自适应
    min-width: 0px;
    :deep(.el-menu) {
      background-color: transparent;
    }
    :deep(.el-sub-menu) {
      &.is-active {
        .el-sub-menu__title {
          color: var(--el-menu-active-color) !important;
        }
      }
    }
  }
}
</style>