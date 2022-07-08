import { AppRouteRecordRaw } from "@/router/type";

const listPage: Array<AppRouteRecordRaw> = [
  {
    path: "/list/:id",
    name: 'list',
    component: () => import("@/pages/list/list.vue"),
    // children: [
    //   {
    //     path: 'right/:id',
    //     name: 'right',
    //     component: () => import("@/pages/list/components/right.vue")
    //   }, {
    //     path: 'detail/:id',
    //     name: 'detail',
    //     component: () => import("@/pages/list/page/detail.vue")
    //   }]
  }
]

export default listPage;
