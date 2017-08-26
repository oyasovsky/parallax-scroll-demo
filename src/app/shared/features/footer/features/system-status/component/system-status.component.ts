import { Component ,OnInit }		from '@angular/core';

import * as AppResponse 			from 'common/models/baseResponse/baseResponse.model';
import { MetadataService }			from 'common/services/metadata/metadata.service';
import { ISystemStatus }			from 'common/models/systemStatus/isystemStatus.model';

@Component({
	selector: 'system-status',
	templateUrl: './system-status.component.html',
	styleUrls: ['./system-status.component.scss'],
})

export class SystemStatusComponent implements OnInit {
	statusJson: ISystemStatus;

	constructor(
		private metadataService: MetadataService
	){	}

	ngOnInit() {
		this.metadataService.getSystemStatus().subscribe((response: AppResponse.BaseResponse<ISystemStatus>) => {
			//@TODO - get the data as JSON from BackEnd and don't parse it here.
			this.statusJson = response.result;
		});
	}
}
