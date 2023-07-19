import { UserInfo, UserSearchOption } from "@/types/user";
import { HttpService, RootObject } from "@/until/httpService";
import { UrlService } from "./ur.base";

export const getUsers = (
	page: number,
	limit: number = 10,
	where: { [key in keyof UserInfo]?: number | string | string[] }
) => {
	return HttpService.post<RootObject<UserInfo[]>>(UrlService.getUsers, {
		page,
		limit,
		where,
	});
};

export const setUserStatus = (userId: number, status: number) => {
	return HttpService.get<RootObject<UserInfo[]>>(UrlService.setUserStatus, {
		userId,
		status,
	});
};

export const getUserSearchOptions = () => {
	return HttpService.get<RootObject<UserSearchOption>>(
		UrlService.getUserSearchOptions
	);
};
