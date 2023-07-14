import { UserInfo } from "@/types/user";
import { HttpService, RootObject } from "../until/httpService";
import { UrlService } from "./ur.base";
export const login = (username: string, password: string) => {
	return HttpService.post<RootObject<{ token: string; userInfo: UserInfo }>>(
		UrlService.loginUrl,
		{
			username,
			password,
		}
	);
};

export const getUserInfo = (token: string) => {
	return HttpService.post<RootObject<UserInfo>>(UrlService.getUserInfo, {
		token,
	});
};

export const registerUser = (
	username: string,
	password: string,
	name: string
) => {
	return HttpService.post<RootObject<UserInfo>>(UrlService.registerUser, {
		username,
		password,
		name,
	});
};
