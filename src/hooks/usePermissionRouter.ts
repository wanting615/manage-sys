import { ref } from "vue";
import { getUserInfoApi } from "@/api/login";
import { useStore } from "@/store";
import { UserLevel } from "@/types/user";
import { AppRouteRecordRaw } from "@/router/type";
import { getDocTypeList } from "@/api/doc";

const routes = ref<AppRouteRecordRaw[]>([])
const store = useStore();

const hasPermission = (level: UserLevel, route: AppRouteRecordRaw) => {
  const _routelevels = route.meta?.level;
  return _routelevels ? _routelevels.includes(level) : true
}

const filterRoutes = (routes: AppRouteRecordRaw[], level: UserLevel) => {
  const res: AppRouteRecordRaw[] = []
  routes.forEach((route) => {
    const tempRoute = { ...route }
    if (hasPermission(level, tempRoute)) {
      if (tempRoute.children) {
        tempRoute.children = filterRoutes(tempRoute.children, level)
      }
      res.push(tempRoute)
    }
  })
  return res
}

// 存储路由，用于渲染sliderbar菜单
const setRoutes = async(routes: AppRouteRecordRaw[]) => {
  const _routes = routes.find(item => !item.path)?.children?.filter(child => child.path && !child.meta?.hidden) || [];
  const _allRouter = await initAllRouters(_routes);
  store.commit('setAppRouter', _allRouter);
}

/** 根据角色生成可访问的 Routes */
const getPermissionRoutes = (level: UserLevel, routes: AppRouteRecordRaw[]) => {
  return filterRoutes(routes, level);
}

const getUserInfo = async(token: string) => {
  const _userInfoRes = await getUserInfoApi(token);
  if(_userInfoRes.status) {
    store.commit('setIslogin', true);
    store.commit('setUserInfo', _userInfoRes.data);
  }else {
    store.commit('setToken', '');
    localStorage.removeItem('token')
  }
}

const initAllRouters = async(routes: AppRouteRecordRaw[]) => {
  try {
    const docTypes = (await getDocTypeList()).data;
    const docRouter = routes.find(router => router.path === '/doc');
    const _docRouter: AppRouteRecordRaw[] = docTypes.map(docType => {
      return {
        path: String(docType.id),
        name: docType.name,
        meta: {
          title: docType.name
        },
        children: docType.contents.map(content => {
          return {
            path: String(content.id),
            name: content.name,
            meta: {
              title: content.name
            }
          }
        }) 
      }
    })
    docRouter && (docRouter.children = _docRouter);

    return routes;
  } catch (error) {
    return routes;
  } 
}


export function usePermission() {
  return { routes, getUserInfo, getPermissionRoutes, setRoutes}
}
