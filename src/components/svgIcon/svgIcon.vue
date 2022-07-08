<template>
  <i class="icon">
    <svg aria-hidden="true" :width="size" :height="size" :fill="fillColor">
      <use :xlink:href="src" />
    </svg>
  </i>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
  size?: number,
  height?: number,
  fillColor?: string,
  src: string
}>(), {
  size: 14,
  height: 14
})
</script>