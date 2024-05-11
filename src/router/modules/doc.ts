import { AppRouteRecordRaw } from "../type";

const docPage: Array<AppRouteRecordRaw> = [
	{
		path: "/doc",
		name: "doc",
		meta: {
			title: "文档",
			icon: 'doc',
		},
		component: () => import("@/pages/doc/doc.vue"),
		children: [
			{
				path: ":id/:type",
				name: "list",
				component: () => import("@/pages/doc/list/list.vue"),
				meta: { keepAlive: true },
			},
			{
				path: "detail/:id",
				name: "detail",
				component: () => import("@/pages/doc/detail/detail.vue"),
			},
		],
	},
];

export default docPage;
