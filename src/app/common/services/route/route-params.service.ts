import { Injectable }			from '@angular/core';
import { Resolve, Params }      from '@angular/router';

export interface IRouteParams {
	project: string;
	namespace: string;
}

export interface IRouteParamsService{
	get();
}

@Injectable()
export class RouteParamsService implements IRouteParamsService,Resolve<IRouteParams> {
	params: IRouteParams;

	constructor(){
		
	}

	resolve(route){
		return this.params = <IRouteParams>route.params;
	}

	get(){
		return this.params;
	}
}
