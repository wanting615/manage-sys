<template>
  <i class="icon">
    <svg aria-hidden="true" :width="size" :height="size" :fill="fillColor">
      <use :xlink:href="symbolId" />
    </svg>
  </i>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    size?: number;
    height?: number;
    fillColor?: string;
    name: string;
    prefix?: string;
  }>(),
  {
    size: 18,
    height: 18,
    prefix: 'icon',
    fillColor: '#fff'
  }
);

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
