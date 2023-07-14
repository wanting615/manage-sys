import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-plus/dist/index.css";
import installSvgIcon from "@/components/svgIcon";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import hljs from "highlight.js";

VMdPreview.use(githubTheme, {
	Hljs: hljs,
});

const app = createApp(App);
app.use(router).use(store);
app.use(VMdPreview);

installSvgIcon(app);

app.mount("#app");
