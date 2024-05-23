<template>
  <el-table
    :data="tableConfig.dataList"
    :border="true"
    :stripe="true"
    :max-height="tableConfig.height"
    :hide-on-single-page="true"
    :show-overflow-tooltip="true"
  />
</template>

<script setup lang="ts">
import { AppTableProps } from './index';

withDefaults(defineProps<AppTableProps>(), {
  tableConfig: () => ({
    dataList: [],
    height: 400,
    limit: 10,
    page: 0,
    count: 0
  }),
  tableHeaders: () => []
});
</script>
