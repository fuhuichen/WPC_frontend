import * as Rx from 'rxjs';

import { NotificationToastModel } from '@/../components';

export interface INotificationToastData {
    notifications: NotificationToastModel.TValue[];
    duration?: number;
}

export const NotificationToastData: INotificationToastData = { notifications: [], duration: 1000 };

export const notificationToast$: Rx.Subject<INotificationToastData> = new Rx.Subject();
