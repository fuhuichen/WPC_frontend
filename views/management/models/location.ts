import { DropdownModel } from '@/../components';
import { ServerNamespace } from '@/helpers';

export namespace ModelsLocation {
    //#region server
    export type IServerResponseData = ServerNamespace.ILocationListRResponse;
    //#endregion

    //#region web
    export interface ITableData {
        name: string;
        locationName: string;
        point: number;
        siteId: string;
        type: string;
    }

    export interface ITableApiParam extends ServerNamespace.IDataList {}

    export interface IFormData {
        siteId: string;
        name: string;
        locationName: string;
        type: string;
        point: number;
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
