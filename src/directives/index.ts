import { App } from 'vue';
import { button } from './button';

/** 挂载自定义指令 */
export function loadDirectives(app: App) {
  app.directive('button', button);
}
