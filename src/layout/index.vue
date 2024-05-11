<template>
  <div :class="calsses" class="app-warpper">
    <div :class="layoutClass">
        <LeftSliderBar class="sidebar-container"></LeftSliderBar>
         <!-- 主容器 -->
        <div  class="main-container">
          <!-- 头部导航栏和标签栏 -->
          <div  class="layout-header">
            <NavigationBar />
          </div>
          <!-- 页面主体内容 -->
          <AppMain class="app-main" />
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import useResize from '@/hooks/useResize';
import LeftSliderBar from "./leftSliderBar/index.vue";
import NavigationBar from "./navigationBar/index.vue"
import AppMain from "./appMain/index.vue";
import { useStore } from '@/store';

/** 响应式布局，监听页面宽度变化，切换移动端还是pc端 */
useResize();

const store = useStore();
const calsses = computed(() => {
  return {

  }
})

const layoutClass = computed(() => {
  return {
    hideSidebar: store.state.app.closeSiderBar,
    openSidebar: !store.state.app.closeSiderBar,
  }
})

</script>

<style lang="scss">
.main-container {
  min-height: 100%;
  transition: margin-left 0.35ms;
  margin-left: var(--sidebar-width);
  position: relative;
}

.layout-header {
  position: relative;
  z-index: 9;
  box-shadow: var(--el-box-shadow-lighter);
}

.app-main {
  min-height: calc(100vh - var(--navigationbar-height));
  position: relative;
  overflow: hidden;
}

.hideSidebar {
  .sidebar-container {
    width: var(--sidebar-hide-width) !important;
  }
  .main-container {
    margin-left: var(--sidebar-hide-width);
  }
  .fixed-header {
    width: calc(100% - var(--sidebar-hide-width));
  }
}
</style>