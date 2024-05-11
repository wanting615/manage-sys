<template>
  <!-- <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span v-if="item.redirect === 'noRedirect' || index === breadcrumbs.length - 1" class="no-redirect">
        {{ item.meta?.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">
        {{ item.meta?.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb> -->
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
// import { AppRouteRecordRaw } from "@/router/type";
// import { ref } from "vue";
// import { useRoute } from "vue-router";

// const route = useRoute();

// const breadcrumbs = ref<AppRouteRecordRaw[]>([]);

// const handleLink = (item: AppRouteRecordRaw) => {
//   //todo
// };
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: var(--navigationbar-height);
  margin-left: 8px;
  flex: 1;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
