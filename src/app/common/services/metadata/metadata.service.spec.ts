import { TestBed, async, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { HttpProxyService } from '../proxies/httpproxy/httpProxy.service';
import { LogService }       from '../log/log.service';
import { ConfigService }    from '../config/config.service';
import { UserService }      from '../user/user.service';

import { MetadataService }      from './metadata.service';
import { FakeMetadataService }  from '../_testing/fake-metadata.service';


describe('MetadataService', () => {

    let _config = require ('../../../../config.json');

    let _initMockBackendResponse = (mockBackend, fakeMetadataService) => {
        const responses = {};
        responses['systemAppVersion'] = new Response(new ResponseOptions({body: JSON.stringify(fakeMetadataService.systemAppVersion)}));
        responses['systemStatusPage'] = new Response(new ResponseOptions({body: JSON.stringify(fakeMetadataService.systemStatusPage)}));
        responses['user'] = new Response(new ResponseOptions({body: JSON.stringify(fakeMetadataService.user)}));
        responses['config'] = new Response(new ResponseOptions({body: JSON.stringify(fakeMetadataService.config)}));

        let getResponseType = (url) => {
            let sRes;
            if (url.indexOf(_config.api.metadata.system.app_version) > -1){
                sRes = 'systemAppVersion';
            } else if(url.indexOf(_config.api.metadata.system.status_page) > -1){
                sRes = 'systemStatusPage';
            } else if(url.indexOf(_config.api.metadata.user.get) > -1){
                sRes = 'user';
            } else if(url.indexOf(_config.api.metadata.config) > -1){
                sRes = 'config';
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
                HttpProxyService,
                LogService,
                ConfigService,
                UserService,
                MetadataService,
                FakeMetadataService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
    });

    beforeEach(inject([ConfigService],
        (configService) => {
            spyOn(configService, 'get').and.returnValue(_config);
        }
    ));

    describe('getUserMetadata()', () => {
        it(`should call REST API: ${_config.api.route}${_config.api.metadata.user.get}`,
            inject([MetadataService, XHRBackend, FakeMetadataService], (metadataService, mockBackend, fakeMetadataService) => {
                let _url;

                _initMockBackendResponse(mockBackend, fakeMetadataService);

                mockBackend.connections.subscribe((connection) => {
                    _url = connection.request.url;
                });

                metadataService.getUserMetadata().subscribe((data) => {
                    expect(_url).toBe(`${_config.api.route}${_config.api.metadata.user.get}`);
                });
            }));
    });


    describe('getAppVersion()', () => {
        it(`should call REST API: ${_config.api.route}${_config.api.metadata.system.app_version}`,
            inject([MetadataService, XHRBackend, FakeMetadataService], (metadataService, mockBackend, fakeMetadataService) => {
                let _url;

                _initMockBackendResponse(mockBackend, fakeMetadataService);

                mockBackend.connections.subscribe((connection) => {
                    _url = connection.request.url;
                });

                metadataService.getAppVersion().subscribe((data) => {
                    expect(_url).toBe(`${_config.api.route}${_config.api.metadata.system.app_version}`);
                });
            }));
    });


    describe('getSystemStatus()', () => {
        it(`should call REST API: ${_config.api.route}${_config.api.metadata.system.status_page}`,
            inject([MetadataService, XHRBackend, FakeMetadataService], (metadataService, mockBackend, fakeMetadataService) => {
                let _url;

                _initMockBackendResponse(mockBackend, fakeMetadataService);

                mockBackend.connections.subscribe((connection) => {
                    _url = connection.request.url;
                });

                metadataService.getSystemStatus().subscribe((data) => {
                    expect(_url).toBe(`${_config.api.route}${_config.api.metadata.system.status_page}`);
                });
            }));
    });

});

