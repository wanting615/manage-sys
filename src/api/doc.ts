
import { Doc, DocForm, DocType } from "@/types/doc";
import { HttpService, RootObject } from "../until/httpService";
import { UrlService } from "./ur.base";
//获取所有文档类型
export const getDocTypeList = () => {
  return HttpService.get<RootObject<DocType[]>>(UrlService.docTypeList);
}

//添加文档类型
export const addDocType = (name: string, contentTypes: string, iconUrl: string) => {
  return HttpService.post<RootObject<DocType>>(UrlService.addDocType, { name, contentTypes, iconUrl });
}

//更新文档类型
export const updateDocType = (id: number, name: string, contentTypes: string, iconUrl: string) => {
  return HttpService.post<RootObject<DocType>>(UrlService.updateDocType, { id, name, contentTypes, iconUrl });
}

//添加文档
export const addDoc = (doc: DocForm) => {
  return HttpService.post<RootObject<Doc>>(UrlService.addDoc, doc)
}
//更新文档
export const updateDoc = (doc: DocForm) => {
  return HttpService.post<RootObject<Doc>>(UrlService.updateDoc, doc)
}

//删除文档
export const delDoc = (id: number) => {
  return HttpService.get<RootObject<Doc>>(UrlService.delDoc, { id })
}

//获取某类型的文档
export const getDocByType = (type: number, contentType: string, page: number) => {
  return HttpService.get<RootObject<Doc[]>>(UrlService.getDocByType, { type, contentType, page })
}