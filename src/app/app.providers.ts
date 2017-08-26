import { UserService }		        from 'common/services/user/user.service';
import { ConfigService }		    from 'common/services/config/config.service';

import { MetadataService }			from 'common/services/metadata/metadata.service';
import { RouteParamsService }		from 'common/services/route/route-params.service';
import { UtilsService }				from 'common/services/utils/utils.service';
import { HttpProxyService }         from 'common/services/proxies/httpproxy/httpProxy.service';
import { LogService }               from 'common/services/log/log.service';

import { MobileViewGuardService } 	from 'shared/guards/mobile-view-guard.service';
import { AppGuardService }			from 'shared/guards/app-guard.service';
import { WebStorageService }        from 'common/services/utils/web-storage.service';

export const APP_PROVIDERS = [
    UserService,
    ConfigService,
    MetadataService,
    RouteParamsService,
    UtilsService,
    HttpProxyService,
    LogService,
    MobileViewGuardService,
    AppGuardService,
    WebStorageService
];