import { Injectable }                               from '@angular/core';
import {
    Http,
    Response,
    Headers,
    RequestOptionsArgs
}  from '@angular/http';

import { Observable }                               from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import * as _ 									    from 'lodash';

import { IProxyService }    from 'common/interfaces/proxies/httpproxy/ihttpProxy.service';
import * as AppResponse     from 'common/models/baseResponse/baseResponse.model';
import { LogService }       from  'common/services/log/log.service';

class HttpVerb {
    static POST = 'post';
    static GET = 'get';
    static PUT = 'put';
    static DELETE = 'delete';
}

class URLUtils {

    public static  isResourceOptional = (resource:string):boolean => {
        return (resource.substr(-1) === '?');
    }

    public static  formatURL = (templateUrl:string, resMap:any):string => {

        let retUrl:string = templateUrl;

        // This RegEx matches all resources and params which exist in the template URL
        // For example : www.myurl.com/current/:res1/:res2/:res3?/:res4
        // Will match: : [:res1, :res2, :res3?, :res4]

        // let patternRes = /\/:([a-zA-Z0-9]+)|&?:([a-zA-Z0-9]+\??)/g;
        let patternForResources = /\/:([a-zA-Z0-9]+)/g;
        let patternForParams = /&?:([a-zA-Z0-9]+\??)/g;
        let match;

        let templateUrlPlacements:Array<string> = new Array<string>();

        let constUrl = retUrl;

        // For Resources
        while (match = patternForResources.exec(constUrl)) {

            if (match.length === 2) {

                let resource = match[1];

                if (resMap[resource] != null) {
                    retUrl = retUrl.replace(':' + resource, resMap[resource]);
                }
            }
        }

        constUrl = retUrl.slice(retUrl.indexOf('?'));

        // For Params
        while (match = patternForParams.exec(constUrl)) {

            if (match.length === 2) {
                templateUrlPlacements.push(match[1]);
            }
        }

        templateUrlPlacements.forEach((resource:string) => {

            let isOptional = URLUtils.isResourceOptional(resource);

            if (resMap[resource] != null) {
                retUrl = retUrl.replace(':' + resource, (isOptional ? resource.substring(0, resource.length - 1) : resource) + '=' + resMap[resource]);
            }
            else if (isOptional) {
                // If not optional we do not replace because we want to show the user has made
                // a mistake and didn't provide all mandatory resources for the URL.
                retUrl = retUrl.replace(':' + resource, '');
            }
        });
        //in case more than one optional and only the second optional was hit - remove the redundet amp
        retUrl = retUrl.replace('?&', '?');
        return retUrl;
    }

}

@Injectable()
export class HttpProxyService implements IProxyService {

    constructor(private http: Http, private logger: LogService) {
    }

    public get<T>(route: string, params?: any): Observable<AppResponse.BaseResponse<T>> {
        let url: string = this._buildUrl(route, params);

        let observed: Observable<AppResponse.BaseResponse<T>> = this._httpCall<T>(route, HttpVerb.GET, params);

        return observed;
    }

    
    public getEx<T>(route: string, params?: any, options?: RequestOptionsArgs): Observable<AppResponse.BaseResponse<T>> {
        let url: string = this._buildUrl(route, params);

        let observed: Observable<AppResponse.BaseResponse<T>> = this._httpCall<T>(route,
            HttpVerb.GET,
            params,
            null,
            options
        );

        return observed;
    }

    public post<T>(route: string, data?: any, params?: any, options?: RequestOptionsArgs): Observable<AppResponse.BaseResponse<T>> {
        return this._httpCall<T>(route, HttpVerb.POST, params, data,  options);
    }

    public put<T>(route: string, data: any, params?: any, options?: RequestOptionsArgs): Observable<AppResponse.BaseResponse<T>> {
        return this._httpCall<T>(route, HttpVerb.PUT, params, data, options);
    }

    public delete<T>(route: string, data: any, params?: any, options?: RequestOptionsArgs): Observable<AppResponse.BaseResponse<T>> {
        return this._httpCall<T>(route, HttpVerb.DELETE, params, data, options);
    }

