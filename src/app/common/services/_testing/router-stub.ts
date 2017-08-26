// export for convenience.
export {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet  
} from '@angular/router';

import { Component, Directive, Injectable, Input, HostListener } from '@angular/core';
import { NavigationEnd, NavigationExtras } from '@angular/router';

// Only implements params and part of snapshot.params
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

@Directive({
  selector: '[routerLink]',
})

export class RouterLinkStubDirective {
  @Input('routerLink') routerLink: any;
  navigatedTo: any = null;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.navigatedTo = this.routerLink;
  }
}

@Directive({
  selector: '[routerLinkActive]',  
})

export class RouterLinkActiveStubDirective {
  @Input('routerLinkActive') routerLinkActive: any;
}

@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent { }

@Injectable()
export class RouterStub {

  private eventsSubject = new BehaviorSubject(this.testEvents);
  events = this.eventsSubject.asObservable();
  // Test parameters
  private _testEvents: {};

  navigate(commands: any[], extras?: NavigationExtras) { }

  get testEvents() {
    return this._testEvents;
  }

  set testEvents(events: {}) {
    this._testEvents = events;
    this.eventsSubject.next(events);
  }
}

@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.params is Observable
  private paramsSubject = new BehaviorSubject(this.testParams);
  params = this.paramsSubject.asObservable();
  // Test parameters
  private _testParams: {};

  // ActivatedRoute.data is Observable
  private dataSubject = new BehaviorSubject(this.testData);
  data = this.dataSubject.asObservable();
  // Test parameters
  private _testData: {};

  get testParams()
  {
    return this._testParams;
  }

  set testParams(params: {}) {
    this._testParams = params;
    this.paramsSubject.next(params);
  }

  get testData() {
    return this._testData;
  }

  set testData(data: {}) {
    this._testData = data;
    this.dataSubject.next(data);
  }

  // ActivatedRoute.snapshot.params
  get snapshot() {
    return { params: this.testParams };
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/