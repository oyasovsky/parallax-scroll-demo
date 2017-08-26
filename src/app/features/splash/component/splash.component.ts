import { Component, OnInit }    		from '@angular/core';
import { Router, ActivatedRoute }		from '@angular/router';

import { UserService }					from 'common/services/user/user.service';
import { BaseComponent } 				from 'common/components/base-component/base.component';
import * as AppResponse 				from 'common/models/baseResponse/baseResponse.model';
import { LogService } 					from 'common/services/log/log.service';

import 'rxjs/add/operator/retry';

@Component({
	selector: 'splash',
	templateUrl: './splash.component.html',
	styleUrls: ['./splash.component.scss'],
})

export class SplashComponent extends BaseComponent implements OnInit  {

	error = '';

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private  _logger: LogService
	) {
		super();
	}

	ngOnInit() {
	}

}
