import { AppRouteRecordRaw } from "../type";

const managePage: Array<AppRouteRecordRaw> = [
	{
		path: "/manage",
		name: "manage",
		component: () => import("@/pages/manage/manage.vue"),
	},
];

export default managePage;
