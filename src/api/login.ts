import { HttpService, RootObject } from "../until/httpService";
import { UrlService } from "./ur.base";
export const login = (username: string, password: string) => {
  return HttpService.post<RootObject<string>>(UrlService.loginUrl, { username, password });
}

export const getUserInfo = () => {
  return HttpService.get<RootObject<null>>(UrlService.getUserInfo)
}