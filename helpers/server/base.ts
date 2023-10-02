import HttpClient, { AxiosError, ResponseType as AxiosResponseType } from 'axios';

import { DateTimeService } from '@/../helpers';
import { RegexService, UserService } from '@/helpers';

import * as ServerNameSpace from './namespace';

export class ServerBase {
    /**
     * Base Url
     */
    private _baseUrl: string = '';

    /**
     * Get Base Url
     * @returns string
     */
    public get baseUrl(): string {
        return this._baseUrl;
    }

    /**
     * Authorization
     */
    public _authorization: string = '';

    /**
     * Get Authorization
     * @returns string
     */
    public get authorization(): string {
        return this._authorization;
    }

    /**
     * Set Authorization
     * @param value string
     */
    public set authorization(value: string) {
        this._authorization = value;
    }

    /**
     * Initialization Flag
     */
    private _isInitialization: boolean = false;

    /**
     * Get Initialization Flag
     * @returns boolean
     */
    public get isInitialization(): boolean {
        return this._isInitialization;
    }

    /**
     * Constructor
     * @param baseUrl string
     */
    public constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    /**
     * Initialization
     * @returns void
     */
    public Initialization(): void {
        try {
            this._isInitialization = false;

            if (!this._baseUrl) {
                throw 'base url can not empty';
            }

            let url = new URL(this._baseUrl);

            let protocol: string = url.protocol.replace(/:/g, '').toLowerCase();
            let hostname: string = url.hostname;
            let port: number = !url.port ? (protocol === 'https' ? 443 : 80) : parseInt(url.port);

            switch (protocol) {
                case 'https':
                case 'http':
                    break;
                default:
                    throw 'protocol should be https or http';
            }

            if (!hostname) {
                throw 'hostname can not empty';
            }

            if (!RegexService.isPort(port.toString())) {
                throw 'port should be between 0 to 65535';
            }

            this._isInitialization = true;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get Server Info
     * @async
     * @returns IServerResult<IServerInfoResponse>
     */
    public async ServerInfo(): Promise<ServerNameSpace.IServerResult<ServerNameSpace.IServerInfoResponse>> {
        try {
            let response = await this.BaseGet('api/v1/versions', undefined, 'json');
            if (!!response.error) {
                return response;
            }

            let result: ServerNameSpace.IServerInfoResponse = {
                backend: response.result['backend'],
                platform: response.result['platform'],
                os: response.result['os'],
                engine: response.result['engine'],
            };

            UserService.product = 'Object Detection';

            return {
                result: result,
            };
        } catch (e) {
            throw e;
        }
    }

    /**
     * Login
     * @async
     * @param data IWebLoginRequest
     * @returns IServerResult<IWebLoginResponse>
     */
    public async Login(data: ServerNameSpace.IWebLoginRequest): Promise<ServerNameSpace.IServerResult<any>> {
        try {
            let body: object = {
                email: data.username,
                password: data.password,
            };

            let response = await this.BasePost('api/auth/login', body, 'json');

            if (response.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: response.result.errorcode,
                        error_msg: response.result.error_msg,
                    },
                };
            }

            let result: ServerNameSpace.IWebLoginResponse = {
                token: response.result.token,
                type: response.result.type,
                userId: response.result.userId,
                name: response.result.name,
            };

            this._authorization = response.result.token;

            return {
                result: result,
            };
        } catch (e) {
            throw e;
        }
    }

