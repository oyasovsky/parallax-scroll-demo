import { TestBed, async, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend, RequestMethod
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { HttpProxyService } from '../proxies/httpproxy/httpProxy.service';
import { LogService } from '../log/log.service';
import { ConfigService } from '../config/config.service';

import { UserService } from './user.service';
import { FakeUserService } from '../_testing/fake-user.service';


describe('UserService', () => {
    let _config = require ('../../../../config.json');

    let _initMockBackendResponse = (mockBackend, fakeUserService) => {
        const responses = {};
        responses['check_session'] = new Response(new ResponseOptions({body: JSON.stringify(fakeUserService.mockData.checkSession)}));
        responses['sign_in'] = new Response(new ResponseOptions({body: JSON.stringify(fakeUserService.mockData.loginResponse)}));
        responses['users/user'] = new Response(new ResponseOptions({body: JSON.stringify(fakeUserService.mockData.user)}));


        responses['get'] = new Response(new ResponseOptions({body: '{}'}));
        responses['add'] = new Response(new ResponseOptions({body: '{}'}));
        responses['remove'] = new Response(new ResponseOptions({body: '{}'}));

        let getResponseType = (url) => {
            let sRes = 'get';

            if (url.indexOf(_config.api.projects.favorite.add) > -1){
                sRes = 'add';
            }else if(url.indexOf(_config.api.projects.favorite.remove) > -1){
                sRes = 'remove';
            }else if(url.indexOf('check_session') > -1){
                sRes = 'check_session';
            }else if(url.indexOf('sign_in') > -1){
                sRes = 'sign_in';
            }else if(url.indexOf('users/user') > -1){
                sRes = 'users/user';
            }


            return sRes;
        };

        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(responses[getResponseType(connection.request.url)]);
        });
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                UserService,
                HttpProxyService,
                LogService,
                ConfigService,
                FakeUserService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
    });

    beforeEach(inject([ConfigService],
        (configService) => {
            spyOn(configService, 'get').and.returnValue(_config);
        }
    ));

    describe('checkSession()', () => {
        it(`should call REST API: ${_config.api.route}users/check_session`,
            inject([UserService, XHRBackend, FakeUserService], (userService, mockBackend, fakeUserService) => {
                let _url;

                _initMockBackendResponse(mockBackend,fakeUserService);

                mockBackend.connections.subscribe((connection) => {
                    _url = connection.request.url;
                });

                userService.checkSession().subscribe((res) => {
                    expect(_url).toBe(`${_config.api.route}users/check_session`);
                });
            }));
    });

    describe('getCsrfToken()', () => {
        it(`should store CSRF token after checkSession() call`,
            inject([UserService, XHRBackend, FakeUserService], (userService, mockBackend, fakeUserService) => {
                let _url;

                _initMockBackendResponse(mockBackend,fakeUserService);

                userService.checkSession().subscribe((res) => {
                    expect(userService.getCsrfToken()).toBe(fakeUserService.mockData.loginResponse.csrf_token);
                });
            }));


    });

    describe('getInitialAuthParams()', () => {
        it(`should call REST API: ${_config.api.route}${_config.api.login.get} (GET)`,
            inject([UserService, XHRBackend, FakeUserService], (userService, mockBackend, fakeUserService) => {
                let _url, _method;

                _initMockBackendResponse(mockBackend,fakeUserService);

                mockBackend.connections.subscribe((connection) => {
                    _url = connection.request.url;
                    _method  = connection.request.method;
                });

                userService.getInitialAuthParams().subscribe((res) => {
                    expect(_url).toBe(`${_config.api.route}${_config.api.login.get}`);
                    expect(_method).toBe(RequestMethod.Get);
                });
            }));
    });

    describe('login(credentials, csrf_token)', () => {
        it(`should call REST API: ${_config.api.route}${_config.api.login.post} (POST)`,
            inject([UserService, XHRBackend, FakeUserService], (userService, mockBackend, fakeUserService) => {
                let _url, _method;

                _initMockBackendResponse(mockBackend,fakeUserService);

                mockBackend.connections.subscribe((connection) => {
                    _url = connection.request.url;
                    _method  = connection.request.method;
                });

                userService.login(fakeUserService.mockData.credentials, fakeUserService.mockData.csrf_token).subscribe((res) => {
                    expect(_url).toBe(`${_config.api.route}${_config.api.login.post}`);
                    expect(_method).toBe(RequestMethod.Post);
                });
            }));
        it(`should store CSRF token`,
            inject([UserService, XHRBackend, FakeUserService], (userService, mockBackend, fakeUserService) => {
                let _url;

                _initMockBackendResponse(mockBackend,fakeUserService);

                userService.login(fakeUserService.mockData.credentials, fakeUserService.mockData.csrf_token).subscribe((res) => {
                    expect(userService.getCsrfToken()).toBe(fakeUserService.mockData.loginResponse.csrf_token);
                });
            }));
    });

    describe('getUserByToken(force?)', () => {
        it(`should call REST API: ${_config.api.route}${_config.api.user.get}`,
            inject([UserService, XHRBackend, FakeUserService], (userService, mockBackend, fakeUserService) => {
                let _url;

                _initMockBackendResponse(mockBackend,fakeUserService);

                mockBackend.connections.subscribe((connection) => {
                    _url = connection.request.url;
                });

                userService.getUserByToken(true).subscribe((res) => {
                    expect(_url).toBe(`${_config.api.route}${_config.api.user.get}`);
                });
            }));
        it(`should use cashed favorites after initial call(NO additional REST API call)`,
            inject([UserService, XHRBackend, FakeUserService], (userService, mockBackend, fakeUserService) => {
                const mockResponse = fakeUserService.mockData.user;

                let mockHttpResponser = {
                    handler: (connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockResponse)
                        })));
                    }};

                spyOn(mockHttpResponser, 'handler').and.callThrough();

                mockBackend.connections.subscribe(mockHttpResponser.handler);

                userService.getUserByToken(true).subscribe((res) => {
                    userService.getUserByToken(false).subscribe((res1) => {
                        expect((<any>mockHttpResponser.handler).calls.count()).toBe(1);
                    });
                });
            }));
    });
    describe('logout()', () => {
        it(`should call REST API: ${_config.api.route}${_config.api.logout.delete}`,
            inject([UserService, XHRBackend, FakeUserService], (userService, mockBackend, fakeUserService) => {
                let _url;

                _initMockBackendResponse(mockBackend,fakeUserService);

                mockBackend.connections.subscribe((connection) => {
                    _url = connection.request.url;
                });

                userService.logout().subscribe((res) => {
                    expect(_url).toBe(`${_config.api.route}${_config.api.logout.delete}`);
                });
            }));
    });

});

