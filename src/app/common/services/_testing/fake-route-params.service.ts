import {
    RouteParamsService,
    IRouteParams,
    IRouteParamsService
} from '../route/route-params.service';

import { Resolve } from '@angular/router';

export class FakeRouteParamsService implements IRouteParamsService,Resolve<IRouteParams> {    
    public mockData: IRouteParams = {
        namespace: 'team/user',
        project: 'first-project'
    };

    get(){
        return this.mockData;
    };

    resolve(route){
        return this.mockData;
    }
}