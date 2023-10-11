import { ServerNamespace } from '@/helpers';
import { DropdownModel } from '@/../components';

export namespace ModelsLocation {
    //#region server
    export interface IServerResponseData extends ServerNamespace.IDetectiveRecordsReponse {}
    //#endregion

    //#region web
    export interface ITableData {
        cameraName: string;
        cameraType: string;
        date: Date;
        labelImageSrc: string;
        labelName: string;
        objectId: string;
        snapshotSrc: string;
    }

    export interface ITableApiParam extends ServerNamespace.IDetectiveRecordsRequest {}

    export interface IFilterData {
        location: DropdownModel.IOption[];
        type: DropdownModel.IOption[];
        site: DropdownModel.IOption[];
        dateTime: Date[];
    }
    //#endregion
}
