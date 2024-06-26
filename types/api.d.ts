/** 所有 api 接口的响应数据都应该准守该格式 */
interface ApiResponseData<T> {
  message: string;
  status: boolean;
  data: T;
  [propName: string]: any;
}
declare let process: any;
