import { Component, DebugElement, NO_ERRORS_SCHEMA }	from '@angular/core';
import { ComponentFixture, TestBed, async, inject }		from '@angular/core/testing';
import { Router, ActivatedRoute }						from '@angular/router';
import { By }              								from '@angular/platform-browser';
import { Observable } 									from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { HttpModule }			from '@angular/http';
import { FormsModule } 			from '@angular/forms';

import { LoginComponent }		from './login.component';

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
    template: '<flow-login></flow-login>'
})
class TestComponent {
}


describe('FlowLoginComponent', () => {
  
	let component: LoginComponent;
	let fixture: ComponentFixture<TestComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule, FormsModule ],
			declarations: [ TestComponent, LoginComponent, RouterLinkStubDirective, RouterLinkActiveStubDirective ],
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


	it('should call to login function on login button click', inject([UserService], (userService) => {
		spyOn(userService, 'login').and.callThrough();
		let buttonElement = fixture.debugElement.query(By.css('.login-btn-wrapper button'));
		buttonElement.nativeElement.click();
	    expect(userService.login).toHaveBeenCalled();
	}));


	it('should navigate to default root "\/" after succesful login', inject([UserService, Router], (userService, router) => {
		spyOn(router, 'navigate');
		component.redirectUrl = null;
		component.login();
	    expect(router.navigate).toHaveBeenCalledWith(['/']);	
	}));


	it('should redirect to requested url after succesful login', inject([UserService, Router], (userService, router) => {
		spyOn(router, 'navigate');
		component.login();
	    expect(router.navigate).toHaveBeenCalledWith(['testRedirectUrl']);	
	}));	


	it('should navigate to default root "\/" when already in session', inject([UserService, Router], (userService, router) => {
		spyOn(router, 'navigate');
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.debugElement.children[0].componentInstance;
		fixture.detectChanges();		
	    expect(router.navigate).toHaveBeenCalledWith(['/']);		
	}));


	it('should getInitialAuthParams when there\'s no session', inject([UserService, Router], (userService, router) => {
		spyOn(userService, 'getInitialAuthParams').and.callThrough();;
		userService.mockData.checkSession.is_session_expired = true;
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.debugElement.children[0].componentInstance;
		fixture.detectChanges();
	    expect(userService.getInitialAuthParams).toHaveBeenCalled();
	}));
});