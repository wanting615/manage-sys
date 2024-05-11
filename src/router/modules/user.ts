import { AppRouteRecordRaw } from '../type';

const userPage: Array<AppRouteRecordRaw> = [
  {
    path: '/user',
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'doc'
    },
    component: () => import('@/pages/user/user.vue')
  }
];

export default userPage;
