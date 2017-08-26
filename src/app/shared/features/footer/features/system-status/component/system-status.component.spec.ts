import { Component, DebugElement, NO_ERRORS_SCHEMA } 	from '@angular/core';
import { ComponentFixture, TestBed, async } 			from '@angular/core/testing';
import { By }              								from '@angular/platform-browser';

import { HttpModule } 					from '@angular/http';
import { SystemStatusComponent } 		from './system-status.component';
import { ConfigService }				from 'common/services/config/config.service';

@Component({
    selector: 'as-test',
    template: '<system-status></system-status>'
})

class TestComponent {}

describe('SystemStatusComponent', () => {
    let configServiceStub = {};
    let configService;

    let component: SystemStatusComponent;
    let fixture: ComponentFixture<SystemStatusComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    //TestBed.compileComponents returns a promise, so use async to wait for resolving
    beforeEach(async(() => {
        TestBed.configureTestingModule({            
            imports: [ HttpModule ],
            declarations: [ TestComponent, SystemStatusComponent ],
            providers: [
                ConfigService, 
                // {provide: ConfigService, useValue: configServiceStub }
            ]
        }).compileComponents();;

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SystemStatusComponent);   // create component
        component = fixture.componentInstance;                      // create component instance    
        fixture.detectChanges();                                    // trigger initial data binding
    });

    it('should have been created successfully', () => {                 
        expect(component).toBeDefined();
    });
});