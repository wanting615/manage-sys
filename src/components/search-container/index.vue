<template>
  <div class="search-container">
    <div class="search-content">
      <template v-if="isFold">
        <span v-if="!slots.headerTpl" class="search-title">{{ headerTitle }}</span>
        <template v-else>
          <slot name="headerTpl" />
        </template>
      </template>
      <template v-else><slot /></template>
    </div>

    <div v-if="showBtnContainer" class="btn-container">
      <el-tooltip content="刷新">
        <el-button :icon="Refresh" circle @click="onRefresh" />
      </el-tooltip>
      <el-tooltip :content="isFold ? '收起' : '展开'">
        <el-button type="primary" :icon="Fold" circle @click="onFold" style="margin-left: 0" />
      </el-tooltip>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, useSlots } from 'vue';
import { Refresh, Fold } from '@element-plus/icons';

const slots = useSlots();
const emit = defineEmits(['onFold', 'onRefresh']);
const isFold = ref(false);

withDefaults(defineProps<{ headerTitle: string; showBtnContainer: boolean }>(), {
  headerTitle: '',
  showBtnContainer: false
});

const onFold = () => {
  isFold.value = !isFold.value;
  emit('onFold', isFold.value);
};

const onRefresh = () => {
  emit('onRefresh');
};
</script>

<style lang="scss">
.search-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;

  .search-content {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 24px;

    .search-title {
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 500;
      color: #515661;
      line-height: 32px;
    }
  }

  .btn-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
