import * as AppResponse from 'common/models/baseResponse/baseResponse.model';

export class FakeSuccessResponse {
    statusCode: number;
    result: any;
    error: any;
    notice: any;
    constructor(data: any = {}){
        this.statusCode = AppResponse.StatusCode.OK;
        this.result = data;
        this.error = null;
        this.notice = null;
    }
}

export class FakeErrorResponse {
    statusCode: number;
    result: any;
    error: any;
    notice: any;
    constructor(data: any = {}){
        this.statusCode = AppResponse.StatusCode.BAD_REQUEST;
        this.result = data;
        this.error = 'ERROR';
        this.notice = null;
    }
}


