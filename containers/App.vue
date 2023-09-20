<template>
    <div id="app">
        <router-view></router-view>
    </div>
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
import {} from '@/config';
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
export default class App extends Vue {
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
    private async mounted(): Promise<void> {}
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

<style lang="scss">
</style>
