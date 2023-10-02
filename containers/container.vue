<template>
    <div>
        <AicsLayoutHeader :title="headerTitle" :breadcrumbs="headerBreadcrumbs" @breadcrumbClick="headerBreadcrumbClick" />

        <AicsLayoutBody>
            <router-view></router-view>
        </AicsLayoutBody>

        <AicsLayoutNav
            :logoSubtitle="navLogoSubtitle"
            :isShowBrand="false"
            :homeHref="navHomeHref"
            :navList="navLists"
            :userName="navUserName"
            :userActions="navUserActions"
            :userFooter="navUserFooter"
            :userRule="navUserRule"
            @userActionClick="navUserActionClick"
            @pathChange="navPathChange"
        />

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

        <!-- <AicsLoadingCircle :isShow="loadingData.isShow" :isMaskNav="isMaskNav" :isFullScreen="isFullScreen" />

        <AicsNotificationToast v-model="notificationToastData.notifications" :duration="notificationToastData.duration" /> -->
    </div>
</template>

<script lang="ts">
//#region Import
//#region Vue
import { Vue, Component } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
//#endregion

//#region Module
import * as Rx from 'rxjs';
import * as RxOperator from 'rxjs/operators';
//#endregion

//#region Framework
import { I18nService, I18nNamespace } from '@/../helpers';
import { LayoutNavModel, LayoutHeaderModel, UserControlNavModel } from '@/../components';
//#endregion

//#region Src
import { WebPath, NavSystemAdministratorListOriginal } from '@/config';
import { ResponseFilterService, ServerService, ServerNamespace, UserService, UserNamespace } from '@/helpers';
import { IViews } from '@/models';
import { EUserRole } from '@/enums';
import { INotificationToastData, NotificationToastData } from '@/stores/notification-toast';
import { ILoadingData, LoadingData } from '@/stores/loading';
import { Environment } from '@/config';
//#endregion

//#region Views
//#endregion

//#region Components
import { AicsLayoutNav, AicsLayoutHeader, AicsLayoutBody, AicsNotificationToast, AicsLoadingCircle, AicsDialog } from '@/../components';
//#endregion

//#region Components Src
//#endregion

//#region Components Views
//#endregion
//#endregion

@Component({
    components: { AicsLayoutNav, AicsLayoutHeader, AicsLayoutBody, AicsNotificationToast, AicsLoadingCircle, AicsDialog },
})
export default class VuePageClass extends Vue {
    //#region Prop
    //#endregion

    //#region Variables
    private user: UserNamespace.IUser = undefined;

    private headerTitle: string = '';
    private headerBreadcrumbs: LayoutHeaderModel.IBreadcrumb[] = [];
    private headerBreadcrumbPaths: string[] = [];

    private navLogoSubtitle: string = 'WPC iEvent';
    private navHomeHref: string = WebPath.Home;
    private navLists: LayoutNavModel.IList[] = [];
    private navUserName: string = '';
    private navUserRule: string = '';
    private navUserActions: UserControlNavModel.IAction[] = [];
    private navUserFooter: UserControlNavModel.IFooter = {
        webVersion: '1.0.0',
        serverVersion: '1.0.0',
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
    };
    private dialogData: IViews.IDialogData = { ...this.dialogDataOriginal };

    private loadingData: ILoadingData = JSON.parse(JSON.stringify(LoadingData));
    private notificationToastData: INotificationToastData = JSON.parse(JSON.stringify(NotificationToastData));

    private isMaskNav: boolean = false;
    private isFullScreen: boolean = true;

    private routerRedirectPaths: object = {};
    private routerCurrentPath: string = '';
    private isRouterPush: boolean = false;

    private stop$: Rx.Subject<boolean> = new Rx.Subject();
    //#endregion

    //#region Computed
    //#endregion

    //#region Watch
    //#endregion

