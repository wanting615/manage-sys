import { ComponentPublicInstance, onMounted, ref } from 'vue';

const getTableOffsetTop = (el?: HTMLElement) => {
  return el?.getBoundingClientRect().top || 0;
};

const getTableHeight = (el?: HTMLElement, offsetBottom: number = 0) => {
  const _top = getTableOffsetTop(el);
  const _height = window.innerHeight - _top - offsetBottom;
  return _height;
};

export function useTableHeight(offsetBottom = 70) {
  const height = ref(0);
  const tableEl = ref<ComponentPublicInstance | undefined>(undefined);

  onMounted(() => {
    setTableHeight();
  });

  const setTableHeight = () => {
    setTimeout(() => {
      height.value = getTableHeight(tableEl.value?.$el, offsetBottom);
    });
  };
  return { tableEl, height, setTableHeight };
}
