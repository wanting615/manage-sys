import { createRouter, createWebHashHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import { AppRouteRecordRaw, FileType } from './type';

// import moudle router
const files: Record<string, FileType> = import.meta.globEager("./modules/*.ts");
let routerModule: Array<AppRouteRecordRaw> = [];
Object.keys(files).forEach((key: string) => {
  routerModule = routerModule.concat(files[key].default)
})
const routes: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    name: "Root",
    // redirect: '/home',
    redirect: '/list/1'
  },
  ...routerModule,
  {
    path: '/:pathMatch(.*)*',
    name: 'redirect',
    // redirect: '/home'
    redirect: '/list/1'
  }
]
console.log(routes)
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as unknown as RouteRecordRaw[]
})

export default router
