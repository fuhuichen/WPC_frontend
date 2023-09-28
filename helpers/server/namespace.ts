/**
 * Interface for Configuration
 */
export interface IConfig {
    protocol: 'http' | 'https';
    hostname: string;
    port: number;
}

/**
 * Interface for Server Result Error
 */
export interface IServerResultError {
    statusCode?: number;
    message: any;
}

/**
 * Interface for Server Result
 */
export interface IServerResult<T> {
    result: T;
    error?: IServerResultError;
}

/**
 *
 */
export interface IPagingResponse<T> {
    paging: {
        total: number;
        totalPages: number;
        page: number;
        pageSize: number;
    };
    errorcode?: number;
    error_msg?: string;
    results: T[];
}

/**
 *
 */
export interface IServerInfoResponse {
    backend: string;
    platform: string;
    os: string;
    engine: string;
}

/**
 *
 */
export interface IWebLoginRequest {
    username: string;
    password: string;
}

/**
 *
 */
export interface IWebLoginResponse {
    token: string;
    type: string;
    userId: string;
    name: string;
}

/**
 *
 */
export interface IDetectiveRecordsRequest extends IDataList {
    qrCodeNumberList?: string[];
    location?: object;
    type?: object;
    bgName?: object;
    sectorName?: object;
    site?: string[];
    courseName?: string[];
}

/**
 *
 */
export interface IDetectiveRecordsReponse {
    objectId: string;
    date: Date;
    cameraName: string;
    cameraType: string;
    labelName: string;
    labelImageSrc: string;
    snapshotSrc: string;
}

/**
 *
 */
export enum ESort {
    Ascending,
    Descending,
}

/**
 *
 */
export interface ISorting {
    field: string;
    order: ESort;
}

/**
 *
 */
export interface IPaging {
    page?: number;
    pageSize?: number;
}

/**
 *
 */
export interface IDataList {
    paging?: IPaging;
    sorting?: ISorting;
    keyword?: string;
}

/**
 * Interface for Account R Response
 */
export interface IAccountRResponse {
    objectId: string;
    username: string;
    name: string;
    email: string;
    role: string;
}

/**
 * Interface for Source Camera R Response
 */
export interface IUserListRResponse {
    email: string;
    name: string;
    type: string;
    userId: string;
    note?: string;
}

export interface ILocationListRResponse {
    name: string;
    siteId: string;
    point: number;
    type: string;
    locationName: string;
}

export interface ICourseListRResponse {
    courseId: string;
    name: string;
    date: string;
    time: string;
    bgName: string;
    sectorName: string;
    point: number;
}
