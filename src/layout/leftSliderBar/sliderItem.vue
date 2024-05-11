<template>
  <div :class="{ 'simple-mode': props.isCollapse }">
    <template v-if="!hasChildren && basePath !== '/doc'">
      <router-link :to="resolvePath(item.path)">
        <el-menu-item :index="resolvePath(item.path)">
          <el-icon v-if="item.meta?.icon"> <SvgIcon :name="item.meta.icon" /></el-icon>
          <template #title>
            <span>{{ item.meta?.title }}</span>
          </template>
        </el-menu-item>
      </router-link>
    </template>
    <el-sub-menu v-else :index="resolvePath(props.item.path)" teleported>
      <template #title>
        <el-icon v-if="item.meta?.icon"> <SvgIcon :name="item.meta.icon" /></el-icon>
        <span v-if="item.meta?.title">{{ item.meta.title }}</span>
      </template>
       <template v-if="item.children">
        <sliderItem
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { AppRouteRecordRaw } from '@/router/type';

interface Props {
  item: AppRouteRecordRaw;
  isCollapse?: boolean;
  basePath: string;
}

const props = withDefaults(defineProps<Props>(), {
  isFirstLevel: true,
  basePath: ''
})

const hasChildren = computed(() => {
  return props.item.children?.length;
})

/** 解析路径 */
const resolvePath = (routePath: string) => {
  if(!hasChildren.value) return props.basePath
  return props.basePath + "/" +routePath;
} 

</script>

<style scoped lang="scss">
  a {
    text-decoration: none;
  }

  .simple-mode {
      :deep(.el-sub-menu) {
        .el-sub-menu__icon-arrow {
          display: none;
        }
        span {
          visibility: hidden;
        }
      }
  }
</style>