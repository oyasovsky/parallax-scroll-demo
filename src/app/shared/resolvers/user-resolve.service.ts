import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { UserService }					from 'common/services/user/user.service';
import * as USER_DETAILS_INTERFACES 	from 'common/models/user/iuser.model';
import * as AppResponse 				from 'common/models/baseResponse/baseResponse.model';


@Injectable()
export class UserResolve implements Resolve<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.IUser>> {

	constructor(private _userService: UserService,
				private router: Router) {}

	resolve(route: ActivatedRouteSnapshot):any{
		return this._userService.getUserByToken().map((response: AppResponse.BaseResponse<USER_DETAILS_INTERFACES.IUser>) => {
			if (response.statusCode === AppResponse.StatusCode.OK) {
				return response;
			}
		})
		.first()
		.catch((res: AppResponse.BaseResponse<USER_DETAILS_INTERFACES.IUser>) => {
			// Handle the resolver error
			this.router.navigate(['/OooooPS']);
			return Observable.create( observer => {
				observer.next({});
				observer.complete();
			});
		});
	}
}


