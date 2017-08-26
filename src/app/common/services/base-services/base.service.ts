import { Injector }             from '@angular/core';
import { ConfigService }		from '../config/config.service';

export abstract class BaseService {
    protected config: any;

    constructor(injector: Injector) {
        this.config = <any>injector.get(ConfigService).get();
    }
}