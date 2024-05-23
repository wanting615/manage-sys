<template>
  <router-view />
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus';

ElNotification({
  title: 'Hello',
  type: 'success',
  dangerouslyUseHTMLString: true,
  message:
    "<a style='color: teal' target='_blank' href='https://github.com/wanting615/mange-sys'>点击查看githup地址！</a>",
  duration: 2000,
  position: 'bottom-right'
});
</script>

<style lang="scss">
@import './App.scss';
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 900px;
}
@import './theme/mobile.scss';
</style>
