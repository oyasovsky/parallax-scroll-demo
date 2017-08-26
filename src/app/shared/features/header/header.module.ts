import { NgModule }		from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }	from '@angular/router';

import { HeaderComponent }	from './component/header.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [
		HeaderComponent,
	],
	exports: [
		HeaderComponent
	]
})

export class HeaderModule {}