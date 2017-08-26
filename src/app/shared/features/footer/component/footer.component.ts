import { Component, OnInit }		from '@angular/core';
import { MetadataService }			from 'common/services/metadata/metadata.service';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
	appVersion: string;

	constructor(
		private metadataService: MetadataService
	){ }

	ngOnInit() {
		this.metadataService.getAppVersion().subscribe(response => {
			this.appVersion = response.result;
		});
	}
}
