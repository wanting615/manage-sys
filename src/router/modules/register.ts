import { AppRouteRecordRaw } from "../type";

const registerPage: Array<AppRouteRecordRaw> = [
	{
		path: "/register",
		name: "register",
		component: () => import("@/pages/register/register.vue"),
	},
];

export default registerPage;
