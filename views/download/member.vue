<template>
    <div>
        <div v-show="pageTable && tableView === 'review'">
            <AicsLayoutPageTitle :text="$i18n['Router_/w-download/member']" />

            <div class="page">
                <div class="pb-2">
                    <div class="page--filter-line1">
                        <div class="row-4">
                            <AicsTextLabel :text="$i18n.Common_Keyword" />

                            <AicsInputText
                                size="14"
                                variant="grayscale-primary"
                                v-model="filterDataTemp.keyword"
                                name="keyword"
                                :debounce="50"
                                :placeholder="$i18n.Download_Member_KeywordPlaceholder"
                                :isWidth100Percent="true"
                            />
                        </div>

                        <div>
                            <AicsTextLabel text="" />

                            <div class="page--filter-tool-buttons page--filter-tool-buttons--1">
                                <AicsButton variant="primary" mode="filled" size="14" :text="$i18n.Button_Search" @click="searchData" />
                            </div>
                        </div>

                        <div class="row-8">
                            <AicsTextLabel text="" />

                            <div class="page--filter-tool-buttons page--filter-tool-buttons--1">
                                <AicsButton
                                    variant="secondary"
                                    mode="filled"
                                    size="14"
                                    :text="$i18n.Download_Member_AttendenceData"
                                    @click="goDownloadTable"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <AicsCardContainer variant="1px">
                    <AicsTable
                        ref="mainTable"
                        :data="tableItem.data"
                        :columns="tableItem.columns"
                        :paging="tableItem.paging"
                        :sorting="tableItem.sorting"
                        :showPaging="tableItem.showPaging"
                        :numberOfPerPage="tableItem.numberOfPerPage"
                        :pagingI18n="tablePagingI18n"
                        @tableReload="tableReload"
                    >
                    </AicsTable>
                </AicsCardContainer>
            </div>
        </div>

        <MemberData v-if="pageTable && tableView === 'download'" />

        <AicsDialog
            :isShow="dialogData.isShow"
            :title="dialogData.title"
            :type="dialogData.type"
            :message="dialogData.message"
            :detailTitle="dialogData.detailTitle"
            :detail="dialogData.detail"
            :showSecondaryButton="dialogData.showSecondaryButton"
            :showCancelButton="dialogData.showCancelButton"
            :pagingI18n="dialogData.pagingI18n"
            @close="closeDialog"
            @clickCancel="cancelDialog"
            @clickPrimary="confirmDialog"
        >
        </AicsDialog>
    </div>
</template>

<script lang="ts">
//#region Vue
import { Vue, Component } from 'vue-property-decorator';
//#endregion

//#region Module
import * as Rx from 'rxjs';
import * as RxOperator from 'rxjs/operators';
//#endregion

//#region Framework
import { TableModel } from '@/../components';
//#endregion

//#region Src
import {} from '@/config';
import { EPageStep, EPageAction } from '@/enums';
import { UtilityService, ServerNamespace, ResponseFilterService } from '@/helpers';
import { IViews } from '@/models';
import { ILoadingData, LoadingData } from '@/stores/loading';
import { INotificationToastData, NotificationToastData } from '@/stores/notification-toast';
//#endregion

//#region Views
import { ModelsMember as Model } from './models';
import MemberData from '@/views/download/member-data.vue';
//#endregion

//#region Components Framework
import {
    AicsTextLabel,
    AicsLayoutPageTitle,
    AicsButton,
    AicsCardContainer,
    AicsDialog,
    AicsTable,
    AicsInputText,
    AicsInputDatetime,
    AicsImageSingle,
} from '@/../components';
//#endregion

//#region Components Src
//#endregion

//#region Components Views
//#endregion

@Component({
    components: {
        AicsTextLabel,
        AicsLayoutPageTitle,
        AicsButton,
        AicsCardContainer,
        AicsDialog,
        AicsTable,
        AicsInputText,
        AicsInputDatetime,
        AicsImageSingle,
        MemberData,
    },
})
export default class VuePageClass extends Vue {
    //#region Prop
    //#endregion

    //#region Variables
    private tableItem: TableModel.IItem<Model.ITableData> = {
        // 必填
        data: [],
        columns: [],
        paging: { pageSize: 10, page: 1, totalPages: 1, total: 0 },

        //非必填
        sorting: { field: 'date', orderEnum: TableModel.ESorting.desc, order: 1 },

        showPaging: true,
        numberOfPerPage: [10, 25, 50, 100],
    };

