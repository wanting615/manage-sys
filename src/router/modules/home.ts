import { AppRouteRecordRaw } from "@/router/type";

const homePage: Array<AppRouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/home/home.vue')
  }
]

export default homePage;

