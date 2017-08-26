import { Injectable }			from '@angular/core';
import { HttpProxyService	}	from 'common/services/proxies/httpproxy/httpProxy.service';

@Injectable()
export class ConfigService {
	private _config: any;

	constructor(private _httpProxy: HttpProxyService){}

	load(): any {
		return new Promise((resolve, reject) => {
			this._httpProxy.get('config.json').subscribe((response) => {
				this._config = response.result;
				resolve(true);
			});
		});
	}

	get(): any {
		return this._config;
	}
}
