import { Observable }           from 'rxjs/Rx';
import { RequestOptionsArgs }   from '@angular/http';

import * as AppResponse from 'common/models/baseResponse/baseResponse.model';

export interface IProxyService {
    get<T>(uri: string, params?: any): Observable<AppResponse.BaseResponse<T>>;
    getEx<T>(route: string, params?: any, options?: RequestOptionsArgs): Observable<AppResponse.BaseResponse<T>>;
    post<T>(uri: string, data?: any, params?: any, options?: RequestOptionsArgs): Observable<AppResponse.BaseResponse<T>>;
    put<T>(uri: string, data: any, params?: any, options?: RequestOptionsArgs): Observable<AppResponse.BaseResponse<T>>;
    delete<T>(uri: string, data: any, params?: any, options?: RequestOptionsArgs): Observable<AppResponse.BaseResponse<T>>;
}
