<template>
    <div>
        <div v-show="pageTable">
            <AicsLayoutPageTitle :text="$i18n['Router_/w-location-management']">
                <div class="page--title-tool-buttons">
                    <AicsButton
                        variant="primary"
                        mode="outline"
                        size="14"
                        :text="$i18n.Source_Camera_Button_Delete"
                        :disabled="isDisabledDeleteItemsButton"
                        @click="handleDelete"
                    />

                    <AicsButton variant="primary" mode="outline" size="14" :text="$i18n.Source_Camera_Button_Create" @click="pageToCreate" />
                </div>
            </AicsLayoutPageTitle>

            <div class="page">
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
                        <template #action="props">
                            <template>
                                <AicsButton size="14" variant="primary" mode="text" :beforeIconSrc="editSrc" @click="actionEdit(props.scope)" />

                                <AicsButton size="14" variant="primary" mode="text" :beforeIconSrc="deleteSrc" @click="actionDelete(props.scope)" />
                            </template>
                        </template>
                    </AicsTable>
                </AicsCardContainer>
            </div>
        </div>

        <div v-show="pageForm">
            <AicsLayoutPageTitle :text="formPageTitle" />

            <div class="page">
                <AicsCardContainer variant="1px">
                    <div class="page--form">
                        <div class="row-4">
                            <div>
                                <AicsTextLabel :text="$i18n.Source_Camera_Name" :required="true" />

                                <AicsInputText
                                    size="14"
                                    variant="grayscale-primary"
                                    v-model.trim="formData.name"
                                    name="name"
                                    :debounce="50"
                                    :placeholder="$i18n.Source_Camera_Name"
                                    :isWidth100Percent="true"
                                    :maxLength="20"
                                    :isError="inputErrorData.nameInputError"
                                    :errorMessage="inputErrorMessage.nameInputErrorMessage"
                                    @input="handelNameChange"
                                />
                            </div>

                            <div class="mt-3">
                                <AicsTextLabel :text="$i18n.Source_Camera_Type" :required="true" />

                                <AicsDropdown
                                    size="14"
                                    variant="grayscale-primary"
                                    v-model="formData.type"
                                    mode="outline"
                                    :allowEmpty="false"
                                    :options="filterOptions.typeOptions"
                                    :isWidth100Percent="true"
                                    :pagingI18n="pagingI18n"
                                    :placeholder="$i18n.Source_Camera_DropdownPlaceholder"
                                    :searchPlaceholder="$i18n.Source_Camera_Dropdown_SearchPlaceholder"
                                />
                            </div>

                            <div class="mt-3">
                                <AicsTextLabel :text="$i18n.Source_Camera_Inference_Modal" :required="true" />

                                <AicsDropdown
                                    size="14"
                                    variant="grayscale-primary"
                                    v-model="formData.modal"
                                    mode="outline"
                                    :allowEmpty="false"
                                    :options="filterOptions.modalOptions"
                                    :isError="inputErrorData.modalDropdownError"
                                    :isWidth100Percent="true"
                                    :pagingI18n="pagingI18n"
                                    :placeholder="$i18n.Source_Camera_DropdownPlaceholder"
                                    :searchPlaceholder="$i18n.Source_Camera_Dropdown_SearchPlaceholder"
                                    @change="handleModalChange"
                                />
                            </div>

                            <div class="mt-3" v-if="isShowDeviceInput">
                                <AicsTextLabel :text="$i18n.Source_Camera_Device" :required="true" />

                                <AicsDropdown
                                    size="14"
                                    variant="grayscale-primary"
                                    v-model="formData.device"
                                    mode="outline"
                                    :allowEmpty="false"
                                    :options="filterOptions.deviceOptions"
                                    :isError="inputErrorData.deviceDropdownError"
                                    :isWidth100Percent="true"
                                    :pagingI18n="pagingI18n"
                                    :placeholder="$i18n.Source_Camera_DropdownPlaceholder"
                                    :searchPlaceholder="$i18n.Source_Camera_Dropdown_SearchPlaceholder"
                                    @change="handleDeviceChange"
                                />
                            </div>

                            <div class="mt-3" v-else>
                                <AicsTextLabel :text="$i18n.Source_Camera_Enum_ECameraType_RTSP" :required="true" />

                                <AicsInputText
                                    size="14"
                                    variant="grayscale-primary"
                                    v-model="formData.rtsp"
                                    name="rtsp"
                                    :debounce="50"
                                    :placeholder="$i18n.Source_Camera_RTSP_Placeholder"
                                    :isWidth100Percent="true"
                                    :isError="inputErrorData.rtspInputError"
                                    :errorMessage="inputErrorMessage.rtspInputErrorMessage"
                                    @input="handelRtspChange"
                                />
                            </div>

                            <div class="mt-3">
                                <AicsTextLabel :text="$i18n.Source_Camera_Remark" />

                                <AicsInputText
                                    size="14"
                                    variant="grayscale-primary"
                                    v-model="formData.remark"
                                    name="remark"
                                    :debounce="50"
                                    :placeholder="$i18n.Source_Camera_Remark"
                                    :isWidth100Percent="true"
                                />
                            </div>

                            <div class="mt-3">
                                <AicsTextLabel :text="$i18n.Source_Camera_Note" />

                                <div class="textarea-box">
                                    <AicsInputTextarea
                                        size="14"
                                        variant="grayscale-primary"
                                        v-model="formData.note"
                                        :placeholder="$i18n.Source_Camera_Note"
                                        :isWidth100Percent="true"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="page--form--button">
                            <AicsButton class="mr-2" variant="primary" mode="outline" size="14" :text="$i18n.Button_Cancel" @click="handleCancel" />

                            <AicsButton
                                variant="primary"
                                mode="filled"
                                size="14"
                                :text="$i18n.Button_Save"
                                :disabled="isDisableSaveButton"
                                @click="handleSave"
                            />
                        </div>
                    </div>
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
//#endregion

