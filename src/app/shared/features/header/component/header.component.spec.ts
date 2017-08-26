import {
    Component,
    DebugElement,
    NO_ERRORS_SCHEMA
}   from '@angular/core';

import {
    ComponentFixture,
    TestBed,
    async
}   from '@angular/core/testing';

import { HeaderModule }     from 'shared/features/header/header.module';

@Component({
    selector: 'as-test',
    template: '<app-header></app-header>'
})

class TestComponent {}

describe('FlowHeaderComponent', () => {

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    //TestBed.compileComponents returns a promise, so use async to wait for resolving
    beforeEach(async(() => {
        TestBed.configureTestingModule({            
            declarations: [ TestComponent ],
            imports: [ HeaderModule ],
            // Tells the compiler not to error on unknown elements and attributes
            // schemas: [ NO_ERRORS_SCHEMA ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);   // create component
        component = fixture.componentInstance;              // create component instance    
        fixture.detectChanges();                            // trigger initial data binding
    });

    it('should have been created successfully', () => {                 
        expect(component).toBeDefined();
    });

});
