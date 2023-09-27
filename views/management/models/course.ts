import { DropdownModel } from '@/../components';
import { ServerNamespace } from '@/helpers';

export namespace ModelsCourse {
    //#region server
    export type IServerResponseData = ServerNamespace.ICourseListRResponse;
    //#endregion

    //#region web
    export interface ITableData {
        courseId: string;
        name: string;
        date: string;
        time: string;
        bgName: string;
        sectorName: string;
        point: number;
    }

    export interface ITableApiParam extends ServerNamespace.IDataList {}

    export interface IFormData {
        courseId: string;
        name: string;
        date: Date;
        time: Date;
        bgName: string;
        sectorName: string;
        point: number;
    }

    export interface IFilterOptions {
        typeOptions: DropdownModel.IOption[];
        modalOptions: DropdownModel.IOption[];
        deviceOptions: DropdownModel.IOption[];
    }

    export interface IInputError {
        name: boolean;
        date: boolean;
        time: boolean;
        bgName: boolean;
        sectorName: boolean;
        point: boolean;
    }

    export interface IInputErrorMessage {
        name: string;
        date: string;
        time: string;
        bgName: string;
        sectorName: string;
        point: string;
    }

    export interface ISaveButtonDisable {
        name: boolean;
        date: boolean;
        time: boolean;
        bgName: boolean;
        sectorName: boolean;
        point: boolean;
    }
    //#endregion
}
