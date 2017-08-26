import { Component, OnInit }    		from '@angular/core';
import { Router, ActivatedRoute }		from '@angular/router';

import { UserService }					from 'common/services/user/user.service';
import { BaseComponent } 				from 'common/components/base-component/base.component';
import * as USER_DETAILS_INTERFACES 	from 'common/models/user/iuser.model';
import * as AppResponse 				from 'common/models/baseResponse/baseResponse.model';
import { LogService } 					from 'common/services/log/log.service';

import 'rxjs/add/operator/retry';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent extends BaseComponent implements OnInit  {

	model: USER_DETAILS_INTERFACES.ICredentials;
	loading = false;
	redirectUrl: string;
	error = '';
	csrf_token: string;

	constructor(
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router,
		private  _logger: LogService
	) {
		super();
	}

	ngOnInit() {
		this.model = <USER_DETAILS_INTERFACES.ICredentials>{};
		this.redirectUrl = this.userService.redirectUrl;
		this.userService.checkSession().subscribe(
			(response: AppResponse.BaseResponse<USER_DETAILS_INTERFACES.ICheckSession>) => {
				if (response.result.is_session_expired) {
					this.userService.getInitialAuthParams()
						.subscribe( (res: AppResponse.BaseResponse<USER_DETAILS_INTERFACES.IInitialAuthParams>) => {
							this.csrf_token = res.result.csrf_token;
					});

				}
				else {
					this.router.navigate([this.CONSTANTS.ROUTES.ROOT]);
				}
			});
	}

	login() {
		this.userService.login(this.model, this.csrf_token)
			.subscribe((response: AppResponse.BaseResponse<USER_DETAILS_INTERFACES.ILoginResponse>) => {
				if (response.result.user) {
					this.router.navigate([this.redirectUrl ? this.redirectUrl : this.CONSTANTS.ROUTES.ROOT]);
				}
			});
	}
}
