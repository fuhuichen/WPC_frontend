export namespace ModelsChangePassword {
    //#region server
    export interface IDataSaveParam {}

    export interface IResponseMessage {}
    //#endregion

    //#region web
    export interface IFormData {
        oldPassword: string;
        password: string;
        confirmPassword: string;
    }

    export interface IFormButtonDisabled {
        oldPassword: boolean;
        password: boolean;
        confirmPassword: boolean;
    }
    //#endregion
}
