export class UrlService {
	// private static baseUrl = "/api";
	public static baseUrl = import.meta.env.VITE_BASE_URL;
	public static loginUrl = UrlService.baseUrl + "/login"; //登陆
	public static getUserInfo = UrlService.baseUrl + "/userInfo"; // 获取用户信息
	public static registerUser = UrlService.baseUrl + "/user/register"; // 注册用户
	public static getUsers = UrlService.baseUrl + "/users"; //获取用户
	public static setUserStatus = UrlService.baseUrl + "/user/status"; //禁用or启用用户
	public static getUserSearchOptions = UrlService.baseUrl + "/user/search"; // 获取用户搜索项

	public static docTypeList = UrlService.baseUrl + "/type/list"; //获取所有文档类型
	public static contetnList = UrlService.baseUrl + '/content/list'; // 获取所有文档内容类型
	public static addDocType = UrlService.baseUrl + "/add/type"; //添加文档类型
	public static updateDocType = UrlService.baseUrl + "/update/type"; //更新文档类型
	public static enableDocType = UrlService.baseUrl + "/enable/type"; // 启用or禁用

	public static addDoc = UrlService.baseUrl + "/add/doc"; //添加文档
	public static updateDoc = UrlService.baseUrl + "/update/doc"; //更新文档
	public static delDoc = UrlService.baseUrl + "/del/doc"; //删除文档
	public static getDocById = UrlService.baseUrl + "/getDocById"; //查询文档
	public static getDocByType = UrlService.baseUrl + "/getDocByType"; //获取某类型的文档

	public static getLogs = UrlService.baseUrl + "/logs" //获取日志
}
