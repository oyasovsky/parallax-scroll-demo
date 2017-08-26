import { NgModule } from '@angular/core';

// import { <directive> } from './<feature>/<feature.directive>';

const ANGULAR_DIRECTIVES: any[] = [
  // <directive>,
];

@NgModule({
  declarations: ANGULAR_DIRECTIVES,
  exports: ANGULAR_DIRECTIVES
})

export class DirectivesModule { }