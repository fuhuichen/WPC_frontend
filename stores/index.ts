import * as Rx from 'rxjs';
import Vue from 'vue';

import { LayoutNavModel } from '@/../components';

import { ILoadingData, loading$ } from './loading';
import { INotificationToastData, notificationToast$ } from './notification-toast';
import { navLists$, routerReload$, routerAction$ } from './router';

declare module 'vue/types/vue' {
    export interface Vue {
        $store: {
            loading$: Rx.Subject<ILoadingData>;
            notificationToast$: Rx.Subject<INotificationToastData>;
            navLists$: Rx.BehaviorSubject<LayoutNavModel.IList[]>;
            routerReload$: Rx.BehaviorSubject<string>;
            routerAction$: Rx.Subject<string>;
        };
    }
}

Vue.prototype.$store = {
    loading$: loading$,
    notificationToast$: notificationToast$,
    navLists$: navLists$,
    routerReload$: routerReload$,
    routerAction$: routerAction$,
};
