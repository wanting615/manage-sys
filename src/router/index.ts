import { createRouter, createWebHashHistory } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import { AppRouteRecordRaw, FileType } from "./type";

// import moudle router
const files: Record<string, FileType> = import.meta.globEager("./modules/*.ts");
let routerModule: Array<AppRouteRecordRaw> = [];
Object.keys(files).forEach((key: string) => {
	routerModule = routerModule.concat(files[key].default);
});
const routes: Array<AppRouteRecordRaw> = [
	{
		path: "/home",
		name: "home",
		component: () => import("@/pages/home/home.vue"),
	},
	{
		path: "",
		name: "main",
		component: () => import("@/pages/main/main.vue"),
		children: [
			...routerModule,
			{
				path: "",
				name: "redirect",
				redirect: "/doc",
			},
		],
	},

	{
		path: "/:pathMatch(.*)*",
		name: "redirect",
		redirect: "/home",
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes as unknown as RouteRecordRaw[],
});

router.beforeEach((to, from) => {
	if (!localStorage.getItem("token") && to.name !== "home") {
		return { name: "home" };
	}

	if (localStorage.getItem("token") && to.name === "main") {
		return { name: "doc" };
	}
});

export default router;