    /**
     * Logout
     * @async
     * @login
     * @returns IServerResult<boolean>
     */
    public async Logout(): Promise<ServerNameSpace.IServerResult<boolean>> {
        try {
            let body: object = {
                token: this._authorization,
            };

            let response = await this.BasePost('api/auth/logout', body, 'json');
            if (!!response.error) {
                return response;
            }

            this._authorization = undefined;

            return {
                result: true,
            };
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     */
    public async GetUserList(): Promise<any>;
    public async GetUserList(datas: ServerNameSpace.IDataList): Promise<any>;
    public async GetUserList(datas?: ServerNameSpace.IDataList): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
            };

            let result: ServerNameSpace.IUserListRResponse[] = [];

            let res = await this.BasePost('api/user/list', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            result = res.result.rows;

            // pagination
            let pageSize: number = datas.paging?.pageSize;
            let total: number = result.length;
            let totalPages: number = Math.ceil(total / pageSize);
            let page: number = datas.paging.page;
            if (page > totalPages) {
                page = totalPages || 1;
            }

            result = result.slice((page - 1) * pageSize, page * pageSize);

            let response: ServerNameSpace.IPagingResponse<ServerNameSpace.IUserListRResponse> = {
                paging: {
                    total: total,
                    totalPages: totalPages,
                    page: page,
                    pageSize: pageSize,
                },
                results: result,
            };

            return {
                result: response,
            };
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     */
    public async UpdateUser(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
                userId: datas.userId,
                password: datas.password,
                name: datas.name,
                note: datas.note,
            };

            let res = await this.BasePost('api/user/update', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            return res;
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     */
    public async CreateUser(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
                email: datas.email,
                type: datas.type,
                password: datas.password,
                name: datas.name,
                note: datas.note,
            };

            let res = await this.BasePost('api/user/create', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }
            return res;
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     */
    public async DeleteUser(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
                userId: datas.userId,
            };

            let res = await this.BasePost('api/user/delete', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            return res;
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     */
    public async GetLocationList(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
            };

            let res = await this.BasePost('api/site/list', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            let result = res.result.rows;

            // pagination
            let pageSize: number = datas.paging?.pageSize;
            let total: number = result.length;
            let totalPages: number = Math.ceil(total / pageSize);
            let page: number = datas.paging.page;
            if (page > totalPages) {
                page = totalPages || 1;
            }

            result = result.slice((page - 1) * pageSize, page * pageSize);

            let response = {
                paging: {
                    total: total,
                    totalPages: totalPages,
                    page: page,
                    pageSize: pageSize,
                },
                results: { rows: result, locationList: res.result.locationList, typeList: res.result.typeList },
            };

            return {
                result: response,
            };
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     */
    public async UpdateLocation(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
                siteId: datas.siteId,
                name: datas.name,
                locationName: datas.locationName,
                type: datas.type,
                point: datas.point,
            };

            let res = await this.BasePost('api/site/update', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            return res;
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     */
    public async CreateLocation(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
                name: datas.name,
                locationName: datas.locationName,
                type: datas.type,
                point: datas.point,
            };

            let res = await this.BasePost('api/site/create', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            return res;
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     */
    public async DeleteLocation(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
                siteId: datas.siteId,
            };

            let res = await this.BasePost('api/site/delete', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            return res;
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     */
    public async GetCourseList(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
            };

            let res = await this.BasePost('api/course/list', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            let result = res.result.rows;

            // pagination
            let pageSize: number = datas.paging?.pageSize;
            let total: number = result.length;
            let totalPages: number = Math.ceil(total / pageSize);
            let page: number = datas.paging.page;
            if (page > totalPages) {
                page = totalPages || 1;
            }

            result = result.slice((page - 1) * pageSize, page * pageSize);

            let response = {
                paging: {
                    total: total,
                    totalPages: totalPages,
                    page: page,
                    pageSize: pageSize,
                },
                results: { rows: result, bgList: res.result.bgList, sectorList: res.result.sectorList },
            };

            return {
                result: response,
            };
        } catch (e) {
            throw e;
        }
    }

    public async UpdateCourse(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
                courseId: datas.courseId,
                name: datas.name,
                date: datas.date,
                time: datas.time,
                bgName: datas.bgName,
                sectorName: datas.sectorName,
                point: datas.point,
            };

            let res = await this.BasePost('api/course/update', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            return res;
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     */
    public async CreateCourse(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
                name: datas.name,
                date: datas.date,
                time: datas.time,
                bgName: datas.bgName,
                sectorName: datas.sectorName,
                point: datas.point,
            };

            let res = await this.BasePost('api/course/create', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            return res;
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     */
    public async DeleteCourse(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
                courseId: datas.courseId,
            };

            let res = await this.BasePost('api/course/delete', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            return res;
        } catch (e) {
            throw e;
        }
    }

    public async GetCourseActionList(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
                courseIdList: datas?.courseName.length === 0 ? null : datas?.courseName,
                pageIndex: datas.paging.page,
                pageSize: datas.paging.pageSize,
            };

            let res = await this.BasePost('api/course/actionList', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            let result = res.result.rows;

            let response = {
                paging: {
                    total: res.result.rows.length,
                    totalPages: res.result.totalPageNum,
                    page: datas.paging.page,
                    pageSize: datas.paging.pageSize,
                },
                results: { rows: result, bgList: res.result.bgList, sectorList: res.result.sectorList },
            };

            return {
                result: response,
            };
        } catch (e) {
            throw e;
        }
    }

    public async GetLocationActionList(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
                locationList: datas.location?.key ?? null,
                typeList: datas.type?.key ?? null,
                siteIdList: datas?.site.length === 0 ? null : datas?.site,
                pageIndex: datas.paging.page,
                pageSize: datas.paging.pageSize,
            };

            let res = await this.BasePost('api/site/actionList', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            let result = res.result.rows;

            let response = {
                paging: {
                    total: res.result.rows.length,
                    totalPages: res.result.totalPageNum,
                    page: datas.paging.page,
                    pageSize: datas.paging.pageSize,
                },
                results: { rows: result, bgList: res.result.bgList, sectorList: res.result.sectorList },
            };

            return {
                result: response,
            };
        } catch (e) {
            throw e;
        }
    }

    public async GetMemberList(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
                pageIndex: datas.paging.page,
                pageSize: datas.paging.pageSize,
                keyword: datas.keyword,
            };

            let res = await this.BasePost('api/member/list', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            let result = res.result.rows;

            let response = {
                paging: {
                    total: res.result.rows.length,
                    totalPages: res.result.totalPageNum,
                    page: datas.paging.page,
                    pageSize: datas.paging.pageSize,
                },
                results: { rows: result, bgList: res.result.bgList, sectorList: res.result.sectorList },
            };

            return {
                result: response,
            };
        } catch (e) {
            throw e;
        }
    }

    public async UserPasswordUpdate(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
                password: datas.password,
            };

            let res = await this.BasePost('api/auth/changePwd', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            let response = res;

            return {
                result: response,
            };
        } catch (e) {
            throw e;
        }
    }
    public async GetMemberActionList(datas): Promise<any> {
        try {
            let body: object = {
                token: this._authorization,
                qrCodeNumberList: datas.qrCodeNumberList,
                pageIndex: datas.paging.page,
                pageSize: datas.paging.pageSize,
            };

            let res = await this.BasePost('api/member/actionList', body, 'json');

            if (res.result.errorcode !== 0) {
                return {
                    result: {
                        errorcode: res.result.errorcode,
                        error_msg: res.result.error_msg,
                    },
                };
            }

            let result = res.result.rows;

            let response = {
                paging: {
                    total: res.result.rows.length,
                    totalPages: res.result.totalPageNum,
                    page: datas.paging.page,
                    pageSize: datas.paging.pageSize,
                },
                results: { rows: result, bgList: res.result.bgList, sectorList: res.result.sectorList },
            };

            return {
                result: response,
            };
        } catch (e) {
            throw e;
        }
    }

    /**
     * Base Post
     * @async
     * @param path string
     * @param data object
     * @param responseType AxiosResponseType
     * @returns IServerResult<any>
     */
    private async BasePost(path: string, data: object, responseType: AxiosResponseType): Promise<ServerNameSpace.IServerResult<any>> {
        try {
            let url: string = `${this._baseUrl}/${path}`;

            let response: any = await new Promise<any>((resolve, reject) => {
                try {
                    HttpClient({
                        method: 'post',
                        url: url,
                        responseType: responseType,
                        data: data ?? {},
                    })
                        .then((response) => {
                            let data: object = response.data;
                            return resolve(data);
                        })
                        .catch((error) => {
                            return reject(this.ErrorHandler(error));
                        });
                } catch (e) {
                    return reject(e);
                }
            }).catch((e) => {
                throw e;
            });

            return {
                result: response,
            };
        } catch (e) {
            return {
                result: undefined,
                error: e,
            };
        }
    }

    /**
     * Base Get
     * @async
     * @param path string
     * @param data object
     * @param responseType AxiosResponseType
     * @returns IServerResult<any>
     */
    private async BaseGet(path: string, data: object, responseType: AxiosResponseType): Promise<ServerNameSpace.IServerResult<any>> {
        try {
            let url: string = `${this._baseUrl}/${path}`;
            if (!!data) {
                url = `${url}?${this.ConvertObjectToQueryString(data).join('&')}`;
            }

            let response: any = await new Promise<any>((resolve, reject) => {
                try {
                    HttpClient({
                        method: 'get',
                        url: url,
                        responseType: responseType,
                    })
                        .then((response) => {
                            let data: object = response.data;
                            return resolve(data);
                        })
                        .catch((error) => {
                            return reject(this.ErrorHandler(error));
                        });
                } catch (e) {
                    return reject(e);
                }
            }).catch((e) => {
                throw e;
            });

            return {
                result: response,
            };
        } catch (e) {
            return {
                result: undefined,
                error: e,
            };
        }
    }

    /**
     * Base Put
     * @async
     * @param path string
     * @param data object
     * @param responseType AxiosResponseType
     * @returns IServerResult<any>
     */
    private async BasePut(path: string, data: object, responseType: AxiosResponseType): Promise<ServerNameSpace.IServerResult<any>> {
        try {
            let url: string = `${this._baseUrl}/${path}`;

            let response: any = await new Promise<any>((resolve, reject) => {
                try {
                    HttpClient({
                        method: 'put',
                        url: url,
                        responseType: responseType,
                        data: data ?? {},
                    })
                        .then((response) => {
                            let data: object = response.data;
                            return resolve(data);
                        })
                        .catch((error) => {
                            return reject(this.ErrorHandler(error));
                        });
                } catch (e) {
                    return reject(e);
                }
            }).catch((e) => {
                throw e;
            });

            return {
                result: response,
            };
        } catch (e) {
            return {
                result: undefined,
                error: e,
            };
        }
    }

    /**
     * Base Delete
     * @async
     * @param path string
     * @param data object
     * @param responseType AxiosResponseType
     * @returns IServerResult<any>
     */
    private async BaseDelete(path: string, data: object, responseType: AxiosResponseType): Promise<ServerNameSpace.IServerResult<any>> {
        try {
            let url: string = `${this._baseUrl}/${path}`;
            if (!!data) {
                url = `${url}?${this.ConvertObjectToQueryString(data).join('&')}`;
            }

            let response: any = await new Promise<any>((resolve, reject) => {
                try {
                    HttpClient({
                        method: 'delete',
                        url: url,
                        responseType: responseType,
                    })
                        .then((response) => {
                            let data: object = response.data;
                            return resolve(data);
                        })
                        .catch((error) => {
                            return reject(this.ErrorHandler(error));
                        });
                } catch (e) {
                    return reject(e);
                }
            }).catch((e) => {
                throw e;
            });

            return {
                result: response,
            };
        } catch (e) {
            return {
                result: undefined,
                error: e,
            };
        }
    }

    /**
     * Base Patch
     * @async
     * @param path string
     * @param data object
     * @param responseType AxiosResponseType
     * @returns IServerResult<any>
     */
    private async BasePatch(path: string, data: object, responseType: AxiosResponseType): Promise<ServerNameSpace.IServerResult<any>> {
        try {
            let url: string = `${this._baseUrl}/${path}`;

            let response: any = await new Promise<any>((resolve, reject) => {
                try {
                    HttpClient({
                        method: 'patch',
                        url: url,
                        responseType: responseType,
                        data: data ?? {},
                    })
                        .then((response) => {
                            let data: object = response.data;
                            return resolve(data);
                        })
                        .catch((error) => {
                            return reject(this.ErrorHandler(error));
                        });
                } catch (e) {
                    return reject(e);
                }
            }).catch((e) => {
                throw e;
            });

            return {
                result: response,
            };
        } catch (e) {
            return {
                result: undefined,
                error: e,
            };
        }
    }

    /**
     * Error Handler
     * @param error any
     * @returns IServerResponseError
     */
    protected ErrorHandler(error: AxiosError): ServerNameSpace.IServerResultError {
        try {
            if (!!error.response) {
                let response = error.response;
                if (response.status === 404) {
                    return {
                        statusCode: response.status,
                        message: response.statusText,
                    };
                } else if (response.status === 413) {
                    return {
                        statusCode: response.status,
                        message: response.statusText,
                    };
                } else if (response.status !== 200) {
                    if (typeof response.data === 'object') {
                        if ('status' in response.data && response.data['status'] !== 200) {
                            return {
                                statusCode: response.data['status'] as unknown as number,
                                message: `${response.data['title']}, ${response.data['detail']}`,
                            };
                        }

                        return {
                            statusCode: response.status,
                            message: JSON.stringify(response.data),
                        };
                    }

                    return {
                        statusCode: response.status,
                        message: response.data.toString().replace(/(\r)?\n/g, '; '),
                    };
                }
            } else {
                return {
                    statusCode: undefined,
                    message: error instanceof Error ? error.message : error,
                };
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Convert Object to Query String
     * @param query object
     * @returns object
     */
    protected ConvertObjectToQueryString(query: object): string[];
    protected ConvertObjectToQueryString(query: object, isArray: boolean, parentKeys: string[]): string[];
    protected ConvertObjectToQueryString(query: object, isArray?: boolean, parentKeys?: string[]): string[] {
        try {
            let queryStrings: string[] = [];

            for (let key in query) {
                if (query[key] === null || query[key] === undefined) {
                    continue;
                }
                if (typeof query[key] !== 'object' || query[key] instanceof Date) {
                    let keys: string[] = isArray ? [].concat(...parentKeys) : !parentKeys ? [key] : [].concat(...parentKeys, key);
                    queryStrings.push(
                        `${[keys.join('.')]}=${encodeURIComponent(query[key] instanceof Date ? query[key].toISOString() : query[key])}`,
                    );

                    continue;
                }

                queryStrings.push(
                    ...this.ConvertObjectToQueryString(query[key], Array.isArray(query[key]), !parentKeys ? [key] : [].concat(...parentKeys, key)),
                );
            }

            return queryStrings;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get File Url
     * @param src string
     * @returns string
     */
    public FileUrl(src: string): string {
        try {
            let result: string = `${this._baseUrl}/${src}`;

            return result;
        } catch (e) {
            throw e;
        }
    }
}