    private tablePagingI18n: TableModel.IPagingI18n = {
        total: this.$i18n.Table_Total,
        nowAtPage: this.$i18n.Table_NowAtPage,
        displayRowCount: this.$i18n.Table_DisplayRowCount,
        privious5Page: this.$i18n.Table_Privious5Page,
        next5Page: this.$i18n.Table_Next5Page,
    };

    private pageItem: IViews.IPageItem = {
        page: EPageStep.table,
        action: EPageAction.create,
    };

    private tableView = 'review';

    private filterDataOriginal: Model.IFilterData = {
        keyword: '',
    };
    private filterData: Model.IFilterData = { ...this.filterDataOriginal };
    private filterDataTemp: Model.IFilterData = { ...this.filterDataOriginal };

    private dialogDataOriginal: IViews.IDialogData = {
        isShow: false,
        title: this.$i18n.Common_Status_Error,
        message: '',
        detail: '',
        detailTitle: this.$i18n.Dialog_Error_Detail,
        type: 'error',
        showSecondaryButton: false,
        showCancelButton: false,
        pagingI18n: {
            cancelButtonText: this.$i18n.Button_Cancel,
            primaryButtonText: this.$i18n.Button_Confirm,
        },
        isDoNextStep: false,
    };
    private dialogData: IViews.IDialogData = { ...this.dialogDataOriginal };

    private loadingDataOriginal: ILoadingData = JSON.parse(JSON.stringify(LoadingData));
    private loadingData: ILoadingData = { ...this.loadingDataOriginal };

    private notificationToastDataOriginal: INotificationToastData = JSON.parse(JSON.stringify(NotificationToastData));
    private notificationToastData: INotificationToastData = { ...this.notificationToastDataOriginal };

    private pagePath: string = undefined;

    private stop$: Rx.Subject<boolean> = new Rx.Subject();
    //#endregion

    //#region Computed
    private get pageTable(): boolean {
        return this.pageItem.page === EPageStep.table;
    }

    private get tableApiParam(): Model.ITableApiParam {
        let tempTableApiParam: Model.ITableApiParam = {};

        tempTableApiParam.paging = { page: this.tableItem.paging.page, pageSize: this.tableItem.paging.pageSize };

        if (this.tableItem.sorting?.orderEnum !== TableModel.ESorting.none) {
            tempTableApiParam.sorting = { field: this.tableItem.sorting?.field, order: this.tableItem.sorting?.order };
        }

        const { keyword }: Model.IFilterData = this.filterData;

        if (!!keyword) {
            tempTableApiParam.keyword = keyword;
        } else {
            delete tempTableApiParam.keyword;
        }

        return tempTableApiParam;
    }
    //#endregion

    //#region Watch
    //#endregion

    //#region Vue Life
    private async beforeCreate(): Promise<void> {}
    private async created(): Promise<void> {}
    private async beforeMount(): Promise<void> {}
    private async mounted(): Promise<void> {
        this.pagePath = this.$router.currentRoute.path;

        this.$store.routerReload$
            .pipe(
                RxOperator.filter((n) => !n || n === this.pagePath),
                RxOperator.takeUntil(this.stop$),
                RxOperator.concatMap(async (x) => {
                    this.searchReset();
                    this.tableView = 'review';

                    if (this.pageItem.page === EPageStep.table) {
                        await this.initTable();
                    } else {
                        await this.pageToList();
                    }
                }),
            )
            .subscribe();
    }
    private async beforeDestroy(): Promise<void> {}
    private async destroyed(): Promise<void> {
        this.stop$.next();
    }
    //#endregion

    //#region Init
    //#region Init table
    private initTableColumns(): void {
        this.tableItem.columns = [
            { type: 'checkbox', optionKey: 'objectId', valueKey: 'isChecked', isDisabledKey: 'isDisabled' },
            { type: 'index', title: this.$i18n.Common_NO },
            { type: 'field', title: this.$i18n.Download_Member_QRCodeNumber, key: 'date' },
            { type: 'field', title: this.$i18n.Download_Member_AttendenceName, key: 'labelImageSrc' },
            { type: 'field', title: this.$i18n.Download_Member_AttendenceEmail, key: 'labelName' },
        ];
    }

    private async initTable(): Promise<void> {
        this.initTableColumns();
    }
    //#endregion

    //#region Init form
    //#endregion

    //#region Init select option
    //#endregion
    //#endregion

