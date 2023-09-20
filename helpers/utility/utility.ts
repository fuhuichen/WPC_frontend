import { Utility as ParentUtility } from '@/../helpers/utility/utility';

import * as Namespace from './namespace';

export class Utility extends ParentUtility {
    /**
     *
     *
     * @memberof Utility
     */
    public ScrollToTop(): void {
        let element: Element = document.getElementsByClassName('body')[0];
        if (!!element) {
            element.scrollTop = 0;
        }
    }
}
