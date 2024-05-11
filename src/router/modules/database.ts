import { UserLevel } from '@/types/user';
import { AppRouteRecordRaw } from '../type';

const databasePage: Array<AppRouteRecordRaw> = [
  {
    path: '/database',
    name: 'database',
    meta: {
      title: '数据',
      icon: 'database',
      level: [UserLevel.admin]
    },
    component: () => import('@/pages/database/database.vue')
  }
];

export default databasePage;
