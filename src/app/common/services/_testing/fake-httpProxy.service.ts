import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as AppResponse 		from 'common/models/baseResponse/baseResponse.model';
import { RequestOptionsArgs }   from '@angular/http';
import { IProxyService }    	from 'common/interfaces/proxies/httpproxy/ihttpProxy.service';

export class FakeHttpProxyService implements IProxyService {
    public isError: Boolean = false;
    public statusCode: string;
    public mockResponse: any;

    private _ERROR_RESPONSE: AppResponse.BaseResponse<any> = {
		statusCode: AppResponse.StatusCode.BAD_REQUEST,
		result: {},
		error: 'ERROR',
		notice: null,
		headers: null 
	};

	constructor(data){
		this.mockResponse = data;
	}

    public get<T>(route: string, params?: any): Observable<AppResponse.BaseResponse<T>> {
        let res;

		if (!this.isError){
			res = {
				statusCode: this.statusCode || AppResponse.StatusCode.OK,
				result: this.mockResponse
			};

        	return Observable.of(res);
		} else {			
			return Observable.throw(this._ERROR_RESPONSE);
		}
    }
    
    public getEx<T>(route: string, params?: any, options?: RequestOptionsArgs): Observable<AppResponse.BaseResponse<T>> {
        let res;

		if (!this.isError){
			res = {
				statusCode: this.statusCode || AppResponse.StatusCode.OK,
				result: this.mockResponse
			};

        	return Observable.of(res);
		} else {			
			return Observable.throw(this._ERROR_RESPONSE);
		}
    }

    public post<T>(route: string, data?: any, params?: any, options?: RequestOptionsArgs): Observable<AppResponse.BaseResponse<T>> {
        let res;

		if (!this.isError){
			res = {
				statusCode: this.statusCode || AppResponse.StatusCode.OK,
				result: this.mockResponse
			};

        	return Observable.of(res);
		} else {			
			return Observable.throw(this._ERROR_RESPONSE);
		}
    }

    public put<T>(route: string, data: any, params?: any, options?: RequestOptionsArgs): Observable<AppResponse.BaseResponse<T>> {
        let res;

		if (!this.isError){
			res = {
				statusCode: this.statusCode || AppResponse.StatusCode.OK,
				result: this.mockResponse
			};

        	return Observable.of(res);
		} else {			
			return Observable.throw(this._ERROR_RESPONSE);
		}
    }

    public delete<T>(route: string, data: any, params?: any, options?: RequestOptionsArgs): Observable<AppResponse.BaseResponse<T>> {
        let res;

		if (!this.isError){
			res = {
				statusCode: this.statusCode || AppResponse.StatusCode.OK,
				result: this.mockResponse
			};

        	return Observable.of(res);
		} else {			
			return Observable.throw(this._ERROR_RESPONSE);
		}
    }
}