
import { Injectable }				from '@angular/core';
import {
	Router,
	CanActivate,
  	CanActivateChild,
  	ActivatedRouteSnapshot,
	  RouterStateSnapshot
}	from '@angular/router';

import { Observable }				from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { UserService }				from 'common/services/user/user.service';

import { CONSTANTS } 				from 'shared/constant/index';
import * as USER_DETAILS_INTERFACES from 'common/models/user/iuser.model';
import * as AppResponse 			from 'common/models/baseResponse/baseResponse.model';


@Injectable()
export class AppGuardService implements CanActivate, CanActivateChild {
	private _redirectUrl: string;

	constructor(
		private router: Router,
		private userService: UserService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		this._redirectUrl = state.url;
		return this._checkSession();

	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		
		this._redirectUrl = state.url;
		return this._checkSession();
	}

	// if session expired - save redirect url and navigate to login page
	private _onSessionExpired() {
		this.userService.redirectUrl = this._redirectUrl;
		this.router.navigate([`${CONSTANTS.ROUTES.AUTHENTICATION}/${CONSTANTS.ROUTES.LOGIN}`]);
	}

	private _checkSession(){
		// CASE: USER Not Authenticated
		this._onSessionExpired();
		return Observable.of(false);

		// CASE: USER Authenticated
		// return Observable.of(true);

		// return this.userService.checkSession().map( (response: AppResponse.BaseResponse<USER_DETAILS_INTERFACES.ICheckSession>) => {
		// 	if (response.result.is_session_expired) {
		// 		this._onSessionExpired();
		// 	} 
		// 	return !response.result.is_session_expired;
		// }).catch((res) => {
		// 	this._onSessionExpired();
		// 	return Observable.of(false);
		// });
	}
}