import { APP_INITIALIZER, Injector }    from '@angular/core';
import { ConfigService }                from 'common/services/config/config.service';

export const AppInitializer = {
    provide: APP_INITIALIZER,
    useFactory: (injector: Injector) => () => {
    return new Promise((resolve, reject) => {
            let config = <ConfigService>injector.get(ConfigService);
            config.load().then(() => {
                resolve(true);
        });
        
    });
},
    deps:[ Injector ],
    multi: true
};