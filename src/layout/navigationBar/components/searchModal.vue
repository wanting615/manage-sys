<script lang="ts" setup>
import { computed, ref, shallowRef } from "vue"
import {  useRouter } from "vue-router"
import {  ElScrollbar } from "element-plus"
import { Search } from "@element-plus/icons"
import { debounce } from "lodash-es"
import { Doc } from "@/types/doc"
import { useStore } from "@/store"
import SearchResult from "./SearchResult.vue"
import { DeviceEnum } from "@/types/enum"

/** 控制 modal 显隐 */
const modelValue = defineModel<boolean>({ required: true })

const router = useRouter()
const isMobile = useStore().state.app.device === DeviceEnum.Mobile;

const inputRef = ref<HTMLInputElement | null>(null)
const scrollbarRef = ref<InstanceType<typeof ElScrollbar> | null>(null)
const searchResultRef = ref<InstanceType<typeof SearchResult> | null>(null)

const keyword = ref<string>("")
const resultList = shallowRef<Doc[]>([])
const activeId = ref<number | undefined>(undefined)
/** 是否按下了上键或下键（用于解决和 mouseenter 事件的冲突） */
const isPressUpOrDown = ref<boolean>(false)

/** 控制搜索对话框宽度 */
const modalWidth = computed(() => (isMobile ? "80vw" : "40vw"))

/** 搜索（防抖） */
const handleSearch = debounce(() => {
  activeId.value = length > 0 ? resultList.value[0].id : undefined
}, 500)

/** 关闭搜索对话框 */
const handleClose = () => {
  modelValue.value = false
  // 延时处理防止用户看到重置数据的操作
  setTimeout(() => {
    keyword.value = ""
    resultList.value = []
  }, 200)
}

/** 根据下标位置进行滚动 */
const scrollTo = (index: number) => {
  if (!searchResultRef.value) return
  const scrollTop = searchResultRef.value.getScrollTop(index)
  // 手动控制 el-scrollbar 滚动条滚动，设置滚动条到顶部的距离
  scrollbarRef.value?.setScrollTop(scrollTop)
}

/** 键盘上键 */
const handleUp = () => {
  isPressUpOrDown.value = true
  const { length } = resultList.value
  if (length === 0) return
  // 获取该 id 在菜单中第一次出现的位置
  const index = resultList.value.findIndex((item) => item.id === activeId.value)
  // 如果已处在顶部
  if (index === 0) {
    const bottomId = resultList.value[length - 1].id
    // 如果顶部和底部的 id 相同，且长度大于 1，就再跳一个位置
    if (activeId.value === bottomId && length > 1) {
      activeId.value = resultList.value[length - 2].id
      scrollTo(length - 2)
    } else {
      // 跳转到底部
      activeId.value = bottomId
      scrollTo(length - 1)
    }
  } else {
    activeId.value = resultList.value[index - 1].id
    scrollTo(index - 1)
  }
}

/** 键盘下键 */
const handleDown = () => {
  isPressUpOrDown.value = true
  const { length } = resultList.value
  if (length === 0) return
  // 获取该 id 在菜单中最后一次出现的位置
  const index = resultList.value.map((item) => item.id).lastIndexOf(activeId.value || 0)
  // 如果已处在底部
  if (index === length - 1) {
    const _id = resultList.value[0].id
    // 如果底部和顶部的 id 相同，且长度大于 1，就再跳一个位置
    if (activeId.value === _id && length > 1) {
      activeId.value = resultList.value[1].id
      scrollTo(1)
    } else {
      // 跳转到顶部
      activeId.value = _id
      scrollTo(0)
    }
  } else {
    activeId.value = resultList.value[index + 1].id
    scrollTo(index + 1)
  }
}

/** 键盘回车键 */
const handleEnter = () => {
  const { length } = resultList.value
  if (length === 0) return
  const id = activeId.value;
  handleClose()
}

/** 释放上键或下键 */
const handleReleaseUpOrDown = () => {
  isPressUpOrDown.value = false
}
</script>

<template>
  <el-dialog
    v-model="modelValue"
    @opened="inputRef?.focus()"
    @closed="inputRef?.blur()"
    @keydown.up="handleUp"
    @keydown.down="handleDown"
    @keydown.enter="handleEnter"
    @keyup.up.down="handleReleaseUpOrDown"
    :before-close="handleClose"
    :width="modalWidth"
    top="5vh"
    class="search-modal__private"
    append-to-body
  >
    <el-input ref="inputRef" v-model="keyword" @input="handleSearch" placeholder="搜索菜单" size="large" clearable>
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>
    <el-empty v-if="resultList.length === 0" description="暂无搜索结果" :image-size="100" />
    <template v-else>
      <p>搜索结果</p>
      <el-scrollbar ref="scrollbarRef" max-height="40vh" always>
        <SearchResult
          ref="searchResultRef"
          v-model="activeId"
          :list="resultList"
          :isPressUpOrDown="isPressUpOrDown"
          @click="handleEnter"
        />
      </el-scrollbar>
    </template>
    <template #footer>
      <div class="search-footer">
        共 {{ resultList.length }} 项
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.search-modal__private {
  .svg-icon {
    font-size: 18px;
  }
  .el-dialog__header {
    display: none;
  }
  .el-dialog__footer {
    border-top: 1px solid var(--el-border-color);
  }
}
.search-footer {
  display: flex;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  text-align: right;
}
</style>
