import { ServerNamespace } from '@/helpers';
import { DropdownModel } from '@/../components';

export namespace ModelsCourse {
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
        bgName: DropdownModel.IOption[];
        sectorName: DropdownModel.IOption[];
        courseName: DropdownModel.IOption[];
        dateTime: Date[];
    }
    //#endregion
}
