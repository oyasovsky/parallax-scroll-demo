import { NgModule }		from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent }			from './component/footer.component';
import { SystemStatusComponent }	from './features/system-status/component/system-status.component';

@NgModule({
	declarations: [
		FooterComponent,
		SystemStatusComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		FooterComponent
	]
})

export class FooterModule {}