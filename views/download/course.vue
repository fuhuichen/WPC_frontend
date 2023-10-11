<template>
    <div>
        <div v-show="pageTable">
            <AicsLayoutPageTitle :text="$i18n['Router_/w-download/course']">
                <AicsButton variant="secondary" mode="filled" size="14" :text="$i18n.Button_Export" @click="exportTable" />
            </AicsLayoutPageTitle>

            <div class="page">
                <div class="pb-2">
                    <div class="page--filter-line1">
                        <div class="row-3">
                            <AicsTextLabel :text="$i18n.Download_Course_BgName" />

                            <AicsDropdown
                                size="14"
                                variant="grayscale-primary"
                                v-model="filterDataTemp.bgName"
                                mode="outline"
                                :allowEmpty="true"
                                :options="filterOption.bgName"
                                :isWidth100Percent="true"
                                :pagingI18n="pagingI18n"
                                :placeholder="$i18n.Download_Course_BgName"
                            />
                        </div>

                        <div class="row-3">
                            <AicsTextLabel :text="$i18n.Download_Course_SectorName" />

                            <AicsDropdown
                                size="14"
                                variant="grayscale-primary"
                                v-model="filterDataTemp.sectorName"
                                mode="outline"
                                :allowEmpty="true"
                                :options="filterOption.sectorName"
                                :isWidth100Percent="true"
                                :pagingI18n="pagingI18n"
                                :placeholder="$i18n.Download_Course_SectorName"
                            />
                        </div>

                        <div class="row-3">
                            <AicsTextLabel :text="$i18n.Download_Course_CourseName" />

                            <AicsDropdown
                                size="14"
                                variant="grayscale-primary"
                                v-model="filterDataTemp.courseName"
                                mode="outline"
                                :allowEmpty="true"
                                :multiple="true"
                                :closeOnSelect="false"
                                :options="filterOption.courseName"
                                :isWidth100Percent="true"
                                :pagingI18n="pagingI18n"
                                :placeholder="$i18n.Download_Course_CourseName"
                            />
                        </div>

                        <div class="row-3">
                            <AicsTextLabel :text="$i18n.Common_DateTimeSearch" />

                            <AicsInputDatetime
                                size="14"
                                variant="grayscale-primary"
                                v-model="filterDataTemp.dateTime"
                                mode="outline"
                                :config="config"
                            />
                        </div>

                        <div>
                            <AicsTextLabel text="" />

                            <div class="page--filter-tool-buttons page--filter-tool-buttons--1">
                                <AicsButton variant="primary" mode="filled" size="14" :text="$i18n.Button_Search" @click="searchData" />
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
                        <template #timestamp="props"> {{ resolveDate(props.scope.timestamp) }} </template>

                        <template #name="props"> {{ props.scope.firstName }} {{ props.scope.lastName }} </template>
                    </AicsTable>
                </AicsCardContainer>
            </div>
        </div>

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
import ExcelJs from 'exceljs';
//#endregion

//#region Framework
import { DateTimeService } from '@/../helpers';
import { TableModel, InputDatetimeModel, DropdownModel } from '@/../components';
//#endregion

//#region Src
import { WebPath } from '@/config';
import { EPageStep, EPageAction } from '@/enums';
import { UtilityService, ServerNamespace, ResponseFilterService, ServerService } from '@/helpers';
import { IViews } from '@/models';
import { ILoadingData, LoadingData } from '@/stores/loading';
import { INotificationToastData, NotificationToastData } from '@/stores/notification-toast';
//#endregion

//#region Views
import { ModelsCourse as Model } from './models';
//#endregion

