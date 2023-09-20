<template>
    <div class="home"></div>
</template>

<script lang="ts">
//#region Import
//#region Vue
import { Vue, Component } from 'vue-property-decorator';
//#endregion

//#region Module
import * as Rx from 'rxjs';
import * as RxOperator from 'rxjs/operators';
//#endregion

//#region Framework
import {} from '@/../helpers';
import {} from '@/../components';
//#endregion

//#region Src
import {} from '@/helpers';
//#endregion

//#region Views
//#endregion

//#region Components
import {} from '@/../components';
//#endregion

//#region Components Src
//#endregion

//#region Components Views
//#endregion
//#endregion

@Component({
    components: {},
})
export default class VuePageClass extends Vue {
    //#region Prop
    //#endregion

    //#region Variables
    private stop$: Rx.Subject<boolean> = new Rx.Subject();
    //#endregion

    //#region Computed
    //#endregion

    //#region Watch
    //#endregion

    //#region Vue Life
    private async beforeCreate(): Promise<void> {}
    private async created(): Promise<void> {}
    private async beforeMount(): Promise<void> {}
    private async mounted(): Promise<void> {
        this.$store.navLists$
            .pipe(
                RxOperator.filter((n) => !!n),
                RxOperator.takeUntil(this.stop$),
                RxOperator.concatMap(async (x) => {
                    let to: string = undefined;
                    if (x.length > 0) {
                        to = x[0].href ?? x[0].child[0].href;
                    } else {
                        // to = WebPath.MyProfile;
                    }

                    this.$router.push(to);
                }),
            )
            .subscribe();
    }
    private async beforeDestroy(): Promise<void> {}
    private async destroyed(): Promise<void> {
        this.stop$.next();
    }
    //#endregion

    //#region Init
    //#endregion

    //#region View Event
    //#endregion

    //#region Other Function
    //#endregion
}
</script>

<style scoped lang="scss"></style>
