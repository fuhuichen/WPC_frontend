import * as Rx from 'rxjs';

export interface ILoadingData {
    isShow: boolean;
    mode?: 'reload-page' | 'initialization';
    text: string;
}

export const LoadingData: ILoadingData = { isShow: false, mode: 'reload-page', text: '' };

export const loading$: Rx.Subject<ILoadingData> = new Rx.Subject();
