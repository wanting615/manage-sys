<template>
  <el-popover width="80%" effect="dark" :trigger="trigger" :popper-class="popperClass" :content="data">
    <template #reference>
      <div ref="contentEl" class="text-truncated" :style="{ '-webkit-line-clamp': showRow ?? 1 }">
        <template v-if="data">{{ data }}</template>
        <template v-else><span style="color: #b5b8bf">-</span></template>
      </div>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
interface PropsData {
  data: any;
  popperClass: string;
  trigger: 'click' | 'focus' | 'hover';
  template?: string;
  showRow: number;
}

import { onUnmounted, ref, watch } from 'vue';

const props = withDefaults(defineProps<PropsData>(), {
  data: '',
  popperClass: '',
  trigger: 'hover',
  showRow: 1
});

watch(props.data, (newData) => {
  if (newData) hanleTooltip();
});

onUnmounted(() => {
  contentEl.value && resizeObserver?.unobserve(contentEl.value);
});

const tooltip = ref('');
const contentEl = ref<HTMLElement | null>(null);

let resizeObserver: ResizeObserver | null = null;
const hanleTooltip = () => {
  const el = contentEl.value;
  if (!el) return;
  resizeObserver = new ResizeObserver(() => {
    if (el?.scrollHeight > el?.offsetHeight) {
      tooltip.value = props.data ?? props.template ?? '';
    }
  });
  resizeObserver?.observe(el);
};
</script>

<style lang="scss">
div {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-break: break-all;
  line-break: anywhere;
}
</style>
