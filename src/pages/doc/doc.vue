<template>
  <el-container>
    <el-main>
      <router-view  v-slot="{ Component, route}">
        <KeepAlive :key="route.path" v-if="$route.meta.keepAlive">
         <component :is="Component" :key="route.name"/>
        </KeepAlive>
        <component v-if="!$route.meta.keepAlive" :is="Component" />
      </router-view>
      <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    </el-main>
</el-container>

 

</template>
<script setup lang="ts">
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
