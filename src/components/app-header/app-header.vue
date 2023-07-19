<template>
 <div class="app-header">
  <span class="header-title">{{ headerTitle }}</span>
  <el-affix :offset="56">
    <div class="detail-btn">
      <slot></slot>
    </div>
  </el-affix>
 </div>
</template>

<script setup lang="ts">
defineProps<{
  headerTitle: string
}>();
</script>

<style lang="scss" scoped>
.app-header {
  position: relative;
  .header-title {
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    padding-left: 5px;
  }

  .detail-btn {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  }
}
</style>