    //#region Vue Life
    private async beforeCreate(): Promise<void> {}
    private async created(): Promise<void> {}
    private async beforeMount(): Promise<void> {}
    private async mounted(): Promise<void> {
        this.initRouterRedirectPath();

        this.$store.routerReload$
            .pipe(
                RxOperator.filter((n) => !!n),
                RxOperator.takeUntil(this.stop$),
                RxOperator.concatMap(async (x) => {
                    if (this.routerCurrentPath !== x) {
                        this.routerCurrentPath = x;
                        this.isRouterPush = true;
                    }

                    let tempreadcrumbPaths: string[] = [];
                    let paths: LayoutHeaderModel.IBreadcrumb[] = x
                        .split('/')
                        .filter((n) => !!n)
                        .reduce((prev, curr, i) => prev.concat(`${!prev[i - 1] ? '' : prev[i - 1]}/${curr}`), [])
                        .map((n) => {
                            tempreadcrumbPaths.push(n);
                            return {
                                text: this.$i18n[`Router_${n}`],
                            } as LayoutHeaderModel.IBreadcrumb;
                        });

                    if (paths.length > 0) {
                        this.headerTitle = paths[0].text;

                        if (paths.length > 1) {
                            this.headerBreadcrumbs = paths.slice(1);
                            this.headerBreadcrumbPaths = tempreadcrumbPaths.slice(1);
                        } else {
                            this.headerBreadcrumbs = [];
                            this.headerBreadcrumbPaths = [];
                        }
                    }
                }),
            )
            .subscribe();

        this.$store.routerAction$
            .pipe(
                RxOperator.filter((n) => n !== null && n !== undefined),
                RxOperator.takeUntil(this.stop$),
                RxOperator.concatMap(async (x) => {
                    if (!!x) {
                        this.headerBreadcrumbs.push({ text: x, isDisabled: true });
                    } else {
                        this.headerBreadcrumbs = this.headerBreadcrumbs.filter((n) => !n.isDisabled);
                    }
                }),
            )
            .subscribe();

        this.$store.notificationToast$
            .pipe(
                RxOperator.takeUntil(this.stop$),
                RxOperator.concatMap(async (x) => {
                    this.notificationToastData = JSON.parse(JSON.stringify(x));
                }),
            )
            .subscribe();

        this.$store.loading$
            .pipe(
                RxOperator.takeUntil(this.stop$),
                RxOperator.concatMap(async (x) => {
                    this.loadingData = JSON.parse(JSON.stringify(x));

                    switch (this.loadingData.mode) {
                        case 'reload-page':
                            this.isMaskNav = false;
                            this.isFullScreen = true;
                            break;

                        case 'initialization':
                            this.isMaskNav = true;
                            this.isFullScreen = true;
                            break;

                        default:
                            break;
                    }
                }),
            )
            .subscribe();

        setTimeout(async () => {
            // await this.initVersion();
        }, 0);

        this.initUser();
    }
    private async beforeDestroy(): Promise<void> {}
    private async destroyed(): Promise<void> {
        this.stop$.next();
    }
    //#endregion

    //#region Init
    private initNavList(): LayoutNavModel.IList[];
    private initNavList(navLists: LayoutNavModel.IList[]): LayoutNavModel.IList[];
    private initNavList(navLists?: LayoutNavModel.IList[]): LayoutNavModel.IList[] {
        let isDeepZero: boolean = true;

        if (!navLists) {
            isDeepZero = false;

            if (this.user.user.roles.some((n) => n.name === EUserRole.Administrator)) {
                navLists = JSON.parse(JSON.stringify(NavSystemAdministratorListOriginal));
            } else if (this.user.user.roles.some((n) => n.name === EUserRole.Manager)) {
                navLists = JSON.parse(JSON.stringify(NavSystemAdministratorListOriginal)).filter((item) => {
                    if (!!item.auth) {
                        return item.auth.includes(EUserRole.Manager);
                    } else {
                        return item;
                    }
                });
            } else if (this.user.user.roles.some((n) => n.name === EUserRole.User)) {
                navLists = JSON.parse(JSON.stringify(NavSystemAdministratorListOriginal)).filter((item) => {
                    if (!!item.auth) {
                        return item.auth.includes(EUserRole.User);
                    } else {
                        return item;
                    }
                });
            } else {
                console.error('user role not allow');
                return null;
            }
        }

        let _navLists: LayoutNavModel.IList[] = [];
        for (let nav of navLists) {
            nav.title = this.$i18n[nav.titleI18nKey];

            if (!!nav.child) {
                nav.child = this.initNavList(nav.child);
            }

            _navLists.push(nav);
        }

        if (!isDeepZero) {
            this.navLists = _navLists;
            this.$store.navLists$.next(_navLists);
        }

        return _navLists;
    }

