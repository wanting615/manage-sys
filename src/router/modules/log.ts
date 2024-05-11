import { AppRouteRecordRaw } from "../type";

const logPage: Array<AppRouteRecordRaw> = [
	{
		path: "/log",
		name: "log",
		meta: {
			title: '日志',
			icon: 'log'
		},
		component: () => import("@/pages/log/log.vue"),
	},
];

export default logPage;
