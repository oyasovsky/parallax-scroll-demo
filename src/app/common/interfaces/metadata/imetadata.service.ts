import { Observable } from 'rxjs/Rx';

import * as AppResponse 			from 'common/models/baseResponse/baseResponse.model';
import * as USER_DETAILS_INTERFACES from 'common/models/user/iuser.model';
import { ISystemStatus }            from 'common/models/systemStatus/isystemStatus.model';


export interface IMetadataService{
    getUserMetadata(): Observable<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.IUserMetadata>>;
    getAppVersion(): Observable<AppResponse.BaseResponse<string>>;
    getSystemStatus(): Observable<AppResponse.BaseResponse<ISystemStatus>>;
}