    private async initVersion(): Promise<void> {
        this.loadingData.isShow = true;

        let apiResult = await ServerService.ServerInfo();
        let responseData: ServerNamespace.IServerResultError = undefined;
        if (!!apiResult.error) {
            responseData = apiResult.error;
            this.handleServerResponse([responseData]);

            this.loadingData.isShow = false;

            return null;
        }

        this.navUserFooter.webVersion = Environment.SrcVersion;
        this.navUserFooter.serverVersion = apiResult.result.backend;

        this.loadingData.isShow = false;
    }
    private initUser(): void {
        this.user = UserService.user;

        if (!this.user) {
            this.$router.push(WebPath.Login);
            return null;
        }

        this.navUserRule = this.$i18n[`Role_Enum_EUserRole_${this.user.user.roles[0].name}`];

        this.initNavList();

        this.navUserName = this.user.user.name;

        if (this.user.user.roles.some((n) => n.name !== EUserRole.Administrator)) {
            this.navUserActions = [
                this.$i18n.User_ChangePassword,
                {
                    groupName: this.$i18n.User_Language,
                    actions: I18nNamespace.I18nOptions.map((n) => n.value),
                },
                this.$i18n.User_Logout,
            ];
        }

        if (this.user.user.roles.some((n) => n.name === EUserRole.Administrator)) {
            this.navUserActions = [
                {
                    groupName: this.$i18n.User_Language,
                    actions: I18nNamespace.I18nOptions.map((n) => n.value),
                },
                this.$i18n.User_Logout,
            ];
        }
    }

    private initRouterRedirectPath(): object;
    private initRouterRedirectPath(routers: RouteConfig[]): object;
    private initRouterRedirectPath(routers?: RouteConfig[]): object {
        let _routers: RouteConfig[] = routers ?? this.$router.options.routes;

        let nameDirectory: object = {};
        for (let router of _routers) {
            if (!!router.redirect) {
                this.routerRedirectPaths[router.path] = router.redirect['name'];
            }
            if (!!router.name) {
                nameDirectory[router.name] = router.path;
            }
            if (!!router.children) {
                let _nameDirectory = this.initRouterRedirectPath(router.children);
                nameDirectory = {
                    ...nameDirectory,
                    ..._nameDirectory,
                };
            }
        }

        if (!routers) {
            Object.keys(this.routerRedirectPaths).forEach((value, index, array) => {
                this.routerRedirectPaths[value] = nameDirectory[this.routerRedirectPaths[value]];
            });
        }

        return nameDirectory;
    }
    //#endregion

    //#region View Event
    private async navUserActionClick(action: string, index: number, e: PointerEvent): Promise<void>;
    private async navUserActionClick(action: string[], index: number[], e: PointerEvent): Promise<void>;
    private async navUserActionClick(action: string | string[], index: number | number[], e: PointerEvent): Promise<void> {
        if (typeof action === 'string') {
            switch (action) {
                case this.$i18n.User_ChangePassword:
                    this.$router.push(WebPath.ChangePassword);
                    break;
                case this.$i18n.User_Logout:
                    let apiResult = await ServerService.Logout();
                    let responseData: ServerNamespace.IServerResultError = undefined;
                    if (!!apiResult.error) {
                        responseData = apiResult.error;
                        this.handleServerResponse([responseData]);

                        this.loadingData.isShow = false;

                        return null;
                    }

                    this.$router.push(WebPath.Login);
                    break;
            }
        } else if (Array.isArray(action)) {
            switch (action[0]) {
                case this.$i18n.User_Language:
                    I18nService.currentLanguage = I18nNamespace.I18nOptions.find((n) => n.value === action[1]).key as I18nNamespace.II18nKey;
                    break;
            }
        }
    }

    private async headerBreadcrumbClick(text: string, index: number): Promise<void> {
        let href: string = this.headerBreadcrumbPaths[index];
        if (!!this.routerRedirectPaths[href]) {
            if (this.routerRedirectPaths[href] !== this.$router.currentRoute.path) {
                this.$router.push(this.routerRedirectPaths[href]);
                return null;
            }

            href = this.routerRedirectPaths[href];
        }

        if (!this.isRouterPush && this.routerCurrentPath === href) {
            this.routerCurrentPath = href;
            this.$store.routerReload$.next(href);
        }

        this.isRouterPush = false;
    }

    private async navPathChange(href: string): Promise<void> {
        if (!this.isRouterPush && this.routerCurrentPath === href) {
            this.routerCurrentPath = href;
            this.$store.routerReload$.next(href);
        }

        this.isRouterPush = false;
    }

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

<style scoped lang="scss">
.header {
    &--content {
        height: 100%;
    }
}
</style>
