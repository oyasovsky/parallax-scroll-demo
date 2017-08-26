import { Component, DebugElement, NO_ERRORS_SCHEMA }	from '@angular/core';
import { ComponentFixture, TestBed, async, inject }		from '@angular/core/testing';
import { Router, ActivatedRoute }						from '@angular/router';
import { By }              								from '@angular/platform-browser';
import { Observable } 									from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { HttpModule }			from '@angular/http';
import { FormsModule } 			from '@angular/forms';

import { SplashComponent }		from './splash.component';

import { LogService } 			from 'common/services/log/log.service';
import { UserService }			from 'common/services/user/user.service';
import { FakeUserService }		from 'common/services/_testing/fake-user.service';
import {
	RouterStub,
	ActivatedRouteStub,
	RouterLinkStubDirective,
	RouterLinkActiveStubDirective,
} from 'common/services/_testing/router-stub';


@Component({
    selector: 'as-test',
    template: '<splash></splash>'
})
class TestComponent {
}


describe('SplashComponent', () => {
  
	let component: SplashComponent;
	let fixture: ComponentFixture<TestComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule, FormsModule ],
			declarations: [ TestComponent, SplashComponent, RouterLinkStubDirective, RouterLinkActiveStubDirective ],
			providers: [
				LogService,
			    { provide: UserService, useClass: FakeUserService },
				{ provide: ActivatedRoute, useClass: ActivatedRouteStub },    
			    { provide: Router, useClass: RouterStub },
			],
			schemas: [NO_ERRORS_SCHEMA]
		})
		.compileComponents();
	}));

	beforeEach(inject([
			UserService,
			Router
		], (
			userService,
			router
		) => {

		fixture = TestBed.createComponent(TestComponent);					// create component
		component = fixture.debugElement.children[0].componentInstance;		// create component instance from first child - the real component
		fixture.detectChanges();											// trigger initial data binding

	}));


	it('should have been created successfully', () => { 
	    expect(component).toBeDefined();
	});


});