import { AppRouteRecordRaw } from '../type';

const registerPage: Array<AppRouteRecordRaw> = [
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册',
      icon: 'register',
      hidden: true
    },
    component: () => import('@/pages/register/register.vue')
  }
];

export default registerPage;
