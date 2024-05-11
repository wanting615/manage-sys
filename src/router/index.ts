import { createRouter, createWebHashHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import { AppRouteRecordRaw, FileType } from './type';
import { useStore } from '@/store';
import { usePermission } from '@/hooks/usePermissionRouter';

// import moudle router
const files: Record<string, FileType> = import.meta.glob('./modules/*.ts', { eager: true });
let routerModule: Array<AppRouteRecordRaw> = [];
Object.keys(files).forEach((key: string) => {
  routerModule = routerModule.concat(files[key].default);
});
const routes: Array<AppRouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/home/home.vue')
  },
  {
    path: '',
    name: 'main',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '首页',
          icon: 'index'
        },
        component: () => import('@/pages/index/index.vue')
      },
      ...routerModule
      // {
      // 	path: "",
      // 	name: "redirect",
      // 	redirect: "/index",
      // },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/register/register.vue')
  }
  // {
  // 	path: "/:pathMatch(.*)*",
  // 	name: "redirect",
  // 	redirect: "/home",
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as unknown as RouteRecordRaw[]
});

router.beforeEach(async (to, from, next) => {
  if (to.name === 'home') return next();
  const token = localStorage.getItem('token');
  const store = useStore();
  if (!token && to.name !== 'home' && to.name !== 'register') {
    return next('/home');
  }

  if (store.state.user.userInfo) return next();

  try {
    const permission = usePermission();
    store.commit('setToken', token!);
    await permission.getUserInfo(token!);
    const permissionRoutes = permission.getPermissionRoutes(store.state.user.userInfo!.level, routes);
    resetRouter();
    permissionRoutes.forEach((route) => router.addRoute(route as RouteRecordRaw));
    await permission.setRoutes(JSON.parse(JSON.stringify(permissionRoutes)));
    return next({ ...to, replace: true });
  } catch (error) {
    console.log(error);
    return next('/home');
  }
});

/** 重置路由 */
function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name } = route;
      if (name) {
        router.hasRoute(name) && router.removeRoute(name);
      }
    });
  } catch {
    window.location.reload();
  }
}

export default router;
