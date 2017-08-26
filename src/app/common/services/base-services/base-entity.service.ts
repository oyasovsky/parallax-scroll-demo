import { Injector }                     from '@angular/core';
import { Headers, RequestOptionsArgs }  from '@angular/http';

import { UserService }  from '../user/user.service';
import { BaseService }  from './base.service';

export abstract class BaseEntityService extends BaseService {
    
    protected userService: UserService;
    
    requestOptions: RequestOptionsArgs;

    constructor(injector: Injector) {
        super(injector);

        this.initServices(injector);

        this.initRequestOptions();
    }

    private initServices(injector: Injector): void {
        this.userService = injector.get(UserService);
    }

    private initRequestOptions(): void {
        let headers = new Headers();
        headers.append('X-CSRF-Token', this.userService.getCsrfToken());
        headers.append('Accept', 'application/json');
        headers.append('X-Ui-Referer', 'true');

        this.requestOptions = {
            headers: headers,
            withCredentials: true
        };
    }

}
