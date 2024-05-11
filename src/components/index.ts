import { App } from "vue";
import "virtual:svg-icons-register"
import SvgIcon from "./svg-icon/index.vue";
import TextTrunvated from './text-truncated/index.vue'
import NoData from './no-data/index.vue'
import AppHeader from "./app-header/index.vue";

export function initGlobalComponent(app: App): void{
  app.component("SvgIcon", SvgIcon);
  app.component('TextTrunvated', TextTrunvated)
  app.component('NoData',NoData),
  app.component("AppHeader", AppHeader)
}