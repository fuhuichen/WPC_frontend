import { DialogModel } from '@/../components';

import { EPageStep, EPageAction } from '@/enums';

export interface IPageItem {
    page: EPageStep;
    action: EPageAction;
}

export interface IDialogData {
    isShow: boolean;
    title: string;
    message: string;
    detail: string;
    detailTitle: string;
    showSecondaryButton: boolean;
    showCancelButton: boolean;
    type: DialogModel.TType;
    pagingI18n: DialogModel.IPagingI18n;
    isDoNextStep?: boolean;
}

export interface IResponseSortData {
    total: number;
    success: number;
    fail: number;
    statusCodes: number[];
    messages: string[];
    details: string[];
}
