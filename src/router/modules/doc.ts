import { AppRouteRecordRaw } from "../type";

const docPage: Array<AppRouteRecordRaw> = [
	{
		path: "/doc",
		name: "doc",
		component: () => import("@/pages/doc/doc.vue"),
		children: [
			{
				path: ":id/:type",
				name: "list",
				component: () => import("@/pages/doc/list/list.vue"),
			},
		],
	},
];

export default docPage;
