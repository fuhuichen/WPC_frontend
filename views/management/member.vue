<template>
    <div>
        <div v-show="pageTable">
            <AicsLayoutPageTitle :text="$i18n['Router_/w-user-management']">
                <div class="page--title-tool-buttons">
                    <AicsButton variant="secondary" mode="filled" size="14" :text="$i18n.Common_Create" @click="pageToCreate" />
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
                                <AicsButton
                                    size="14"
                                    variant="primary"
                                    mode="outline"
                                    :text="$i18n.Button_Edit"
                                    class="mr-2"
                                    @click="actionEdit(props.scope)"
                                />

                                <AicsButton size="14" variant="error" mode="outline" :text="$i18n.Button_Delete" @click="actionDelete(props.scope)" />
                            </template>
                        </template>
                    </AicsTable>
                </AicsCardContainer>
            </div>
        </div>

        <AicsModal customClass="modal-width-600" :isShow="showModal" :title="modalTitle" @close="closeModal">
            <template #body>
                <div>
                    <AicsTextLabel :text="$i18n.Management_Member_Type" :required="!isEdit" />

                    <AicsDropdown
                        size="14"
                        variant="grayscale-primary"
                        v-model="formData.type"
                        mode="outline"
                        :allowEmpty="false"
                        :options="filterOptions.typeOptions"
                        :isWidth100Percent="true"
                        :pagingI18n="pagingI18n"
                        :placeholder="$i18n.Multiselect_DropdownPlaceholder"
                        :searchPlaceholder="$i18n.Multiselect_Dropdown_SearchPlaceholder"
                        :readonly="isEdit"
                    />
                </div>

                <div class="mt-2">
                    <AicsTextLabel :text="$i18n.Management_Member_Name" :required="!isEdit" />

                    <AicsInputText
                        size="14"
                        variant="grayscale-primary"
                        v-model.trim="formData.name"
                        name="name"
                        :debounce="50"
                        :placeholder="$i18n.Management_Member_Name"
                        :isWidth100Percent="true"
                        :isError="inputErrorData.name"
                        :errorMessage="inputErrorMessage.name"
                        @input="inputName"
                    />
                </div>

                <div class="mt-2">
                    <AicsTextLabel :text="$i18n.Management_Member_Email" :required="!isEdit" />

                    <AicsInputText
                        size="14"
                        variant="grayscale-primary"
                        v-model.trim="formData.email"
                        name="email"
                        :readonly="isEdit"
                        :debounce="50"
                        :placeholder="$i18n.Management_Member_Email"
                        :isWidth100Percent="true"
                        :isError="inputErrorData.email"
                        :errorMessage="inputErrorMessage.email"
                        @input="inputEmail"
                    />
                </div>

                <div class="mt-2">
                    <AicsTextLabel :text="$i18n.Management_Member_Password" :required="!isEdit" />

                    <AicsInputText
                        size="14"
                        variant="grayscale-primary"
                        v-model.trim="formData.password"
                        name="password"
                        :debounce="50"
                        :placeholder="$i18n.Management_Member_Password"
                        :isWidth100Percent="true"
                        :isError="inputErrorData.password"
                        :errorMessage="inputErrorMessage.password"
                        @input="inputPassword"
                    />
                </div>

                <div class="mt-2">
                    <AicsTextLabel :text="$i18n.Management_Member_Note" />

                    <AicsInputTextarea
                        size="14"
                        variant="grayscale-primary"
                        v-model.trim="formData.note"
                        name="note"
                        :debounce="50"
                        :placeholder="$i18n.Management_Member_Note"
                        :isWidth100Percent="true"
                    />
                </div>
            </template>

            <template #footer>
                <div>
                    <AicsButton
                        :text="$i18n.Button_Cancel"
                        variant="grayscale-highlight"
                        mode="text"
                        style="margin-right: 16px"
                        @click="closeModal"
                    />

                    <AicsButton :text="$i18n.Button_Confirm" @click="confirmModal" :disabled="disableSaveButton" />
                </div>
            </template>
        </AicsModal>

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
import { ModelsMember as Model } from './models';
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
    AicsModal,
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
        AicsModal,
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
        type: { key: 'user', value: 'User' },
        userId: '',
        name: '',
        email: '',
        password: '',
        note: '',
    };

    private formData: Model.IFormData = JSON.parse(JSON.stringify({ ...this.formDataOriginal }));

    private pagingI18n: DropdownModel.IPagingI18n = {
        selectAll: this.$i18n.Multiselect_SelectAll,
        maxElements: this.$i18n.Multiselect_MaxElements,
        noResult: this.$i18n.Multiselect_NoResult,
        noOptions: this.$i18n.Multiselect_ListIsEmpty,
    };

    private inputErrorDataOriginal: Model.IInputError = {
        email: false,
        password: false,
        name: false,
    };

    private inputErrorData: Model.IInputError = { ...this.inputErrorDataOriginal };

    private inputErrorMessage: Model.IInputErrorMessage = {
        name: '',
        email: '',
        password: '',
    };

    private saveButtonDisableOriginal: Model.ISaveButtonDisable = {
        name: true,
        email: true,
        password: true,
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

    private showModal: boolean = false;
    private modalTitle: string = this.$i18n.Common_Edit;
    private isEdit: boolean = false;

    private filterOptions: Model.IFilterOptions = {
        typeOptions: [
            { key: 'manager', value: 'Manager' },
            { key: 'user', value: 'User' },
        ],
    };

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

        return tempTableApiParam;
    }

    private get disableSaveButton(): boolean {
        return Object.values(this.saveButtonDisable).some((x) => x === true);
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
            { type: 'field', title: this.$i18n.Management_Member_Name, key: 'name' },
            { type: 'field', title: this.$i18n.Management_Member_Email, key: 'email' },
            { type: 'field', title: this.$i18n.Management_Member_Note, key: 'note' },
            { type: 'field', title: this.$i18n.Common_Action, key: 'action', useSlot: true },
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

        this.formDataClear();
    }

    private async pageToCreate(): Promise<void> {
        this.modalTitle = this.$i18n.Common_Create;
        this.isEdit = false;

        this.formDataClear();

        this.formData = JSON.parse(JSON.stringify({ ...this.formDataOriginal }));

        this.showModal = true;
    }

    private async pageToEdit(value: Model.ITableData): Promise<void> {
        this.modalTitle = this.$i18n.Common_Edit;
        this.isEdit = true;
        this.formData.userId = value.userId;
        this.formData.name = value.name;
        this.formData.email = value.email;
        this.formData.note = value.note;
        this.formData.type = { key: value.type, value: value.type };
        this.formData.password = '';

        this.saveButtonDisable.name = false;
        this.saveButtonDisable.email = false;
        this.saveButtonDisable.password = false;

        this.showModal = true;
    }

    private closeModal() {
        this.showModal = false;
    }

    private async confirmModal() {
        let res;
        let responseData: ServerNamespace.IServerResultError = undefined;

        if (this.isEdit) {
            let payload = {
                userId: this.formData.userId,
                password: this.formData.password,
                name: this.formData.name,
                note: this.formData.note,
            };

            res = await ServerService.UpdateUser(payload);
        } else {
            let payload = {
                type: this.formData.type.key,
                email: this.formData.email,
                password: this.formData.password,
                name: this.formData.name,
                note: this.formData.note,
            };

            res = await ServerService.CreateUser(payload);
        }

        this.showModal = false;

        if (res.result.errorcode && res.result.errorcode !== 0) {
            responseData = {
                statusCode: res.result.errorcode,
                message: res.result.error_msg,
            };

            this.handleServerResponse([responseData]);

            this.loadingData.isShow = false;

            return null;
        }

        this.pageToList();
    }
    //#endregion

    //#region Event input
    private inputName(): void {
        if (this.isEdit) return null;

        if (!!this.formData.name) {
            this.inputErrorData.name = false;
            this.saveButtonDisable.name = false;
            this.inputErrorMessage.name = '';
        } else {
            this.inputErrorData.name = true;
            this.saveButtonDisable.name = true;
            this.inputErrorMessage.name = `${this.$i18n.Management_Member_Name} ${this.$i18n.Form_Value_Required}`;
        }
    }
    private inputEmail(): void {
        if (this.isEdit) return null;

        if (!!this.formData.email) {
            this.inputErrorData.email = false;
            this.saveButtonDisable.email = false;
            this.inputErrorMessage.email = '';
        } else {
            this.inputErrorData.email = true;
            this.saveButtonDisable.email = true;
            this.inputErrorMessage.email = `${this.$i18n.Management_Member_Email} ${this.$i18n.Form_Value_Required}`;
        }
    }
    private inputPassword(): void {
        if (this.isEdit) return null;

        if (!!this.formData.password) {
            this.inputErrorData.password = false;
            this.saveButtonDisable.password = false;
            this.inputErrorMessage.password = '';
        } else {
            this.inputErrorData.password = true;
            this.saveButtonDisable.password = true;
            this.inputErrorMessage.password = `${this.$i18n.Management_Member_Password} ${this.$i18n.Form_Value_Required}`;
        }
    }
    //#endregion

    //#region Event button

    //#region Event table button
    private async actionEdit(value: Model.ITableData): Promise<void> {
        this.pageToEdit(value);
    }

    private async actionDelete(value: Model.ITableData): Promise<void> {
        this.handleDeleteAsking(value);
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

    private async confirmDialog() {
        this.dialogData.isShow = false;
        this.dialogData.isDoNextStep = true;

        let payload = {
            userId: this.formData.userId,
        };

        switch (this.dialogData.message) {
            case this.$i18n.Dialog_DeleteMessage_items:
                let res = await ServerService.DeleteUser(payload);

                if (res.result.errorcode !== 0) {
                    this.dialogData.isShow = true;
                    this.dialogData.message = res.result.message;
                    this.dialogData.showCancelButton = false;

                    return false;
                }
                break;

            default:
        }

        this.pageToList();

        this.dialogData = JSON.parse(JSON.stringify(this.dialogDataOriginal));
    }
    //#endregion

    //#region Event server api (save, delete, test, sync...)
    //#endregion
    //#endregion

    //#region Other Function
    private validateForm(): void {
        this.inputName();
    }

    private handleDeleteAsking(value): void {
        this.dialogData.isShow = true;
        this.dialogData.title = this.$i18n.Dialog_Question;
        this.dialogData.type = 'warning';
        this.dialogData.showCancelButton = true;

        this.formData.userId = value.userId;

        this.dialogData.message = this.$i18n.Dialog_DeleteMessage_items;
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

        let apiResult = await ServerService.GetUserList(this.tableApiParam);

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
