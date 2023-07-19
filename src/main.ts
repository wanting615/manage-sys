import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-plus/dist/index.css";
import installSvgIcon from "@/components/svgIcon";
import VMdEditor from "./hooks/editor";

const app = createApp(App);
app.use(router).use(store);
// app.use(VMdPreview);
app.use(VMdEditor);

installSvgIcon(app);

app.mount("#app");
