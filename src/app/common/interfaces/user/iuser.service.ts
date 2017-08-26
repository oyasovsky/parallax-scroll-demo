import { Observable } from 'rxjs/Rx';

import * as USER_DETAILS_INTERFACES     from 'common/models/user/iuser.model';
import * as AppResponse                 from 'common/models/baseResponse/baseResponse.model';

export interface IUserService{

        checkSession(): Observable<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.ICheckSession>> ;
       
        getInitialAuthParams(): Observable<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.IInitialAuthParams>> ;  
        
        getCsrfToken(): string ;
        
        login(credentials: USER_DETAILS_INTERFACES.ICredentials, csrf_token: string): Observable<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.ILoginResponse>> ;
        
        getUserByToken(force?: boolean): Observable<AppResponse.BaseResponse<USER_DETAILS_INTERFACES.IUser>> ;
        
        logout(): void ;
}