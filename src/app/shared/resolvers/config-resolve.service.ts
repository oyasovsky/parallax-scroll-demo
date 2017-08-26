import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { ConfigService }	from 'common/services/config/config.service';
import * as AppResponse 	from 'common/models/baseResponse/baseResponse.model';

@Injectable()
export class ConfigResolve implements Resolve<{}> {
	constructor(
		private _configService: ConfigService,
		private router: Router
	) {}

    resolve(route: ActivatedRouteSnapshot): Promise<{}>{
		return this._configService.load();
	}
}