import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as AppResponse 			                from 'common/models/baseResponse/baseResponse.model';
import * as USER_DETAILS_INTERFACES                 from 'common/models/user/iuser.model';
import { FakeSuccessResponse, FakeErrorResponse }   from 'common/services/_testing/response-stub';
import { IMetadataService } 		                from 'common/interfaces/metadata/imetadata.service';
import { ISystemStatus }                            from 'common/models/systemStatus/isystemStatus.model';

export class FakeMetadataService implements IMetadataService {
    public isError: Boolean = false;
    public mockData = {
        user: {
            roles: {
                '1': 'Developer',
                '2': 'Pro',
                '3': 'Enterprise',
                '4': 'Staff'
            },
            running_containers: 0
        },
        systemAppVersion: '0.0.1',
        systemStatusPage: {
            'indicator': '{"indicator":"none","description":"All Systems Operational"}',
            'description': 'THIS IS FAKE SYSTEM STATUS'
        },
        config: {
            'someKey1': 'someValue1',
            'someKey2': 'someValue2'
        }
    };

    getUserMetadata(): Observable<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.IUserMetadata>> {
        let res;
        if (!this.isError){
            res = new FakeSuccessResponse(this.mockData.user);
            return Observable.of(res);
        } else {            
            return Observable.throw(new FakeErrorResponse());
        }
    };

    getAppVersion(): Observable<AppResponse.BaseResponse<string>> {
        let res;
        if (!this.isError){
            res = new FakeSuccessResponse(this.mockData.systemAppVersion);
            return Observable.of(res);
        } else {            
            return Observable.throw(new FakeErrorResponse());
        }   
    };

    getSystemStatus(): Observable<AppResponse.BaseResponse<ISystemStatus>>{
        let res;
        if (!this.isError){
            res = new FakeSuccessResponse(this.mockData.systemStatusPage);
            return Observable.of(res);
        } else {            
            return Observable.throw(new FakeErrorResponse());
        }   
    }
}