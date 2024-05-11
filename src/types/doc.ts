//文档类型
export interface DocType {
  id: number;
  name: string; //类型名称
  iconUrl: string; //文档类型icon
  contents: Content[]; //文档内容类型
  routerUrls?: { name: string; url: string }[];
  disabled: number;
}

export interface Content {
  id?: number;
  name: string;
}

export interface Doc {
  id: number;
  title: string; //标题
  type: number; //文档类
  typeName?: string; //文档类型名称
  contents: Content[]; //文档内容类型
  content: string; //内容
  autor: string; //作者
  creatAt: Date; //创建时间
}

export interface DocForm {
  id?: number;
  title: string; //标题
  typeName?: string; //文档类型名称
  type: number | undefined; //文档类
  contents: Content[]; //文档内容类型
  content: string; //内容
  autor?: string; //作者
}

export interface DocTypeForm {
  id?: number;
  contents: string[];
  name: string;
  iconUrl: string;
}
