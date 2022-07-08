<template>
  <div>
    <md-editor v-model="text" :previewOnly="true" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import MdEditor from "md-editor-v3";
import 'md-editor-v3/lib/style.css';
const text = ref(`## md-editor-v3

Markdown 编辑器，基于 vue3，使用 jsx 和 typescript 语法开发，支持切换主题、prettier 美化文本等。`)

</script>

<style lang="scss" scoped>
</style>