import { Injectable, Injector }        from '@angular/core';
import { Headers }	from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { LocalStorage } from 'ngx-webstorage';

import * as USER_DETAILS_INTERFACES from 'common/models/user/iuser.model';
import * as AppResponse 			from 'common/models/baseResponse/baseResponse.model';
import { IUserService } 			from 'common/interfaces/user/iuser.service';
import { HttpProxyService } 		from '../proxies/httpproxy/httpProxy.service';
import { BaseService } 				from '../base-services/base.service';


@Injectable()
export class UserService extends BaseService implements IUserService {
	redirectUrl: string;
	
	private _csrf_token: string;
	private _headers: any;
	private _withCredentials = true;

	@LocalStorage()
	private _userDataResponse: AppResponse.BaseResponse<USER_DETAILS_INTERFACES.IUser>;

	constructor(
		private httpProxy: HttpProxyService,
		injector: Injector
	){
		super(injector);
		this._headers = new Headers();
		this._headers.append('Accept', 'application/json');
		this._headers.append('X-Ui-Referer', 'true');
	}

	// checkSession checks if there's an open session for the current gitlab_session cookie
	checkSession(): Observable<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.ICheckSession>> {
		return this.httpProxy.getEx(
				`${this.config.api.route}users/check_session`, 
				null,
				{headers: this._headers, withCredentials: this._withCredentials})
			.map((response: AppResponse.BaseResponse<USER_DETAILS_INTERFACES.ICheckSession>) => {
				this.csrfToken = response.result.csrf_token;
				// @TODO - YANIV - if session expired - delete singed_in cookie
				// deleteCookie();
				return response;
			});

		
	}

	// get initial params for login page:  (1)csrf_token in response (2)session cookie from response header 
	getInitialAuthParams(): Observable<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.IInitialAuthParams>> {
		return this.httpProxy.getEx(`${this.config.api.route}${this.config.api.login.get}`,
			null,
			{headers: this._headers,withCredentials: this._withCredentials});
	}

	login(credentials: USER_DETAILS_INTERFACES.ICredentials, csrf_token: string): Observable<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.ILoginResponse>> {
		
		let formData = new FormData();
		formData.append('user[login]', credentials.username);
		formData.append('user[password]', credentials.password);
		formData.append('authenticity_token', csrf_token);

		return this.httpProxy.post<USER_DETAILS_INTERFACES.ILoginResponse>(
			`${this.config.api.route}${this.config.api.login.post}`,
			formData, 
			null,
			{headers: this._headers,withCredentials: this._withCredentials})
		.map((response: AppResponse.BaseResponse<USER_DETAILS_INTERFACES.ILoginResponse>) => {
			if (!response.error) {
				this._userDataResponse = {
					statusCode: AppResponse.StatusCode.OK,
					result: response.result.user,
					error: response.error,
					notice: response.notice,
					headers: null // this._headers
				};
				this.csrfToken = response.result.csrf_token;
			}

			return response;
		});

	}

	getUserByToken(force?: boolean): Observable<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.IUser>> {
		
		if (!this._userDataResponse || force) {

			let urlPattern =`${this.config.api.route}${this.config.api.user.get}`;

			return this.httpProxy.getEx<USER_DETAILS_INTERFACES.IUser>(urlPattern, null, {headers: this._headers,withCredentials: this._withCredentials})
				.map((response: AppResponse.BaseResponse<USER_DETAILS_INTERFACES.IUser>) => {
					this._userDataResponse = {
						statusCode: AppResponse.StatusCode.OK,
						result: response.result,
						error: response.error,
						notice: response.notice,					
						headers: null // this._headers
					};

					return response;
			});
			
		} else {
			return Observable.create(observer => {
				observer.next(this._userDataResponse);
				//call complete if you want to close this stream (like a promise)
				observer.complete();
			});
		}
	}
	
	logout() {
		this._userDataResponse = null;
		return this.httpProxy.delete(`${this.config.api.route}${this.config.api.logout.delete}`, null, null, {headers: this._headers,withCredentials: this._withCredentials});
	}

	getCsrfToken(): string {
		return this.csrfToken;
	}

	private get csrfToken(): string {
        return this._csrf_token;
    }

	private set csrfToken(val) {
        this._csrf_token = val;
        this._headers.set('X-CSRF-Token', val);
    }

}