    private _httpCall<T>(route:string, verb:string, params?:any, data?:any, options?: RequestOptionsArgs): Observable<AppResponse.BaseResponse<T>>{

        let url = this._buildUrl(route, params);

        let reqObserv =  this._isRequestBodyNeeded(verb) ? this.http[verb](url, data, options) : this.http[verb](url, options);

        return reqObserv.map((res: Response) => {

                let body = res.json();
                let result = body || {};

                let responseT = new AppResponse.BaseResponse<T>();
                responseT.statusCode = AppResponse.StatusCode.OK;

                if (_.has(result, 'data')) {
                    responseT.result = result.data;
                    responseT.error = result.error;
                    responseT.notice = result.notice;
                    
                } else {
                    responseT.result = result;
                }
                return responseT;

            })
            .catch((res: Response) => {
                this.logger.log('HttpProxyService::_httpCall', 'verb: {0} - ERROR', verb);

                let responseT = new AppResponse.BaseResponse<T>();
                responseT.statusCode = this._mapHttpCodeToApplicationStatusCode(res.status);
                try {
                    let result = res.json() || {};
                    responseT.result = result.data;
                    responseT.error = result.error;
                    responseT.notice = result.notice;
                } 
                catch(err) {
                    responseT.error = <any>res.text();
                }

                return Observable.throw(responseT);
            });
    }

    private _isRequestBodyNeeded(verb){
        return (!(verb === HttpVerb.GET || verb === HttpVerb.DELETE));
    }

    private _buildUrl(route: string, params: any): string{
        return URLUtils.formatURL(route, params);
    }

    private _mapHttpCodeToApplicationStatusCode(httpResponseCode: AppResponse.HTTPResponseCode): AppResponse.StatusCode {
        let appStatus: AppResponse.StatusCode;
        switch (httpResponseCode) {
            case AppResponse.HTTPResponseCode.CLIENT_ABORTED:
                appStatus = AppResponse.StatusCode.REQUEST_ABORTED;
                break;
            case AppResponse.HTTPResponseCode.CLIENT_TIMEOUT:
                appStatus = AppResponse.StatusCode.REQUEST_TIMEOUT;
                break;
            case AppResponse.HTTPResponseCode.OK:
                appStatus = AppResponse.StatusCode.OK;
                break;
            case AppResponse.HTTPResponseCode.BAD_REQUEST:
                appStatus = AppResponse.StatusCode.BAD_REQUEST;
                break;
            case AppResponse.HTTPResponseCode.UNAUTHORIZED:
                appStatus = AppResponse.StatusCode.UNAUTHORIZED;
                break;
            case AppResponse.HTTPResponseCode.FORBIDDEN:
                appStatus = AppResponse.StatusCode.PRECONDITION_FAILED;
                break;
            case AppResponse.HTTPResponseCode.NOT_FOUND:
                appStatus = AppResponse.StatusCode.RESOURCE_NOT_FOUND;
                break;
            case AppResponse.HTTPResponseCode.PRECONDITION_FAILED:
                //IMPORTANT:due to web junction interversion, treat PRECONDITION_FAILED(412) as UNAUTHORIZED(401)
                //for now on PRECONDITION_FAILED will be mapped to Unauthorized StatusCodes on the application level
                appStatus = AppResponse.StatusCode.UNAUTHORIZED;
                break;
            case AppResponse.HTTPResponseCode.CONFLICT:
                appStatus = AppResponse.StatusCode.CONFLICT;
                break;
            case AppResponse.HTTPResponseCode.SERVER_ERROR:
                appStatus = AppResponse.StatusCode.PROVIDER_ERROR;
                break;
            case AppResponse.HTTPResponseCode.SERVICE_UNAVAILABLE:
                appStatus = AppResponse.StatusCode.PROVIDER_UNAVAILABLE;
                break;
            default:
                appStatus = AppResponse.StatusCode.UNEXPECTED_ERROR;
        }

        return appStatus;
    }

}
