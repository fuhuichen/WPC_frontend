import { DropdownModel } from '@/../components';
import { ServerNamespace } from '@/helpers';

export namespace ModelsLocation {
    //#region server
    export type IServerResponseData = ServerNamespace.ISourceCameraRResponse;
    //#endregion

    //#region web
    export interface ITableData {
        objectId: string;
        name: string;
        type: string;
        modal: string;
        rtsp?: string;
        device?: string;
        remark: string;
        isChecked: string;
        note: string;
    }

    export interface ITableApiParam extends ServerNamespace.IDataList {}

    export interface IFormData {
        name: string;
        type: DropdownModel.IOption;
        modal: DropdownModel.IOption;
        rtsp: string;
        device: DropdownModel.IOption;
        remark: string;
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
        nameInputErrorMessage: string;
        rtspInputErrorMessage: string;
    }

    export interface ISaveButtonDisable {
        name: boolean;
        rtsp: boolean;
        modal: boolean;
        device: boolean;
    }
    //#endregion
}
