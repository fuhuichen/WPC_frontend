<template>
    <div>
        <AicsLayoutPageTitle :text="$i18n['Router_/w-change-password']"> </AicsLayoutPageTitle>

        <div class="page">
            <AicsCardContainer variant="1px">
                <div class="pt-3 pb-3 pl-4 pr-4">
                    <AicsFormPassword :isShowOldPassword="true" @inputFormPassword="inputFormPassword" />

                    <div class="mt-4 page--form--button">
                        <AicsButton
                            variant="primary"
                            mode="filled"
                            size="14"
                            :text="$i18n.Button_Save"
                            :disabled="formSaveDisable"
                            @click="dataSave"
                        />
                    </div>
                </div>
            </AicsCardContainer>
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
//#region Import
//#region Vue
import { Vue, Component } from 'vue-property-decorator';
//#endregion

//#region Module
//#endregion

//#region Framework
import {} from '@/../helpers';
import { NotificationToastModel } from '@/../components';
//#endregion

//#region Src
import { WebPath } from '@/config';
import { ResponseFilterService, ServerService, ServerNamespace } from '@/helpers';
import {} from '@/enums';
import { FormPasswordModel } from '@/components';
import { IViews } from '@/models';
import { ILoadingData, LoadingData } from '@/stores/loading';
import { INotificationToastData, NotificationToastData } from '@/stores/notification-toast';
//#endregion

//#region Views
import { ModelsChangePassword as Model } from './models';
//#endregion

//#region Components Framework
import { AicsTextLabel, AicsLayoutPageTitle, AicsButton, AicsCardContainer, AicsDialog } from '@/../components';
//#endregion

//#region Components Src
import { AicsFormPassword } from '@/components';
//#endregion

//#region Components Views
//#endregion
//#endregion

@Component({
    components: {
        AicsTextLabel,
        AicsLayoutPageTitle,
        AicsButton,
        AicsCardContainer,
        AicsDialog,
        AicsFormPassword,
    },
})
export default class VuePageClass extends Vue {
    //#region Prop
    //#endregion

    //#region Variables
    private formDataOriginal: Model.IFormData = {
        oldPassword: undefined,
        password: undefined,
        confirmPassword: undefined,
    };
    private formData: Model.IFormData = JSON.parse(JSON.stringify(this.formDataOriginal));

    private formButtonDisabledOriginal: Model.IFormButtonDisabled = {
        oldPassword: true,
        password: true,
        confirmPassword: true,
    };
    private formButtonDisabled: Model.IFormButtonDisabled = JSON.parse(JSON.stringify(this.formButtonDisabledOriginal));

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
    private dialogData: IViews.IDialogData = JSON.parse(JSON.stringify(this.dialogDataOriginal));

    private loadingDataOriginal: ILoadingData = JSON.parse(JSON.stringify(LoadingData));
    private loadingData: ILoadingData = JSON.parse(JSON.stringify(this.loadingDataOriginal));

    private notificationToastDataOriginal: INotificationToastData = JSON.parse(JSON.stringify(NotificationToastData));
    private notificationToastData: INotificationToastData = JSON.parse(JSON.stringify(this.notificationToastDataOriginal));
    //#endregion

    //#region Computed
    private get formSaveDisable(): boolean {
        return Object.values(this.formButtonDisabled).some((x) => x === true);
    }
    //#endregion

    //#region Watch
    //#endregion

    //#region Vue Life
    private async beforeCreate(): Promise<void> {}
    private async created(): Promise<void> {}
    private async beforeMount(): Promise<void> {}
    private async mounted(): Promise<void> {}
    private async beforeDestroy(): Promise<void> {}
    private async destroyed(): Promise<void> {}
    //#endregion

    //#region Init
    //#endregion

    //#region View Event
    //#region Event form
    private inputFormPassword(formData: FormPasswordModel.IFormPasswordData, formButtonDisabled: FormPasswordModel.IFormButtonDisabled): void {
        this.formData.oldPassword = formData.oldPassword;
        this.formData.password = formData.password;

        this.formButtonDisabled.oldPassword = formButtonDisabled.oldPassword;
        this.formButtonDisabled.password = formButtonDisabled.password;
        this.formButtonDisabled.confirmPassword = formButtonDisabled.confirmPassword;
    }
    //#endregion

    //#region Dialog
    private closeDialog(): void {
        this.dialogData.isShow = false;
        this.dialogData.isDoNextStep = false;

        switch (this.dialogData.message) {
            case this.$i18n.Server_Exception_401:
            case this.$i18n.Server_Exception_403:
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

    private async confirmDialog(): Promise<void> {
        this.dialogData.isShow = false;
        this.dialogData.isDoNextStep = true;

        if (this.dialogData.isDoNextStep) {
            switch (this.dialogData.message) {
                case this.$i18n.Server_Exception_401:
                case this.$i18n.Server_Exception_403:
                    this.$router.push(WebPath.Login);
                    break;

                default:
                    break;
            }
        }

        this.dialogData = JSON.parse(JSON.stringify(this.dialogDataOriginal));
    }
    //#endregion

    //#region Event server api (save, delete, test, sync...)
    private async dataSave(): Promise<void> {
        this.loadingData.isShow = true;
        this.$store.loading$.next(this.loadingData);

        const { oldPassword, password }: Model.IFormData = this.formData;

        let param: Model.IDataSaveParam = {
            previous: oldPassword,
            current: password,
        };

        // let apiResult = await ServerService.UserPasswordUpdate(param);
        // let responseData: ServerNamespace.IServerResultError[] = [];
        // if (!!apiResult.error) {
        //     responseData = Array.isArray(apiResult.error) ? apiResult.error : [apiResult.error];
        //     this.handleServerResponse(responseData);

        //     this.loadingData.isShow = false;
        //     this.$store.loading$.next(this.loadingData);

        //     return null;
        // }

        this.loadingData.isShow = false;
        this.$store.loading$.next(this.loadingData);

        this.$router.push(WebPath.Login);
    }
    //#endregion
    //#endregion

    //#region Other Function
    //#region Form
    //#endregion

    //#region Server response
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
    //#endregion

    //#region Resolve text
    //#endregion
    //#endregion
}
</script>

<style lang="scss" scoped></style>
