import { Doc, DocForm, DocType, DocTypeForm } from "@/types/doc";
import { HttpService, RootObject } from "../until/httpService";
import { UrlService } from "./ur.base";
//获取所有文档类型
export const getDocTypeList = () => {
	return HttpService.get<RootObject<DocType[]>>(UrlService.docTypeList);
};

//添加文档类型
export const addDocType = (payload: DocTypeForm) => {
	return HttpService.post<RootObject<DocType>>(UrlService.addDocType, {
		...payload,
	});
};

//更新文档类型
export const updateDocType = (payload: DocTypeForm) => {
	return HttpService.post<RootObject<DocType>>(UrlService.updateDocType, {
		...payload,
	});
};

export const enableDocType = (id: number, disabled: number) => {
	return HttpService.get<RootObject<boolean>>(UrlService.enableDocType, {
		id,
		disabled,
	});
};

//添加文档
export const addDoc = (doc: DocForm) => {
	return HttpService.post<RootObject<Doc>>(UrlService.addDoc, doc);
};
//更新文档
export const updateDoc = (doc: DocForm) => {
	return HttpService.post<RootObject<Doc>>(UrlService.updateDoc, doc);
};

//删除文档
export const delDoc = (id: number) => {
	return HttpService.get<RootObject<Doc>>(UrlService.delDoc, { id });
};

//查询文档
export const getDocById = (id: number) => {
	return HttpService.get<RootObject<Doc>>(UrlService.getDocById, { id });
};

//获取某类型的文档
export const getDocByType = (
	type: number,
	contentType: string,
	page: number
) => {
	return HttpService.get<RootObject<Doc[]>>(UrlService.getDocByType, {
		type,
		contentType,
		page,
	});
};
