
export class UrlService {
  // private static baseUrl = "/api";
  public static baseUrl = import.meta.env.VITE_BASE_URL;
  public static loginUrl = UrlService.baseUrl + "loginWx";//登陆
  public static getUserInfo = UrlService.baseUrl + 'userInfo'; // 获取用户信息

  public static docTypeList = UrlService.baseUrl + 'getTypeList';//获取所有文档类型
  public static addDocType = UrlService.baseUrl + 'addWxtype';//添加文档类型
  public static updateDocType = UrlService.baseUrl + "updateWxtype"; //更新文档类型

  public static addDoc = UrlService.baseUrl + 'addWxLearnInfo';//添加文档
  public static updateDoc = UrlService.baseUrl + 'updateWxLearnInfo';//更新文档
  public static delDoc = UrlService.baseUrl + 'delDoc';//删除文档
  public static getDocByType = UrlService.baseUrl + "getDocByType";//获取某类型的文档

}