import { AppRouteRecordRaw } from "../type";

const userPage: Array<AppRouteRecordRaw> = [
	{
		path: "/user",
		name: "user",
		component: () => import("@/pages/user/user.vue"),
	},
];

export default userPage;
