import { Vue } from 'vue-property-decorator';

import { ResolveTextService, ServerNamespace } from '@/helpers';
import { IViews } from '@/models';

export class ServiceResponseFilter {
    /**
     *
     *
     * @export
     * @param {*} vue
     * @param {IComponent.IResponseMessage[]} data
     * @return {*}  {IViews.IResponseSortData}
     */
    public handleResponseMessages(vue: Vue, data: ServerNamespace.IServerResultError[]): IViews.IResponseSortData;
    public handleResponseMessages(vue: Vue, data: ServerNamespace.IServerResultError[], expandStatusCodeMessage: object): IViews.IResponseSortData;
    public handleResponseMessages(vue: Vue, data: ServerNamespace.IServerResultError[], expandStatusCodeMessage?: object): IViews.IResponseSortData {
        let originalStatusCodeMessage: object = {
            '1': vue.$i18n.Server_ERR_INVALID_PARAMETER,
            '3': vue.$i18n.Server_ERR_ITEM_NOT_EXIST,
            '8': vue.$i18n.Server_ERR_AUTH_FAIL,
            '400': vue.$i18n.Server_Exception_400,
            '401': vue.$i18n.Server_Exception_401,
            '403': vue.$i18n.Server_Exception_403,
            '500': vue.$i18n.Server_Exception_500,
            undefined: vue.$i18n.Server_Exception_Response_Fail,
            ...(expandStatusCodeMessage ?? {}),
        };

        let total: number = data.length;
        let success: number = 0;
        let fail: number = 0;

        let statusCodes: number[] = [];
        let messages: string[] = [];
        let details: string[] = [];

        let statusCode: number = 0;
        let message: string = '';
        let detail: string = '';

        (data || []).forEach((item) => {
            statusCode = item.statusCode;
            message = '';
            detail = item.message;

            if (item.statusCode === 200) {
                success++;
            } else {
                fail++;

                detail = item.message;

                if (!!detail && detail.includes('<')) detail = detail.replace('<', ResolveTextService.left_lt);
                if (!!detail && detail.includes('>')) detail = detail.replace('>', ResolveTextService.right_gt);

                message = originalStatusCodeMessage[item.statusCode !== item.statusCode ? item.statusCode.toString() : item.statusCode];
            }

            statusCodes.push(statusCode);
            messages.push(message);

            if (item.statusCode === 401 || item.statusCode === 403) {
                details.push('');
            } else {
                details.push(detail);
            }
        });

        return {
            total,
            success,
            fail,
            statusCodes,
            messages,
            details,
        };
    }
}
