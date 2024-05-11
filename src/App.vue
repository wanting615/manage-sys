
<template>
  <router-view></router-view>

</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus';

ElNotification({
  title: "Hello",
  type: "success",
  dangerouslyUseHTMLString: true,
  message:
    "<a style='color: teal' target='_blank' href='https://github.com/wanting615/mange-sys'>小项目获取 star 不易，如果你喜欢这个项目的话，欢迎点击这里支持一个 star ！</a>",
  duration: 2000,
  position: "bottom-right"
})



</script>

<style lang="scss">
@import "./App.scss";
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 900px;
}
@import "./theme/mobile.scss"
</style>
