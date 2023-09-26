<template>
    <div>
        <AicsLogin
            :userInfo="userInfo"
            :userInfoError="userInfoError"
            :footer="footer"
            :pagingI18n="pagingI18n"
            :isRememberMeChecked="isRememberMeChecked"
            @rememberMe="rememberMe"
            @login="login"
        >
        </AicsLogin>

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

        <AicsLoadingCircle :isShow="loadingData.isShow" :isMaskNav="true" :isFullScreen="true" />
    </div>
</template>

<script lang="ts">
//#region Import
//#region Vue
import { Vue, Component } from 'vue-property-decorator';
//#endregion

//#region Module
import * as Rx from 'rxjs';
import * as RxOperator from 'rxjs/operators';
//#endregion

//#region Framework
import {} from '@/../helpers';
import { LoginModel } from '@/../components';
//#endregion

//#region Src
import { Environment, WebPath } from '@/config';
import { ILoadingData, LoadingData } from '@/stores/loading';
import { ServerService, ServerNamespace, ResponseFilterService, UserService } from '@/helpers';
//#endregion

//#region Views
import { ModelsLogin as Model } from './models';
//#endregion

//#region Components
import { AicsLogin, AicsButton, AicsLoadingCircle, AicsDialog } from '@/../components';
//#endregion

//#region Components Src
import { IViews } from '@/models';
//#endregion

//#region Components Views
//#endregion
//#endregion

@Component({
    components: { AicsLogin, AicsButton, AicsLoadingCircle, AicsDialog },
})
export default class VuePageClass extends Vue {
    //#region Prop
    //#endregion

    //#region Variables
    private userInfo: LoginModel.IUserInfo = {
        account: '',
        password: '',
    };

    private userInfoError: LoginModel.IUserInfoError = {
        account: false,
        password: false,
        errorMessage: '',
    };

    private pagingI18n: LoginModel.IPagingI18n = {
        welcome: this.$i18n.View_Login_Welcome,
        title: this.$i18n.View_Login_Title,
        rememberMe: this.$i18n.View_Login_RememberMe,
        forgotPassword: this.$i18n.View_Login_ForgotPassword,
        loginButtonText: this.$i18n.View_Login_LoginButtonText,
        accountPlaceholder: this.$i18n.View_Login_AccountPlaceholder,
        passwordPlaceholder: this.$i18n.View_Login_PasswordPlaceholder,
        accountRequiredErrorMessage: `${this.$i18n.View_Login_AccountPlaceholder} ${this.$i18n.Form_Value_Required}`,
        passwordRequiredErrorMessage: `${this.$i18n.View_Login_PasswordPlaceholder} ${this.$i18n.Form_Value_Required}`,
    };

    private footer: LoginModel.IFooter = {
        webVersion: '1.0.0',
        serverVersion: '1.0.0',
        copyright: '© 2022 Advantech Intelligent City Services Co., Ltd. (AiCS) All Rights Reserved.',
    };

    private isRememberMeChecked: boolean = false;

    private storageRememberMeKey: string = '_Login/RememberMe';

    private loadingData: ILoadingData = JSON.parse(JSON.stringify(LoadingData));

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
    };

    private dialogData: IViews.IDialogData = { ...this.dialogDataOriginal };

    private stop$: Rx.Subject<boolean> = new Rx.Subject();
    //#endregion

    //#region Computed
    //#endregion

    //#region Watch
    //#endregion

    //#region Vue Life
    private async beforeCreate(): Promise<void> {}
    private async created(): Promise<void> {
        let userInfo: LoginModel.IUserInfo = JSON.parse(localStorage.getItem(this.storageRememberMeKey));
        if (!!userInfo) {
            this.userInfo = userInfo;
            this.isRememberMeChecked = true;
        }
    }
    private async beforeMount(): Promise<void> {}
    private async mounted(): Promise<void> {
        setTimeout(async () => {
            await this.initVersion();
        }, 0);
    }
    private async beforeDestroy(): Promise<void> {}
    private async destroyed(): Promise<void> {
        this.stop$.next();
    }
    //#endregion

    //#region Init
    private async initVersion(): Promise<void> {
        this.loadingData.isShow = true;

        // let apiResult = await ServerService.ServerInfo();
        // let responseData: ServerNamespace.IServerResultError = undefined;
        // if (!!apiResult.error) {
        //     responseData = apiResult.error;
        //     this.handleServerResponse([responseData]);

        //     this.loadingData.isShow = false;

        //     return null;
        // }

        // this.footer.webVersion = Environment.SrcVersion;
        // this.footer.serverVersion = apiResult.result.backend;

        this.loadingData.isShow = false;
    }
    //#endregion

    //#region View Event
    private rememberMe(isChecked: boolean): void {
        this.isRememberMeChecked = isChecked ? true : false;
    }

    private async login(userInfo: LoginModel.IUserInfo): Promise<void> {
        let payload: Model.IServerRequestData = { username: userInfo.account, password: userInfo.password };

        this.loadingData.isShow = true;

        let apiResult = await ServerService.Login(payload);
        let responseData: ServerNamespace.IServerResultError = undefined;
        if (!!apiResult.error) {
            responseData = apiResult.error;
            this.handleServerResponse([responseData]);

            this.loadingData.isShow = false;

            return null;
        }

        this.loadingData.isShow = false;

        let { userId, token, type }: Model.IServerResponseData = apiResult.result;

        UserService.user = {
            sessionId: token,
            user: {
                objectId: userId,
                roles: [{ objectId: userId, name: type }],
                username: type,
                name: type,
                email: undefined,
            },
        };

        if (this.isRememberMeChecked) {
            localStorage.setItem(this.storageRememberMeKey, JSON.stringify(this.userInfo));
        } else {
            localStorage.removeItem(this.storageRememberMeKey);
        }

        this.$router.push(WebPath.Home);
    }
    //#endregion

    //#region Dialog
    private async closeDialog(): Promise<void> {
        this.dialogData.isShow = false;
        this.dialogData.isDoNextStep = false;

        switch (this.dialogData.message) {
            default:
                break;
        }

        this.dialogData = JSON.parse(JSON.stringify(this.dialogDataOriginal));
    }

    private async cancelDialog(): Promise<void> {
        this.closeDialog();
    }

    private async confirmDialog(): Promise<void> {
        this.closeDialog();
    }
    //#endregion

    //#region Other Function
    private async handleServerResponse(data: ServerNamespace.IServerResultError[]): Promise<void> {
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
    }
    //#endregion
}
</script>

<style scoped lang="scss"></style>
