import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-plus/dist/index.css";
import VMdEditor from "./hooks/editor";
import { initGlobalComponent } from "./components";
import { loadDirectives } from "./directives";

const app = createApp(App);
app.use(router).use(store);
// app.use(VMdPreview);
app.use(VMdEditor);

/* 加载全局组件 */
initGlobalComponent(app);

/** 加载自定义指令 */
loadDirectives(app)

app.mount("#app");
