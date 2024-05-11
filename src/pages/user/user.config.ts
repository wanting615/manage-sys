import { UserInfo } from '@/types/user';

interface SearchConfigItem {
  label: string;
  model: keyof UserInfo;
  type: 'select' | 'local-select' | 'date-line';
  options?: { label: string; value: number | string }[];
}

export const searchConfig: SearchConfigItem[] = [
  { label: '用户账号', model: 'username', type: 'select' },
  { label: '用户名称', model: 'name', type: 'select' },
  { label: '手机号码', model: 'phone', type: 'select' },
  {
    label: '权限等级',
    model: 'level',
    type: 'local-select',
    options: [
      { label: '管理员', value: 1 },
      { label: '普通用户', value: 2 }
    ]
  },
  {
    label: '状态',
    model: 'status',
    type: 'local-select',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  },
  { label: '注册时间', model: 'createAt', type: 'date-line' }
];
