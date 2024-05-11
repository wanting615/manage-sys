<template>
  <section class="app-main">
    <div class="app-scrollbar">
      <router-view v-slot="{ Component, route }">
        <transition name="el-fade-in" mode="out-in">
            <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>
    <el-backtop target=".app-scrollbar" />
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
/** 美化原生滚动条 */
%scrollbar {
  // 整个滚动条
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  // 滚动条上的滚动滑块
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #90939955;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #90939977;
  }
  &::-webkit-scrollbar-thumb:active {
    background-color: #90939999;
  }
  // 当同时有垂直滚动条和水平滚动条时交汇的部分
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}


.app-main {
  width: 100%;
  background-color: var(--body-bg-color);
  display: flex;
  .app-scrollbar {
    flex-grow: 1;
    overflow: auto;
    @extend %scrollbar;
    display: flex;
    flex-direction: column;
    .app-container-grow {
      flex-grow: 1;
    }
  }
}

</style>