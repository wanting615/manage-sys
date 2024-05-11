import { HttpService } from '@/until/httpService';
import { UrlService } from './ur.base';
import { LogItem } from '@/types/log';

export const getLogs = (page: number, limit: number) => {
  return HttpService.post<ApiResponseData<LogItem[]>>(UrlService.getLogs, {
    page,
    limit
  });
};