    //#region View Event
    //#region Event page
    private async pageToList(): Promise<void> {
        this.pageItem.page = EPageStep.table;
        this.pageItem.action = EPageAction.list;

        await this.tableReload();

        this.$store.routerAction$.next('');
    }
    //#endregion

    //#region Event search
    private searchReset(): void {
        this.filterData = JSON.parse(JSON.stringify({ ...this.filterDataOriginal }));
        this.filterDataTemp = JSON.parse(JSON.stringify({ ...this.filterDataOriginal }));
    }

    private async searchData(): Promise<void> {
        this.filterData = JSON.parse(JSON.stringify({ ...this.filterDataTemp }));

        for (let key in this.filterDataTemp) {
            if (this.filterDataTemp[key] instanceof Date) {
                this.filterData[key] = new Date(this.filterDataTemp[key]);
            }
        }

        this.tableItem.paging.page = 1;
        await this.tableReload();
    }

    private goDownloadTable() {
        this.$store.routerAction$.next(this.$i18n['Router_/data']);

        this.tableView = 'download';
    }
    //#endregion

    //#region Event table
    private async tableReload(): Promise<boolean>;
    private async tableReload(emitValue: TableModel.IEmitValue): Promise<boolean>;
    private async tableReload(emitValue?: TableModel.IEmitValue): Promise<boolean> {
        if (!!emitValue) {
            this.tableItem.paging.page = emitValue.page;
            this.tableItem.paging.pageSize = emitValue.pageSize;
            this.tableItem.sorting.field = emitValue.sortingField;
            this.tableItem.sorting.orderEnum = emitValue.sortingOrderEnum;
            this.tableItem.sorting.order = emitValue.sortingOrder;
        }

        let isSuccess: boolean = await this.tableGetApiData();
        UtilityService.ScrollToTop();

        return isSuccess;
    }
    //#endregion

    //#region Event form
    //#endregion

    //#region Dialog
    private closeDialog(): void {
        this.dialogData.isShow = false;
        this.dialogData.isDoNextStep = false;

        this.dialogData = JSON.parse(JSON.stringify(this.dialogDataOriginal));
    }

    private cancelDialog(): void {
        this.closeDialog();
    }

    private async confirmDialog(): Promise<void> {
        this.dialogData.isShow = false;
        this.dialogData.isDoNextStep = true;

        this.dialogData = JSON.parse(JSON.stringify(this.dialogDataOriginal));
    }
    //#endregion

    //#region Event server api (save, delete, test, sync...)
    //#endregion
    //#endregion

    //#region Other Function
    private async handleServerResponse(data: ServerNamespace.IServerResultError[], toastMessage?: string): Promise<void> {
        let responseSortData: IViews.IResponseSortData = ResponseFilterService.handleResponseMessages(this, data);

        for (const index in responseSortData.statusCodes) {
            let statusCode: number = responseSortData.statusCodes[index] !== undefined ? responseSortData.statusCodes[index] : undefined;
            let message: string = responseSortData.messages[index];
            let detail: string = responseSortData.details[index];

            if (statusCode === 200) continue;

            this.dialogData.isShow = true;
            this.dialogData.message = message;
            this.dialogData.showCancelButton = false;

            if (this.dialogData.detail.includes(detail)) {
                continue;
            } else {
                this.dialogData.detail += `${detail} <br/>`;
            }
        }

        if (responseSortData.total === responseSortData.success) {
            await this.pageToList();
        }
    }

    //#region Table
    private async tableGetApiData(): Promise<boolean> {
        return;

        this.loadingData.isShow = true;
        this.$store.loading$.next(this.loadingData);

        // let apiResult = await ServerService.DetectiveRecordReads(this.tableApiParam);
        let apiResult = undefined;
        let responseData: ServerNamespace.IServerResultError = undefined;
        if (apiResult.result.errorcode && apiResult.result.errorcode !== 0) {
            responseData = {
                statusCode: apiResult.result.errorcode,
                message: apiResult.result.error_msg,
            };

            this.handleServerResponse([responseData]);

            this.loadingData.isShow = false;

            return null;
        }

        this.tableItem.paging = apiResult.result.paging;

        this.tableSetData(apiResult.result.results);

        this.loadingData.isShow = false;
        this.$store.loading$.next(this.loadingData);

        return true;
    }

    private tableSetData(result: Model.IServerResponseData[]): void {
        this.tableItem.data = result;
    }
    //#endregion
    //#endregion
}
</script>

<style lang="scss" scoped></style>
