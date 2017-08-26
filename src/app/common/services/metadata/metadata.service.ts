import { Injectable, Injector }		from '@angular/core';
import {
	Http,
	Headers,
	RequestOptions,
	Response
}	from '@angular/http';

import { Router } 	from '@angular/router';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import * as _ 						from 'lodash';
import * as AppResponse 			from 'common/models/baseResponse/baseResponse.model';
import * as USER_DETAILS_INTERFACES from 'common/models/user/iuser.model';
import { ISystemStatus } 			from 'common/models/systemStatus/isystemStatus.model';
import { IMetadataService } 		from 'common/interfaces/metadata/imetadata.service';
import { BaseEntityService } 		from '../base-services/base-entity.service';
import { HttpProxyService } 		from '../proxies/httpproxy/httpProxy.service';

@Injectable()

export class MetadataService extends BaseEntityService implements IMetadataService {
	
	constructor(
		private injector: Injector,
		private httpProxy: HttpProxyService
	){
		super(injector);
	}

	getUserMetadata(): Observable<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.IUserMetadata>> {
		let path = `${this.config.api.route}${this.config.api.metadata.user.get}`;
		return this.httpProxy.getEx<USER_DETAILS_INTERFACES.IUserMetadata>(path, {}, this.requestOptions);
	}

	getAppVersion(): Observable<AppResponse.BaseResponse<string>> {
		let path = `${this.config.api.route}${this.config.api.metadata.system.app_version}`;
		return this.httpProxy.getEx<string>(path, {}, this.requestOptions);
	}

	getSystemStatus(): Observable<AppResponse.BaseResponse<ISystemStatus>>{
		let path = `${this.config.api.route}${this.config.api.metadata.system.status_page}`;
		return this.httpProxy.getEx<ISystemStatus>(path, {}, this.requestOptions)
			.map((response: AppResponse.BaseResponse<ISystemStatus>) => {
				
                try {
                    response.result = <ISystemStatus>(JSON.parse(response.result.toString()));
                } 
                catch(err) {
                    response.result = <ISystemStatus>null;
                }

				return response;
			});

	}
}