//#region Framework
import {} from '@/../helpers';
import { TableModel, DropdownModel, NotificationToastModel, DialogModel } from '@/../components';
//#endregion

//#region Src
import {} from '@/config';
import { EPageStep, EPageAction } from '@/enums';
import { ResponseFilterService, UtilityService, ServerNamespace, ServerService, RegexService } from '@/helpers';
import { IViews } from '@/models';
import { ILoadingData, LoadingData } from '@/stores/loading';
import { INotificationToastData, NotificationToastData } from '@/stores/notification-toast';
//#endregion

//#region Views
import { ModelsLocation as Model } from './models';
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
    AicsDropdown,
    AicsInputTextarea,
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
        AicsDropdown,
        AicsInputTextarea,
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
        sorting: { field: '', orderEnum: TableModel.ESorting.none, order: 1 },

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

    private formDataOriginal: Model.IFormData = {
        name: '',
        type: {
            key: ServerNamespace.ISourceCameraType.RTSP,
            value: this.$i18n[`Source_Camera_Enum_ECameraType_${ServerNamespace.ISourceCameraType.RTSP}`],
        },
        modal: null,
        rtsp: '',
        device: null,
        remark: '',
        note: '',
    };

    private formData: Model.IFormData = JSON.parse(JSON.stringify({ ...this.formDataOriginal }));

    private filterOptions: Model.IFilterOptions = {
        typeOptions: [],
        modalOptions: [],
        deviceOptions: [],
    };

    private pagingI18n: DropdownModel.IPagingI18n = {
        selectAll: this.$i18n.Source_Camera_Dropdown_SelectAll,
        maxElements: this.$i18n.Source_Camera_Dropdown_MaxElements,
        noResult: this.$i18n.Source_Camera_Dropdown_NoResult,
        noOptions: this.$i18n.Source_Camera_Dropdown_NoOptions,
    };

    private inputErrorDataOriginal: Model.IInputError = {
        nameInputError: false,
        rtspInputError: false,
        modalDropdownError: false,
        deviceDropdownError: false,
    };

    private inputErrorData: Model.IInputError = { ...this.inputErrorDataOriginal };

    private inputErrorMessage: Model.IInputErrorMessage = {
        nameInputErrorMessage: '',
        rtspInputErrorMessage: '',
    };

    private saveButtonDisableOriginal: Model.ISaveButtonDisable = {
        name: true,
        rtsp: true,
        modal: true,
        device: true,
    };

    private saveButtonDisable: Model.ISaveButtonDisable = { ...this.saveButtonDisableOriginal };

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

    private editSrc: string = require('@/assets/images/icon/action/edit/normal.svg');
    private deleteSrc: string = require('@/assets/images/icon/action/delete/normal.svg');

    private stop$: Rx.Subject<boolean> = new Rx.Subject();
    //#endregion

    //#region Computed
    private get formPageTitle(): string {
        if (!!this.formData.name) {
            return this.formData.name;
        }

        if (this.pageItem.action === EPageAction.create) {
            return this.$i18n['Source_Camera_Create'];
        }

        if (this.pageItem.action === EPageAction.edit) {
            return this.$i18n['Source_Camera_Edit'];
        }
    }

    private get selectedItems(): Model.ITableData[] {
        return this.tableItem.data.filter((n) => !!n.isChecked);
    }

    private get isDisabledDeleteItemsButton(): boolean {
        return this.selectedItems.length === 0;
    }

    private get pageTable(): boolean {
        return this.pageItem.page === EPageStep.table;
    }

    private get pageForm(): boolean {
        return this.pageItem.page === EPageStep.form;
    }

    private get tableApiParam(): Model.ITableApiParam {
        let tempTableApiParam: Model.ITableApiParam = {};

        tempTableApiParam.paging = { page: this.tableItem.paging.page, pageSize: this.tableItem.paging.pageSize };

        if (this.tableItem.sorting?.orderEnum !== TableModel.ESorting.none) {
            tempTableApiParam.sorting = { field: this.tableItem.sorting?.field, order: this.tableItem.sorting?.order };
        }

        return tempTableApiParam;
    }

    private get isShowDeviceInput(): boolean {
        return this.formData.type.key === ServerNamespace.ISourceCameraType.Webcam;
    }

    private get isDisableSaveButton(): boolean {
        if (this.formData.type.key === ServerNamespace.ISourceCameraType.RTSP) {
            if (this.saveButtonDisable.name || this.saveButtonDisable.rtsp || this.saveButtonDisable.modal) {
                return true;
            }
        } else if (this.formData.type.key === ServerNamespace.ISourceCameraType.Webcam) {
            if (this.saveButtonDisable.name || this.saveButtonDisable.modal || this.saveButtonDisable.device) {
                return true;
            }
        }

        return false;
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
                        await this.initOptions();
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
            { type: 'field', title: this.$i18n.Source_Camera_Name, key: 'name' },
            { type: 'field', title: this.$i18n.Source_Camera_Type, key: 'type' },
            { type: 'field', title: this.$i18n.Source_Camera_Inference_Modal, key: 'modal' },
            { type: 'field', title: this.$i18n.Source_Camera_Remark, key: 'remark' },
            { type: 'field', title: this.$i18n.Source_Camera_Action, key: 'action', useSlot: true },
        ];
    }

    private async initTable(): Promise<void> {
        this.initTableColumns();
    }
    //#endregion

    //#region Init form
    //#endregion

    //#region Init select option
    private async initOptions(): Promise<void> {
        let typeOptions = [
            {
                key: ServerNamespace.ISourceCameraType.RTSP,
                value: this.$i18n[`Source_Camera_Enum_ECameraType_${ServerNamespace.ISourceCameraType.RTSP}`],
            },
            {
                key: ServerNamespace.ISourceCameraType.Webcam,
                value: this.$i18n[`Source_Camera_Enum_ECameraType_${ServerNamespace.ISourceCameraType.Webcam}`],
            },
        ];

        let modalOptions = [
            { key: 'Yolo V4', value: 'Yolo V4' },
            { key: 'Another', value: 'Another' },
        ];

        let deviceOptions = [
            { key: 'device 1', value: 'device 1' },
            { key: 'device 2', value: 'device 2' },
            { key: 'device 3', value: 'device 3' },
            { key: 'device 4', value: 'device 4' },
        ];

        this.filterOptions.typeOptions = typeOptions;
        this.filterOptions.modalOptions = modalOptions;
        this.filterOptions.deviceOptions = deviceOptions;
    }
    //#endregion
    //#endregion

    //#region View Event
    //#region Event page
    private async pageToList(): Promise<void> {
        this.pageItem.page = EPageStep.table;
        this.pageItem.action = EPageAction.list;

        await this.initOptions();
        await this.tableReload();

        this.$store.routerAction$.next('');

        this.formDataClear();
    }

    private async pageToCreate(): Promise<void> {
        UtilityService.ScrollToTop();

        this.pageItem.page = EPageStep.form;
        this.pageItem.action = EPageAction.create;

        this.$store.routerAction$.next(this.$i18n['Router_/create']);

        this.formDataClear();
    }

    private async pageToEdit(value: Model.ITableData): Promise<void> {
        UtilityService.ScrollToTop();

        this.pageItem.page = EPageStep.form;
        this.pageItem.action = EPageAction.edit;

        this.$store.routerAction$.next(this.$i18n['Router_/edit']);

        this.formDataClear();

        if (value.name) {
            this.formData.name = value['name'];
        }

        if (value.type) {
            this.formData['type'] = {
                key: ServerNamespace.ISourceCameraType[value['type']],
                value: this.$i18n[`Source_Camera_Enum_ECameraType_${ServerNamespace.ISourceCameraType[value['type']]}`],
            };
        }

        if (value.modal) {
            this.formData.modal = { key: value['modal'], value: value['modal'] };
        }

        if (value.rtsp) {
            this.formData.rtsp = value['rtsp'];
        }

        if (value.device) {
            this.formData.device = { key: value['device'], value: value['device'] };
        }

        if (value.remark) {
            this.formData.remark = value['remark'];
        }

        if (value.note) {
            this.formData.note = value['note'];
        }

        this.validateForm();
    }
    //#endregion

    //#region Event input
    private handelNameChange(): void {
        if (!!this.formData.name) {
            this.inputErrorData.nameInputError = false;

            this.saveButtonDisable.name = false;

            this.inputErrorMessage.nameInputErrorMessage = '';
        } else {
            this.inputErrorData.nameInputError = true;

            this.saveButtonDisable.name = true;

            this.inputErrorMessage.nameInputErrorMessage = `${this.$i18n.Source_Camera_Name} ${this.$i18n.Form_Value_Required}`;
        }
    }

    private handleModalChange(): void {
        if (this.formData.modal) {
            this.saveButtonDisable.modal = false;
        } else {
            this.saveButtonDisable.modal = true;
        }
    }

    private handleDeviceChange(): void {
        if (this.formData.device) {
            this.saveButtonDisable.device = false;
        } else {
            this.saveButtonDisable.device = true;
        }
    }

    private handelRtspChange(): void {
        if (this.formData.type.key === ServerNamespace.ISourceCameraType.Webcam) {
            return null;
        }

        if (!!this.formData.rtsp) {
            if (new RegExp(RegexService.rtsp()).test(this.formData.rtsp)) {
                this.inputErrorData.rtspInputError = false;

                this.saveButtonDisable.rtsp = false;

                this.inputErrorMessage.rtspInputErrorMessage = '';
            } else {
                this.inputErrorData.rtspInputError = true;

                this.saveButtonDisable.rtsp = true;

                this.inputErrorMessage.rtspInputErrorMessage = this.$i18n.Source_Camera_RTSP_Regex_Error;
            }
        } else {
            this.inputErrorData.rtspInputError = true;

            this.saveButtonDisable.rtsp = true;

            this.inputErrorMessage.rtspInputErrorMessage = `${this.$i18n.Source_Camera_Enum_ECameraType_RTSP} ${this.$i18n.Form_Value_Required}`;
        }
    }
    //#endregion

    //#region Event button
    private handleDelete(): void {
        this.handleDeleteAsking();
    }

    private handleCancel(): void {
        this.formDataClear();

        this.pageToList();
    }

    private async handleSave(): Promise<void> {
        this.pageToList();
    }

    //#region Event table button
    private async actionEdit(value: Model.ITableData): Promise<void> {
        this.pageToEdit(value);
    }

    private async actionDelete(value: Model.ITableData): Promise<void> {
        this.handleDeleteAsking();
    }
    //#endregion
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
    private validateForm(): void {
        this.handelNameChange();
        this.handelRtspChange();
        this.handleModalChange();
        this.handleDeviceChange();
    }

    private handleDeleteAsking(): void {
        this.dialogData.isShow = true;
        this.dialogData.title = this.$i18n.Source_Camera_DialogDelete_Title;
        this.dialogData.type = 'warning';
        this.dialogData.showCancelButton = true;

        if (this.selectedItems.length > 1) {
            this.dialogData.message = this.$i18n.Source_Camera_DialogDelete_Message_items;
        } else {
            this.dialogData.message = this.$i18n.Source_Camera_DialogDelete_Message_item;
        }
    }

    private formDataClear(): void {
        this.formData = JSON.parse(JSON.stringify({ ...this.formDataOriginal }));

        this.inputErrorData = JSON.parse(JSON.stringify({ ...this.inputErrorDataOriginal }));

        this.saveButtonDisable = JSON.parse(JSON.stringify({ ...this.saveButtonDisableOriginal }));
    }

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

        if (!toastMessage) return null;

        const toastMsg: string = `${toastMessage}. ${this.$i18n.Common_SuccessCount}: ${responseSortData.success}`;

        if (responseSortData.total === responseSortData.success) {
            this.handleNotificationToastData(toastMsg);

            await this.pageToList();
        }
    }

    private handleNotificationToastData(message: string, type: NotificationToastModel.TType = 'successful'): void {
        this.notificationToastData.notifications = [];

        if (type !== 'custom') {
            this.notificationToastData.notifications.push({ type: type, text: message });
        }

        this.$store.notificationToast$.next(this.notificationToastData);

        this.notificationToastData = JSON.parse(JSON.stringify(this.notificationToastDataOriginal));
    }

    //#region Table
    private async tableGetApiData(): Promise<boolean> {
        this.loadingData.isShow = true;
        this.$store.loading$.next(this.loadingData);

        let apiResult = await ServerService.SourceCameraReads(this.tableApiParam);
        let responseData: ServerNamespace.IServerResultError = undefined;
        if (!!apiResult.error) {
            responseData = apiResult.error;
            this.handleServerResponse([responseData]);

            this.loadingData.isShow = false;
            this.$store.loading$.next(this.loadingData);

            return false;
        }

        this.tableItem.paging = apiResult.result.paging;

        this.tableSetData(apiResult.result.results);

        this.loadingData.isShow = false;
        this.$store.loading$.next(this.loadingData);

        return true;
    }

    private tableSetData(result: Model.IServerResponseData[]): void {
        let tableData: Model.ITableData[] = [];
        (result || []).forEach((element: Model.IServerResponseData) => {
            if (element.type === ServerNamespace.ISourceCameraType.RTSP) {
                tableData.push({
                    objectId: element.objectId ?? '',
                    name: element.name ?? '',
                    type: element.type ?? '',
                    modal: element.modal ?? '',
                    rtsp: element.rtsp ?? '',
                    remark: element.remark ?? '',
                    isChecked: '',
                    note: element.note ?? '',
                });
            } else if (element.type === ServerNamespace.ISourceCameraType.Webcam) {
                tableData.push({
                    objectId: element.objectId ?? '',
                    name: element.name ?? '',
                    type: element.type ?? '',
                    modal: element.modal ?? '',
                    device: element.device ?? '',
                    remark: element.remark ?? '',
                    isChecked: '',
                    note: element.note ?? '',
                });
            }
        });

        this.tableItem.data = tableData;
    }
    //#endregion
    //#endregion
}
</script>

<style lang="scss" scoped></style>
