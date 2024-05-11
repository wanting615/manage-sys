<template>
  <el-empty>
    <template v-slot:description>
      <p v-if="!slots.noDataTextTpl">{{ noDataText }}</p>
      <p v-else><slot name="noDataTextTpl" /></p>
    </template>

    <template v-if="showOprationBtn">
      <template v-if="!slots.btnTemplate">
        <el-button type="primary" link @click="onClick">
          <el-icon class="opration-btn-icon"><CirclePlusFilled /></el-icon> {{ btnText }}
        </el-button>
      </template>

      <template v-else><slot name="btnTemplate" /></template>
    </template>
  </el-empty>
</template>
<script setup lang="ts">
import { useSlots } from 'vue';
import { CirclePlusFilled } from '@element-plus/icons';

const slots = useSlots();
const emit = defineEmits(['onAddBtnClick']);

withDefaults(
  defineProps<{
    noDataText?: string;
    showOprationBtn?: boolean;
    btnText?: string;
  }>(),
  {
    noDataText: '暂无更多内容哦',
    showOprationBtn: false,
    btnText: '添加数据'
  }
);

const onClick = () => {
  emit('onAddBtnClick');
};
</script>

<style lang="scss" scoped>
.opration-btn-icon {
  margin-right: 5px;
}

::v-deep(.el-empty__bottom) {
  margin-top: 5px !important;
}
</style>
