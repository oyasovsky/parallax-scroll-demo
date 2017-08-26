import { TestBed, async, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend,
    RequestMethod,
    Headers,
    RequestOptionsArgs,
    ResponseType
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import * as AppResponse     from 'common/models/baseResponse/baseResponse.model';
import { HttpProxyService } from './httpProxy.service';
import { LogService }       from '../../log/log.service';

interface IDummy{
    dummy: string;
}

describe('HttpProxyService', () => {
    let _requestOptions:RequestOptionsArgs;
    let _config = {
        api: {
            route: 'http://dummy.com/',
            get:'get',
            post:'post',
            put:'update',
            delete:'delete',
            error: 'error'
        }
    };


    let _initMockBackendResponse = (mockBackend, errCode?) => {
        const responses = {};
        responses['dummy'] = new Response(new ResponseOptions({body: JSON.stringify({dummy :'dummy_str'})}));
        responses['error'] = new Response(new ResponseOptions({type:ResponseType.Error,body: JSON.stringify({dummy :'dummy_str'}),status: errCode}));

        let getResponseType = (url) => {
            let sRes = 'dummy';

            if (url.indexOf(_config.api.error) > -1) {
                sRes = 'error';
            }
            return sRes;
        };

        mockBackend.connections.subscribe((connection) => {
            if (getResponseType(connection.request.url) === 'error'){
                connection.mockError(responses['error']);
            }else {
                connection.mockRespond(responses[getResponseType(connection.request.url)]);
            }
        });
    };

    let _initRequestOptions = () =>{
        let headers = new Headers();
        headers.append('X-CSRF-Token', 'CSRF_TOKE_STR');
        headers.append('Accept', 'application/json');
        headers.append('X-Ui-Referer', 'true');

        _requestOptions = {
            headers: headers,
            withCredentials: true
        };
    };

    beforeEach(() => {
        _initRequestOptions();

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                HttpProxyService,
                LogService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
    });

    beforeEach(inject([LogService],
        (logService) => {
            spyOn(logService, 'log');
        }
    ));

    describe('get(route, params?)', () => {
        it(`should request following URL by GET method: ${_config.api.route}${_config.api.get}`,
            inject([HttpProxyService, XHRBackend], (HttpProxyService, mockBackend) => {
                let _url,_method;

                _initMockBackendResponse(mockBackend);

                mockBackend.connections.subscribe((connection) => {
                    _url = connection.request.url;
                    _method = connection.request.method;
                });

                HttpProxyService.get(`${_config.api.route}${_config.api.get}`).subscribe((res) => {
                    expect(_url).toBe(`${_config.api.route}${_config.api.get}`);
                    expect(_method).toBe(RequestMethod.Get);
                });
            }));

        it(`should return as observable AppResponse.BaseResponse: ${_config.api.route}${_config.api.get}`,
            inject([HttpProxyService, XHRBackend], (HttpProxyService, mockBackend) => {
                _initMockBackendResponse(mockBackend);

                HttpProxyService.get(`${_config.api.route}${_config.api.get}`).subscribe((res) => {
                    expect(res instanceof AppResponse.BaseResponse).toBe(true);
                });
            }));
    });
    describe('getEx(route, params?, options?)', () => {
        it(`should request following URL by GET method: ${_config.api.route}${_config.api.get}`,
            inject([HttpProxyService, XHRBackend], (HttpProxyService, mockBackend) => {
                let _url,_method;

                _initMockBackendResponse(mockBackend);

                mockBackend.connections.subscribe((connection) => {
                    _url = connection.request.url;
                    _method = connection.request.method;
                });

                HttpProxyService.getEx(`${_config.api.route}${_config.api.get}`).subscribe((res) => {
                    expect(_url).toBe(`${_config.api.route}${_config.api.get}`);
                    expect(_method).toBe(RequestMethod.Get);
                });
            }));

        it(`should return as observable AppResponse.BaseResponse: ${_config.api.route}${_config.api.get}`,
            inject([HttpProxyService, XHRBackend], (HttpProxyService, mockBackend) => {
                _initMockBackendResponse(mockBackend);

                HttpProxyService.getEx(`${_config.api.route}${_config.api.get}`).subscribe((res) => {
                    expect(res instanceof AppResponse.BaseResponse).toBe(true);
                });
            }));
        it(`should request with transfered options: ${_config.api.route}${_config.api.get}`,
            inject([HttpProxyService, XHRBackend], (HttpProxyService, mockBackend) => {
                let _headers;
                _initMockBackendResponse(mockBackend);

                mockBackend.connections.subscribe((connection) => {
                    _headers = connection.request.headers;
                });

                HttpProxyService.getEx(`${_config.api.route}${_config.api.get}`, null, _requestOptions).subscribe((res) => {
                    expect(_headers.keys().length).toBe(_requestOptions.headers.keys().length);
                });
            }));

    });
    describe('post(route, data?, params?, options?)', () => {
        it(`should request following URL by POST method: ${_config.api.route}${_config.api.post}`,
            inject([HttpProxyService, XHRBackend], (HttpProxyService, mockBackend) => {
                let _url,_method;

                _initMockBackendResponse(mockBackend);

                mockBackend.connections.subscribe((connection) => {
                    _url = connection.request.url;
                    _method = connection.request.method;
                });

                HttpProxyService.post(`${_config.api.route}${_config.api.post}`).subscribe((res) => {
                    expect(_url).toBe(`${_config.api.route}${_config.api.post}`);
                    expect(_method).toBe(RequestMethod.Post);
                });
            }));

        it(`should return as observable AppResponse.BaseResponse: ${_config.api.route}${_config.api.post}`,
            inject([HttpProxyService, XHRBackend], (HttpProxyService, mockBackend) => {
                _initMockBackendResponse(mockBackend);

                HttpProxyService.post(`${_config.api.route}${_config.api.post}`).subscribe((res) => {
                    expect(res instanceof AppResponse.BaseResponse).toBe(true);
                });
            }));

        it(`should request with transfered options: ${_config.api.route}${_config.api.post}`,
            inject([HttpProxyService, XHRBackend], (HttpProxyService, mockBackend) => {
                let _headers;
                _initMockBackendResponse(mockBackend);

                mockBackend.connections.subscribe((connection) => {
                    _headers = connection.request.headers;
                });

                HttpProxyService.post(`${_config.api.route}${_config.api.post}`, null, null, _requestOptions).subscribe((res) => {
                    expect(_headers.keys().length).toBe(_requestOptions.headers.keys().length);
                });
            }));

    });
    describe('put(route, data, params?, options?)', () => {
        it(`should request following URL by PUT method: ${_config.api.route}${_config.api.put}`,
            inject([HttpProxyService, XHRBackend], (HttpProxyService, mockBackend) => {
                let _url,_method;

                _initMockBackendResponse(mockBackend);

                mockBackend.connections.subscribe((connection) => {
                    _url = connection.request.url;
                    _method = connection.request.method;
                });

                HttpProxyService.put(`${_config.api.route}${_config.api.put}`,null).subscribe((res) => {
                    expect(_url).toBe(`${_config.api.route}${_config.api.put}`);
                    expect(_method).toBe(RequestMethod.Put);
                });
            }));

        it(`should return as observable AppResponse.BaseResponse: ${_config.api.route}${_config.api.put}`,
            inject([HttpProxyService, XHRBackend], (HttpProxyService, mockBackend) => {
                _initMockBackendResponse(mockBackend);

                HttpProxyService.put(`${_config.api.route}${_config.api.put}`,null).subscribe((res) => {
                    expect(res instanceof AppResponse.BaseResponse).toBe(true);
                });
            }));

        it(`should request with transfered options: ${_config.api.route}${_config.api.put}`,
            inject([HttpProxyService, XHRBackend], (HttpProxyService, mockBackend) => {
                let _headers;
                _initMockBackendResponse(mockBackend);

                mockBackend.connections.subscribe((connection) => {
                    _headers = connection.request.headers;
                });

                HttpProxyService.post(`${_config.api.route}${_config.api.put}`, null, null, _requestOptions).subscribe((res) => {
                    expect(_headers.keys().length).toBe(_requestOptions.headers.keys().length);
                });
            }));

    });
    describe('delete(route, data, params?, options?)', () => {
        it(`should request following URL by DELERE method: ${_config.api.route}${_config.api.delete}`,
            inject([HttpProxyService, XHRBackend], (HttpProxyService, mockBackend) => {
                let _url,_method;

                _initMockBackendResponse(mockBackend);

                mockBackend.connections.subscribe((connection) => {
                    _url = connection.request.url;
                    _method = connection.request.method;
                });

                HttpProxyService.delete(`${_config.api.route}${_config.api.delete}`,null).subscribe((res) => {
                    expect(_url).toBe(`${_config.api.route}${_config.api.delete}`);
                    expect(_method).toBe(RequestMethod.Delete);
                });
            }));

        it(`should return as observable AppResponse.BaseResponse: ${_config.api.route}${_config.api.delete}`,
            inject([HttpProxyService, XHRBackend], (HttpProxyService, mockBackend) => {
                _initMockBackendResponse(mockBackend);

                HttpProxyService.delete(`${_config.api.route}${_config.api.delete}`,null).subscribe((res) => {
                    expect(res instanceof AppResponse.BaseResponse).toBe(true);
                });
            }));

        it(`should request with transfered options: ${_config.api.route}${_config.api.delete}`,
            inject([HttpProxyService, XHRBackend], (HttpProxyService, mockBackend) => {
                let _headers;
                _initMockBackendResponse(mockBackend);

                mockBackend.connections.subscribe((connection) => {
                    _headers = connection.request.headers;
                });

                HttpProxyService.delete(`${_config.api.route}${_config.api.put}`, null, null, _requestOptions).subscribe((res) => {
                    expect(_headers.keys().length).toBe(_requestOptions.headers.keys().length);
                });
            }));

    });

    describe('handle request Errors', () => {

        it(`should throw observable AppResponse.BaseResponse in a result of ALL failure responses: ${_config.api.route}${_config.api.get}`,
            inject([HttpProxyService, XHRBackend, LogService], (HttpProxyService, mockBackend,LogService) => {
                for(let code in AppResponse.HTTPResponseCode) {
                    if ((<any>AppResponse.HTTPResponseCode).hasOwnProperty(code)) {
                        _initMockBackendResponse(mockBackend, +code);
                        HttpProxyService.get(`${_config.api.route}${_config.api.error}`).subscribe((res) => {

                        }, (res) => {
                            expect(res instanceof AppResponse.BaseResponse).toBe(true);
                            expect(LogService.log).toHaveBeenCalled();
                        });

                    }
                }
            }));


    });
});

