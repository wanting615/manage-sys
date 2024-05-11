import { UserInfo } from "@/types/user";
import { HttpService } from "../until/httpService";
import { UrlService } from "./ur.base";
export const login = (username: string, password: string) => {
	return HttpService.post<ApiResponseData<{ token: string; userInfo: UserInfo }>>(
		UrlService.loginUrl,
		{
			username,
			password,
		}
	);
};

export const getUserInfoApi = (token: string) => {
	return HttpService.post<ApiResponseData<UserInfo>>(UrlService.getUserInfo, {
		token,
	});
};

export const registerUser = (
	username: string,
	password: string,
	name: string
) => {
	return HttpService.post<ApiResponseData<UserInfo>>(UrlService.registerUser, {
		username,
		password,
		name,
	});
};
