import { ServerNamespace } from '@/helpers';

export namespace ModelsLogin {
    //#region server
    export interface IServerResponseData extends ServerNamespace.IWebLoginResponse {}

    export interface IServerRequestData extends ServerNamespace.IWebLoginRequest {}
    //#endregion
}
