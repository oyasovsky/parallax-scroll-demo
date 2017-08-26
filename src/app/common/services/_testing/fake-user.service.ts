import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { IUserService }                             from 'common/interfaces/user/iuser.service';
import * as USER_DETAILS_INTERFACES                 from 'common/models/user/iuser.model';
import * as AppResponse 				            from 'common/models/baseResponse/baseResponse.model';
import { FakeSuccessResponse, FakeErrorResponse }   from 'common/services/_testing/response-stub';

export class FakeUserService implements IUserService {
        
    public isError: Boolean = false;
    public mockData = {
        user: {
            id: 1,
            name: 'user:name',
            username: 'user:username',
            role_id: 4,
            admin: true,
            avatar: {
                url: ''
            }
		},
        csrf_token: 'sample_csrf_token',
        credentials: {
            username: 'username',
            password: 'password'
        },
        initialAuthParams: {
            csrf_token: 'qwertyuiopasdfghjkd'
        },
        checkSession: {
            is_session_expired: false,
            session_expire_at: 123456789,
            csrf_token: 'qwertyuiopasdfghjkd'
        },
        loginResponse: {
            user: {
                id: 1,
                name: 'user:name',
                username: 'user:username',
                role_id: 4,
                admin: true,
                avatar: {
                    url: ''
                }
            },
            csrf_token: 'qwertyuiopasdfghjkd'
        } 
    };

    public redirectUrl = 'testRedirectUrl';


    checkSession(): Observable<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.ICheckSession>> {
        let res;
        if (!this.isError){
            res = new FakeSuccessResponse(this.mockData.checkSession);
            return Observable.of(res);
        } else {            
            return Observable.throw(new FakeErrorResponse());
        }
    }

    getInitialAuthParams(): Observable<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.IInitialAuthParams>> {
        let res;
        if (!this.isError){
            res = new FakeSuccessResponse(this.mockData.initialAuthParams);
            return Observable.of(res);
        } else {            
            return Observable.throw(new FakeErrorResponse());
        }
    };  

    getCsrfToken(): string {
        return this.mockData.csrf_token;
    };

    login(credentials: USER_DETAILS_INTERFACES.ICredentials, csrf_token: string): Observable<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.ILoginResponse>>{
        let res;
        if (!this.isError){
            res = new FakeSuccessResponse(this.mockData.loginResponse);
            return Observable.of(res);
        } else {            
            return Observable.throw(new FakeErrorResponse());
        }
    };

    getUserByToken(force?): any {
        let res;
		if (!this.isError){
            res = new FakeSuccessResponse(this.mockData.user);
            return Observable.of(res);
		} else {			
			return Observable.throw(new FakeErrorResponse());
		}
    };

    logout() {
        let res;
		if (!this.isError){
            res = new FakeSuccessResponse({});
        	return Observable.of(res);
		} else {			
			return Observable.throw(new FakeErrorResponse());
		}
    };

}