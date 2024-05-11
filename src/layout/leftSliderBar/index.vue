<template>
  <div>
    <div class="layout-logo-container">
      <transition name="layout-logo-fade">
        <img :src="!isCollapse ? logoBig : logoSmall">
      </transition>
    </div>

    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#001428"
        text-color="#c0c4cc"
        active-text-color="#fff"
        :unique-opened="true"
        :collapse-transition="false"
        :mode="'vertical'"
      >
        <SliderItem 
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :is-collapse="isCollapse"
          :base-path="route.path"
        ></SliderItem>
      </el-menu>
      </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import SliderItem from "./sliderItem.vue";
import logoBig from "@/assets/logo-text.svg"
import logoSmall from "@/assets/logo.svg"

const route = useRoute();
const store = useStore();

const isCollapse = computed(() => store.state.app.closeSiderBar);
const routes = store.state.app.appRouter;
const activeMenu = computed(() => {
  const {
    meta: { activeMenu },
    path
  } = route
  return activeMenu ? activeMenu : path
})

</script>

<style lang="scss" scoped>
.layout-logo-container {
  position: relative;
  width: 100%;
  height: var(--header-height);
  line-height: var(--header-height);
  background-color: transparent;
  text-align: center;
  overflow: hidden;
  
  img {
    height: 40px;
    vertical-align: middle;
  }
  
}

.sidebar-container {
  background-color: var(--sidebar-menu-bg-color);
  transition: width 0.35s;
  width: var(--sidebar-width) !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

.el-scrollbar {
  height: calc(101% - var(--header-height));
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item),
:deep(.el-menu--horizontal .el-menu-item) {
  height: var(--sidebar-menu-item-height);
  line-height: var(--sidebar-menu-item-height);
  &.is-active,
  &:hover {
    background-color: var(--sidebar-menu-hover-bg-color);
  }
  display: block;
  * {
    vertical-align: middle;
  }
}
</style>