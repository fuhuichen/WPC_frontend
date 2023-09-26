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
    private _authorization: string = '';

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
    public async Login(data: ServerNameSpace.IWebLoginRequest): Promise<ServerNameSpace.IServerResult<ServerNameSpace.IWebLoginResponse>> {
        try {
            let body: object = {
                email: data.username,
                password: data.password,
            };

            let response = await this.BasePost('api/auth/login', body, 'json');
            if (!!response.error) {
                return response;
            }

            let result: ServerNameSpace.IWebLoginResponse = {
                token: response.result.token,
                type: response.result.type,
                userId: response.result.userId,
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
     * Detective Record Total
     * @async
     * @param data ITargetObjectSwitch
     * @returns IServerResult<boolean>
     */
    public async DetectiveRecordReads(): Promise<
        ServerNameSpace.IServerResult<ServerNameSpace.IPagingResponse<ServerNameSpace.IDetectiveRecordsReponse>>
    >;
    public async DetectiveRecordReads(
        data: ServerNameSpace.IDetectiveRecordsRequest,
    ): Promise<ServerNameSpace.IServerResult<ServerNameSpace.IPagingResponse<ServerNameSpace.IDetectiveRecordsReponse>>>;
    public async DetectiveRecordReads(
        data?: ServerNameSpace.IDetectiveRecordsRequest,
    ): Promise<ServerNameSpace.IServerResult<ServerNameSpace.IPagingResponse<ServerNameSpace.IDetectiveRecordsReponse>>> {
        try {
            let query: object = {};

            if (!!data) {
                query['keyword'] = !data.keyword ? undefined : data.keyword;
                query['begin'] = !data.startDate ? undefined : DateTimeService.toString(data.startDate, 'YYYY-MM-DD');
                query['end'] = !data.endDate ? undefined : DateTimeService.toString(data.endDate, 'YYYY-MM-DD');
                query['from'] = !data.startTime ? undefined : DateTimeService.toString(data.startTime, 'HH:mm:ss');
                query['to'] = !data.endTime ? undefined : DateTimeService.toString(data.endTime, 'HH:mm:ss');
            }

            let totalResponse = await this.BaseGet(`api/v1/tracking/count`, query, 'json');
            if (!!totalResponse.error) {
                return totalResponse;
            }

            let page: number = 0;
            let pageSize: number = 0;
            let total: number = totalResponse.result['total'] ?? 0;
            let totalPages: number = 0;

            if (!!data) {
                // paging
                if (!!data.paging) {
                    page = data.paging.page;
                    pageSize = data.paging.pageSize;
                    totalPages = Math.ceil(total / pageSize);
                    if (page > totalPages) {
                        page = totalPages || 1;
                    }

                    query['limit'] = pageSize;
                    query['skip'] = (page - 1) * pageSize;
                }

                // sorting
                if (!!data.sorting) {
                    // 1：大->小 desc , 0：小->大 asc，only need send desc to server
                    // create_ts: data, label_name: name, channel_id: source
                    switch (data.sorting.field) {
                        case 'date':
                            if (!data.sorting.order) {
                                query['order'] = `${'create_ts'}`;
                            } else {
                                query['order'] = `${'create_ts'}.desc`;
                            }
                            break;

                        case 'labelName':
                            if (!data.sorting.order) {
                                query['order'] = `${'label_name'}`;
                            } else {
                                query['order'] = `${'label_name'}.desc`;
                            }
                            break;

                        case 'cameraName':
                            if (!data.sorting.order) {
                                query['order'] = `${'channel_id'}`;
                            } else {
                                query['order'] = `${'channel_id'}.desc`;
                            }
                            break;
                    }
                }
            }

            let responseTracking = await this.BaseGet('api/v1/tracking', query, 'json');
            if (!!responseTracking.error) {
                return responseTracking;
            }

            let result: ServerNameSpace.IDetectiveRecordsReponse[] = [];

            for (let _result of responseTracking.result) {
                let labelName: string = '';
                let labelImageSrc: string = '';
                if (!!_result['info']) {
                    labelName = !_result['info']['label_name'] ? '' : _result['info']['label_name'];
                    labelImageSrc = !_result['info']['label_image_base64'] ? '' : `data:image/jpeg;base64,${_result['info']['label_image_base64']}`;
                }

                let snapshotSrc: string = '';
                if (!!_result['result_img']) {
                    snapshotSrc = !_result['result_img']['image_base64'] ? '' : `data:image/jpeg;base64,${_result['result_img']['image_base64']}`;
                }

                result.push({
                    objectId: _result['channel_id'],
                    date: !_result['create_ts'] ? undefined : new Date(_result['create_ts']),
                    cameraName: '',
                    cameraType: '',
                    labelName: labelName,
                    labelImageSrc: labelImageSrc,
                    snapshotSrc: snapshotSrc,
                });
            }

            let response: ServerNameSpace.IPagingResponse<ServerNameSpace.IDetectiveRecordsReponse> = {
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
     * Get Source Camera List
     * @async
     * @returns IServerResult<IPagingResponse<ISourceCameraRResponse>>
     */
    public async SourceCameraReads(): Promise<ServerNameSpace.IServerResult<ServerNameSpace.IPagingResponse<ServerNameSpace.ISourceCameraRResponse>>>;
    public async SourceCameraReads(
        datas: ServerNameSpace.IDataList,
    ): Promise<ServerNameSpace.IServerResult<ServerNameSpace.IPagingResponse<ServerNameSpace.ISourceCameraRResponse>>>;
    public async SourceCameraReads(
        datas?: ServerNameSpace.IDataList,
    ): Promise<ServerNameSpace.IServerResult<ServerNameSpace.IPagingResponse<ServerNameSpace.ISourceCameraRResponse>>> {
        try {
            let fakeData: ServerNameSpace.ISourceCameraRResponse[] = [];

            let name: string[] = ['E棟1樓-咖啡廳正面', 'E棟5樓-機櫃', 'E棟1樓-咖啡廳左', 'E棟2樓-機櫃', 'E棟4樓-webcam'];

            let type: ServerNameSpace.ISourceCameraType[] = [ServerNameSpace.ISourceCameraType.RTSP, ServerNameSpace.ISourceCameraType.Webcam];

            let modal: string[] = ['Yolo V4', 'Another'];

            for (let i = 0; i < name.length; i++) {
                let randomIndex = Math.floor(Math.random() * 2);
                let cameraType: ServerNameSpace.ISourceCameraType = type[randomIndex];

                if (cameraType === ServerNameSpace.ISourceCameraType.RTSP) {
                    fakeData.push({
                        objectId: `objectId_${i + 1}`,
                        name: name[i],
                        type: cameraType,
                        modal: modal[randomIndex],
                        rtsp: 'rtsp://username.password@192.168.0.100/rtsp_url',
                        remark: 'fake data',
                        note: 'fake note',
                    });
                } else if (cameraType === ServerNameSpace.ISourceCameraType.Webcam) {
                    fakeData.push({
                        objectId: `objectId_${i + 1}`,
                        name: name[i],
                        type: cameraType,
                        modal: modal[randomIndex],
                        device: 'device 1',
                        remark: 'fake data',
                        note: 'fake note',
                    });
                }
            }

            // pagination
            let pageSize: number = datas.paging?.pageSize;
            let total: number = fakeData.length;
            let totalPages: number = Math.ceil(total / pageSize);
            let page: number = datas.paging.page;
            if (page > totalPages) {
                page = totalPages || 1;
            }

            fakeData = fakeData.slice((page - 1) * pageSize, page * pageSize);

            let response: ServerNameSpace.IPagingResponse<ServerNameSpace.ISourceCameraRResponse> = {
                paging: {
                    total: total,
                    totalPages: totalPages,
                    page: page,
                    pageSize: pageSize,
                },
                results: fakeData,
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
