import * as Rx from 'rxjs';

import { LayoutNavModel } from '@/../components';

export const navLists$: Rx.BehaviorSubject<LayoutNavModel.IList[]> = new Rx.BehaviorSubject(undefined);

export const routerReload$: Rx.BehaviorSubject<string> = new Rx.BehaviorSubject(undefined);

export const routerAction$: Rx.Subject<string> = new Rx.Subject();
