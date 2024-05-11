/**
 *  监听页面尺寸变换，切换移动端或pc端样式
 */

import { useStore } from '@/store';
import { DeviceEnum } from '@/types/enum';
import { onBeforeMount, onBeforeUnmount, onMounted } from 'vue';

/** 参考 Bootstrap 的响应式设计将最大移动端宽度设置为 992 */
const MAX_MOBILE_WIDTH = 992;

export default () => {
  const store = useStore();

  /** 用于判断当前设备是否为移动端 */
  const _isMobile = () => {
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < MAX_MOBILE_WIDTH;
  };

  const _resizeHandler = () => {
    const isMobile = _isMobile();
    store.commit('setDevice', isMobile ? DeviceEnum.Mobile : DeviceEnum.Desktop);
    isMobile && store.commit('setCloseSiderBar', true);
  };

  onBeforeMount(() => {
    window.addEventListener('resize', _resizeHandler);
  });

  onMounted(() => {
    if (_isMobile()) {
      store.commit('setDevice', DeviceEnum.Mobile);
      store.commit('setCloseSiderBar', true);
    }
  });

  /** 在组件卸载前移除窗口大小变化事件监听器 */
  onBeforeUnmount(() => {
    window.removeEventListener('resize', _resizeHandler);
  });
};