//#region Components Framework
import {
    AicsTextLabel,
    AicsLayoutPageTitle,
    AicsButton,
    AicsCardContainer,
    AicsDialog,
    AicsTable,
    AicsInputDatetime,
    AicsImageSingle,
    AicsDropdown,
} from '@/../components';
import { warn } from 'vue-class-component/lib/util';
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
        AicsInputDatetime,
        AicsImageSingle,
        AicsDropdown,
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
        sorting: { field: 'timestamp', orderEnum: TableModel.ESorting.desc, order: 1 },

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

    private filterDataOriginal: Model.IFilterData = {
        bgName: [],
        sectorName: [],
        courseName: [],
        dateTime: [],
    };
    private filterData: Model.IFilterData = { ...this.filterDataOriginal };
    private filterDataTemp: Model.IFilterData = { ...this.filterDataOriginal };

    private filterOption: Model.IFilterData = {
        bgName: [],
        sectorName: [],
        courseName: [],
        dateTime: [],
    };

    private config: InputDatetimeModel.IConfig = {
        type: 'date-range',
        format: InputDatetimeModel.EDatetimeFormat.date_slash_YYYYMMDD,
        placeholder: this.$i18n.Common_DateTimeSearchGreatThanSevenDays_Error,
    };

    private pagingI18n: DropdownModel.IPagingI18n = {
        selectAll: this.$i18n.Multiselect_SelectAll,
        maxElements: this.$i18n.Multiselect_MaxElements,
        noResult: this.$i18n.Multiselect_NoResult,
        noOptions: this.$i18n.Multiselect_ListIsEmpty,
    };

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

        const { bgName, sectorName, courseName, dateTime }: Model.IFilterData = this.filterData;

        if (!!bgName) {
            tempTableApiParam.bgName = bgName;
        } else {
            delete tempTableApiParam.bgName;
        }

        if (!!sectorName) {
            tempTableApiParam.sectorName = sectorName;
        } else {
            delete tempTableApiParam.sectorName;
        }

        if (!!courseName) {
            tempTableApiParam.courseName = courseName.map((x) => x.key as string);
        } else {
            delete tempTableApiParam.courseName;
        }

        if (dateTime.length > 0) {
            const endYear = dateTime[1].getFullYear();
            const endMonth = dateTime[1].getMonth() + 1;
            const endDate = dateTime[1].getDate();

            tempTableApiParam.startTime = dateTime[0].getTime() / 1000;
            tempTableApiParam.endTime = new Date(`${endYear}/${endMonth}/${endDate} 23:59:59`).getTime() / 1000;
        } else {
            delete tempTableApiParam.startTime;
            delete tempTableApiParam.endTime;
        }

        return tempTableApiParam;
    }

    private get tableExcelApiParam(): Model.ITableApiParam {
        let tableExcelApiParam: Model.ITableApiParam = {};

        tableExcelApiParam.paging = { page: this.tableItem.paging.page, pageSize: 1000000 };

        if (this.tableItem.sorting?.orderEnum !== TableModel.ESorting.none) {
            tableExcelApiParam.sorting = { field: this.tableItem.sorting?.field, order: this.tableItem.sorting?.order };
        }

        const { bgName, sectorName, courseName, dateTime }: Model.IFilterData = this.filterData;

        if (!!bgName) {
            tableExcelApiParam.bgName = bgName;
        } else {
            delete tableExcelApiParam.bgName;
        }

        if (!!sectorName) {
            tableExcelApiParam.sectorName = sectorName;
        } else {
            delete tableExcelApiParam.sectorName;
        }

        if (!!courseName) {
            tableExcelApiParam.courseName = courseName.map((x) => x.key as string);
        } else {
            delete tableExcelApiParam.courseName;
        }

        if (dateTime.length > 0) {
            const endYear = dateTime[1].getFullYear();
            const endMonth = dateTime[1].getMonth() + 1;
            const endDate = dateTime[1].getDate();

            tableExcelApiParam.startTime = dateTime[0].getTime() / 1000;
            tableExcelApiParam.endTime = new Date(`${endYear}/${endMonth}/${endDate} 23:59:59`).getTime() / 1000;
        } else {
            delete tableExcelApiParam.startTime;
            delete tableExcelApiParam.endTime;
        }

        return tableExcelApiParam;
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
                    if (this.pageItem.page === EPageStep.table) {
                        await this.initOption();
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
            { type: 'index', title: this.$i18n.Common_NO },
            { type: 'field', title: this.$i18n.Download_Course_BgName, key: 'bgName', sort: true },
            { type: 'field', title: this.$i18n.Download_Course_SectorName, key: 'sectorName', sort: true },
            { type: 'field', title: this.$i18n.Download_Course_CourseName, key: 'courseName', sort: true },
            { type: 'field', title: this.$i18n.Download_Course_AttendenceName, key: 'name', useSlot: true, sort: true },
            { type: 'field', title: this.$i18n.Download_Course_AttendenceEmail, key: 'email', sort: true },
            { type: 'field', title: this.$i18n.Download_Course_CheckTime, key: 'timestamp', useSlot: true, sort: true },
        ];
    }

    private async initTable(): Promise<void> {
        this.initTableColumns();
    }
    //#endregion

    //#region Init form
    //#endregion

    //#region Init select option
    private async initOption(): Promise<boolean> {
        this.loadingData.isShow = true;
        this.$store.loading$.next(this.loadingData);

        let apiResult = await ServerService.GetCourseList(this.tableApiParam);

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

        if (!!apiResult.result.errorcode && apiResult.result.errorcode !== 0) {
            this.dialogData.isShow = true;
            this.dialogData.message = apiResult.result.error_msg;
            this.dialogData.showCancelButton = false;

            return false;
        }
        const { bgList, sectorList, rows } = apiResult.result.results;

        const bgNameList = [];
        const sectorNameList = [];
        const courseIdList = [];
        bgList.forEach((x) => {
            let item = {
                key: x,
                value: x,
            };

            bgNameList.push(item);
        });

        sectorList.forEach((x) => {
            let item = {
                key: x,
                value: x,
            };

            sectorNameList.push(item);
        });

        rows.forEach((x) => {
            let item = {
                key: x.courseId,
                value: x.name,
            };

            courseIdList.push(item);
        });

        this.filterOption.bgName = bgNameList;
        this.filterOption.sectorName = sectorNameList;
        this.filterOption.courseName = courseIdList;

        this.loadingData.isShow = false;
        this.$store.loading$.next(this.loadingData);

        return true;
    }
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
    private async exportTable(): Promise<void> {
        this.loadingData.isShow = true;
        this.$store.loading$.next(this.loadingData);

        const sheetName = this.$i18n['Router_/w-download/course'];
        const workbook = new ExcelJs.Workbook();
        const sheet = workbook.addWorksheet(sheetName);

        this.tableItem.columns;

        const sheetColumn = this.tableItem.columns.map((x: any) => ({
            header: x.title,
            key: x?.key ?? 'no',
        }));

        let apiResult = await ServerService.GetCourseActionList(this.tableExcelApiParam);
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

        const sheetRow = apiResult.result.results.rows.map((x, index) => ({
            no: index + 1,
            bgName: x?.bgName ?? '',
            sectorName: x?.sectorName ?? '',
            courseName: x?.courseName ?? '',
            name: `${x?.firstName ?? ''} ${x?.lastName ?? ''}`,
            email: x?.email ?? '',
            timestamp: this.resolveDate(x?.timestamp ?? ''),
        }));

        sheet.columns = sheetColumn;

        sheetRow.forEach((x) => {
            sheet.addRow(x);
        });

        workbook.xlsx.writeBuffer().then((content) => {
            const link = document.createElement('a');
            const blobData = new Blob([content], {
                type: 'application/vnd.ms-excel;charset=utf-8;',
            });
            link.download = `${sheetName}.xlsx`;
            link.href = URL.createObjectURL(blobData);
            link.click();
        });

        this.loadingData.isShow = false;
        this.$store.loading$.next(this.loadingData);
    }

    private async searchData(): Promise<void> {
        this.filterData = JSON.parse(JSON.stringify({ ...this.filterDataTemp }));

        if (this.filterDataTemp['dateTime'].length > 0) {
            const startDate = this.filterDataTemp['dateTime'][0];
            const endDate = this.filterDataTemp['dateTime'][1];

            const oneWeek = 6 * 24 * 60 * 60 * 1000;

            const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());

            if (timeDiff > oneWeek) {
                this.dialogData.isShow = true;
                this.dialogData.message = this.$i18n.Common_DateTimeSearchGreatThanSevenDays_Error;
                this.dialogData.showCancelButton = false;

                return null;
            }
        }

        this.filterData['dateTime'] = [...this.filterDataTemp['dateTime']];

        this.tableItem.paging.page = 1;
        await this.tableReload();
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

        switch (this.dialogData.message) {
            case this.$i18n.Server_ERR_INVALID_PERMSSION:
                this.$router.push(WebPath.Home);
                break;
            case this.$i18n.Server_ERR_INVALID_TOKEN:
                ServerService.Logout();
                this.$router.push(WebPath.Login);
                break;
            default:
                break;
        }

        this.dialogData = JSON.parse(JSON.stringify(this.dialogDataOriginal));
    }

    private cancelDialog(): void {
        this.closeDialog();
    }

    private async confirmDialog() {
        this.dialogData.isShow = false;
        this.dialogData.isDoNextStep = true;

        switch (this.dialogData.message) {
            case this.$i18n.Server_ERR_INVALID_PERMSSION:
                this.$router.push(WebPath.Home);
                break;
            case this.$i18n.Server_ERR_INVALID_TOKEN:
                ServerService.Logout();
                this.$router.push(WebPath.Login);
                break;
            default:
                break;
        }

        this.pageToList();

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

    private resolveDate(value) {
        const date = DateTimeService.datetime2String(new Date(value * 1000), 'YYYY/MM/DD HH:mm:ss');

        return date;
    }

    //#region Table
    private async tableGetApiData(): Promise<boolean> {
        this.loadingData.isShow = true;
        this.$store.loading$.next(this.loadingData);

        let apiResult = await ServerService.GetCourseActionList(this.tableApiParam);
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

        this.tableSetData(apiResult.result.results.rows);

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
