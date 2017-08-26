    export enum StatusCode {
        OK,
        UNAUTHORIZED,
        PRECONDITION_FAILED,
        UNEXPECTED_ERROR,
        RESOURCE_NOT_FOUND,
        PROVIDER_ERROR,
        PROVIDER_UNAVAILABLE,
        CONFLICT,
        BAD_REQUEST,
        REQUEST_ABORTED,
        REQUEST_TIMEOUT,

    }

    export enum HTTPResponseCode {
        // $http error codes
        CLIENT_ABORTED = -1,
        CLIENT_TIMEOUT = 0,
        // native HTTP error codes
        OK = 200,
        BAD_REQUEST = 400,
        UNAUTHORIZED = 401,
        FORBIDDEN = 403,
        NOT_FOUND = 404,
        PRECONDITION_FAILED = 412,
        CONFLICT = 409,
        SERVER_ERROR = 500,
        SERVICE_UNAVAILABLE = 503
    }

    export interface HeaderObject {
        [name: string]: string;
    }

    export class BaseResponse<T>{
        public statusCode: StatusCode;
        public result: T;
        public error: string;
        public notice: string;
        public headers: HeaderObject;
    }

    export class PagingResponse<T> extends BaseResponse<T>{
        public totalCount: number;
        public currentPageCount: number;
        public startIndex: number;
        public pageCount: number;
    }
