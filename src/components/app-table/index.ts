export type AppTableConfig<T = unknown> = {
  dataList?: T[]; // 数据源
  height?: number; // 表格高度
  hasDetail?: boolean; // 是否有详情按钮
  page?: number; // 页数
  count?: number; // 总数
  limit?: number; // 每页条数
};

export type AppTableProps = {
  tableConfig: AppTableConfig;
  tableHeaders: any[];
};

export interface TableHeader<T = unknown> {
  type: TableHeaderTypeEnum; // 类型
  key: keyof T; // 属性值的key
  width: number; // 列宽
  fixed?: boolean | 'right' | 'left'; //固定列
  sortable?: boolean; // 排序
  // 头部自定义渲染
  headerSlot?: boolean;
}

enum TableHeaderTypeEnum {
  text = 'text',
  number = 'number',
  data = 'date',
  slot = 'slot'
}
