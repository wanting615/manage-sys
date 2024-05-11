import { AppRouteRecordRaw } from '../type';

const managePage: Array<AppRouteRecordRaw> = [
  {
    path: '/manage',
    name: 'manage',
    meta: {
      title: '类型管理',
      icon: 'manage'
    },
    component: () => import('@/pages/manage/manage.vue')
  }
];

export default managePage;
