export class UrlService {
	// private static baseUrl = "/api";
	public static baseUrl = import.meta.env.VITE_BASE_URL;
	public static loginUrl = UrlService.baseUrl + "login"; //登陆
	public static getUserInfo = UrlService.baseUrl + "userInfo"; // 获取用户信息
	public static registerUser = UrlService.baseUrl + "registerUser"; // 注册用户
	public static getUsers = UrlService.baseUrl + "users"; //获取用户
	public static setUserStatus = UrlService.baseUrl + "user/status"; //禁用or启用用户
	public static getUserSearchOptions = UrlService.baseUrl + "user/search"; // 获取用户搜索项

	public static docTypeList = UrlService.baseUrl + "getTypeList"; //获取所有文档类型
	public static addDocType = UrlService.baseUrl + "addWxtype"; //添加文档类型
	public static updateDocType = UrlService.baseUrl + "updateWxtype"; //更新文档类型
	public static enableDocType = UrlService.baseUrl + "enableDocType"; // 启用or禁用

	public static addDoc = UrlService.baseUrl + "addWxLearnInfo"; //添加文档
	public static updateDoc = UrlService.baseUrl + "updateWxLearnInfo"; //更新文档
	public static delDoc = UrlService.baseUrl + "delDoc"; //删除文档
	public static getDocById = UrlService.baseUrl + "getDocById"; //查询文档
	public static getDocByType = UrlService.baseUrl + "getDocByType"; //获取某类型的文档
}
