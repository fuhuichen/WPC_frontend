import { DropdownModel } from '@/../components';
import { ServerNamespace } from '@/helpers';

export namespace ModelsMember {
    //#region server
    export type IServerResponseData = ServerNamespace.IUserListRResponse;
    //#endregion

    //#region web
    export interface ITableData {
        email: string;
        name: string;
        type: string;
        userId: string;
    }

    export interface ITableApiParam extends ServerNamespace.IDataList {}

    export interface IFormData {
        name: string;
        email: string;
        password: string;
        note: string;
    }

    export interface IFilterOptions {
        typeOptions: DropdownModel.IOption[];
        modalOptions: DropdownModel.IOption[];
        deviceOptions: DropdownModel.IOption[];
    }

    export interface IInputError {
        nameInputError: boolean;
        rtspInputError: boolean;
        modalDropdownError: boolean;
        deviceDropdownError: boolean;
    }

    export interface IInputErrorMessage {
        name: string;
        email: string;
        password: string;
    }

    export interface ISaveButtonDisable {
        name: boolean;
        email: boolean;
        password: boolean;
    }
    //#endregion
}
