import SvgIcon from '../src/components/svg-icon/index.vue';
import TextTrunvated from '../src/components/text-truncated/index.vue';
import NoData from '../src/components/no-data/index.vue';
import AppHeader from '../src/components/app-header/index.vue';
import SearchContainer from '../src/components/search-container/index.vue';

/** 由 app.component 全局注册的组件需要在这里声明 TS 类型才能获得 Volar 插件提供的类型提示） */
declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: typeof SvgIcon;
    TextTrunvated: typeof TextTrunvated;
    NoData: typeof NoData;
    AppHeader: typeof AppHeader;
    SearchContainer: typeof SearchContainer;
  }
}

export {};
