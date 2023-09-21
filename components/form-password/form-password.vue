<template>
    <div class="form-password">
        <div v-if="isShowTip" class="tip-normal">
            <div class="tip-normal--title">
                <img :src="bellSrc" />

                <div class="tip-normal--title-text">{{ $i18n.Password_PasswordRule }}</div>
            </div>

            <div class="tip-normal--level1">
                <div class="tip-normal--level1-img">
                    <img :src="handRightSrc" />
                </div>

                <div class="tip-normal--level1-text">{{ $i18n.Password_AtLeast8Characters }}</div>
            </div>

            <div class="tip-normal--level1">
                <div class="tip-normal--level1-img">
                    <img :src="handRightSrc" />
                </div>

                <div class="tip-normal--level1-text">{{ $i18n.Password_AtLeastCapital }}</div>
            </div>

            <div class="tip-normal--level1">
                <div class="tip-normal--level1-img">
                    <img :src="handRightSrc" />
                </div>

                <div class="tip-normal--level1-text">{{ $i18n.Password_AtLeastLowercase }}</div>
            </div>

            <div class="tip-normal--level1">
                <div class="tip-normal--level1-img">
                    <img :src="handRightSrc" />
                </div>

                <div class="tip-normal--level1-text">{{ $i18n.Password_AtLeastNumber }}</div>
            </div>

            <div class="tip-normal--level1">
                <div class="tip-normal--level1-img">
                    <img :src="handRightSrc" />
                </div>

                <div class="tip-normal--level1-text">{{ $i18n.Password_AtLeastSpecial }}</div>
            </div>
        </div>

        <div class="form-password--password mt-3">
            <div v-if="isShowOldPassword" class="row-4">
                <AicsTextLabel :text="$i18n.Common_PasswordPrevious" :required="true" />

                <AicsInputPassword
                    size="14"
                    variant="grayscale-primary"
                    v-model="formData.oldPassword"
                    :size="size"
                    :variant="variant"
                    :mode="mode"
                    :debounce="debounce"
                    :disabled="disabled"
                    :placeholder="$i18n.Common_PasswordPrevious"
                    :isError="formError.oldPassword"
                    :errorMessage="formErrorMessage.oldPassword"
                    :isWidth100Percent="true"
                    @input="inputOldPassword"
                />
            </div>

            <div class="row-4">
                <AicsTextLabel :text="$i18n.Common_Password" :required="true" />

                <AicsInputPassword
                    size="14"
                    variant="grayscale-primary"
                    v-model="formData.password"
                    :size="size"
                    :variant="variant"
                    :mode="mode"
                    :debounce="debounce"
                    :disabled="disabled"
                    :placeholder="$i18n.Common_Password"
                    :isError="formError.password"
                    :errorMessage="formErrorMessage.password"
                    :isWidth100Percent="true"
                    @input="inputPassword"
                />
            </div>

            <div class="row-4">
                <AicsTextLabel :text="$i18n.Common_PasswordConfirm" :required="true" />

                <AicsInputPassword
                    size="14"
                    variant="grayscale-primary"
                    v-model="formData.confirmPassword"
                    :size="size"
                    :variant="variant"
                    :mode="mode"
                    :debounce="debounce"
                    :disabled="disabled"
                    :placeholder="$i18n.Common_PasswordConfirm"
                    :isError="formError.confirmPassword"
                    :errorMessage="formErrorMessage.confirmPassword"
                    :isWidth100Percent="true"
                    @input="inputConfirmPassword"
                />
            </div>

            <div v-if="!isShowOldPassword" class="row-4"></div>
        </div>
    </div>
</template>

<script lang="ts">
//#region Import
//#region Vue
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
//#endregion

//#region Module
//#endregion

//#region Framework
import {} from '@/../helpers';
import { FormPasswordModel as Model } from './models';
//#endregion

//#region Src
import {} from '@/config';
import { RegexService } from '@/helpers';
import { IViews } from '@/models';
//#endregion

//#region Views
//#endregion

//#region Components
import { AicsTextLabel, AicsInputPassword } from '@/../components';
//#endregion

//#region Components Src
//#endregion

//#region Components Views
//#endregion
//#endregion

@Component({
    components: { AicsTextLabel, AicsInputPassword },
})
export default class VuePageClass extends Vue {
    //#region Prop
    @Prop({
        type: String, // Boolean, Number, String, Array, Object
        default: () => '14',
    })
    private size: Model.TSize;

    @Prop({
        type: String, // Boolean, Number, String, Array, Object
        default: () => 'grayscale-primary',
    })
    private variant: Model.TVariant;

    @Prop({
        type: String, // Boolean, Number, String, Array, Object
        default: () => 'outline',
    })
    private mode: Model.TMode;

    @Prop({
        type: Boolean, // Boolean, Number, String, Array, Object
        default: () => false,
    })
    private disabled: boolean;

    @Prop({
        type: Number, // Boolean, Number, String, Array, Object
        default: () => 50,
    })
    private debounce: number;

    @Prop({
        type: Boolean, // Boolean, Number, String, Array, Object
        default: () => true,
    })
    private isShowTip: boolean;

    @Prop({
        type: Boolean, // Boolean, Number, String, Array, Object
        default: () => false,
    })
    private isShowOldPassword: boolean;

    @Prop({
        type: Object, // Boolean, Number, String, Array, Object
        default: () => {
            return {
                oldPassword: '',
                password: '',
                confirmPassword: '',
            };
        },
    })
    private formPasswordData: Model.IFormPasswordData;

    @Prop({
        type: Object, // Boolean, Number, String, Array, Object
        default: () => {
            return {
                oldPassword: false,
                password: false,
                confirmPassword: false,
            };
        },
    })
    private formPasswordError: Model.IFormPasswordError;

    @Prop({
        type: Object, // Boolean, Number, String, Array, Object
        default: () => undefined,
    })
    private formPasswordErrorMessage: Model.IFormPasswordErrorMessage;
    //#endregion

    //#region Variables
    private formData: Model.IFormPasswordData = {
        oldPassword: '',
        password: '',
        confirmPassword: '',
    };

    private formError: Model.IFormPasswordError = {
        oldPassword: false,
        password: false,
        confirmPassword: false,
    };

    private formErrorMessageDefault: Model.IFormPasswordErrorMessage = {
        oldPassword: '',
        password: this.$i18n.Common_ErrorFormat_Password,
        confirmPassword: this.$i18n.Common_ErrorFormat_ConfirmPassword,
    };

    private formErrorMessage: Model.IFormPasswordErrorMessage = {
        oldPassword: '',
        password: '',
        confirmPassword: '',
    };

    private formButtonDisabled: Model.IFormButtonDisabled = {
        oldPassword: true,
        password: true,
        confirmPassword: true,
    };

    private bellSrc: string = require('@/assets/images/views/tip/bell.svg');
    private handRightSrc: string = require('@/assets/images/views/tip/hand-right.svg');
    //#endregion

    //#region Computed
    //#endregion

    //#region Watch
    @Watch('formPasswordData', { immediate: true, deep: true })
    private formPasswordDataChange(newVal: Model.IFormPasswordData, oldVal: Model.IFormPasswordData): void {
        this.formData = newVal;
    }

    @Watch('formPasswordError', { immediate: true, deep: true })
    private formPasswordErrorChange(newVal: Model.IFormPasswordError, oldVal: Model.IFormPasswordError): void {
        this.formError = newVal;
    }

    @Watch('formPasswordErrorMessage', { immediate: true, deep: true })
    private formPasswordErrorMessageChange(newVal: Model.IFormPasswordErrorMessage, oldVal: Model.IFormPasswordErrorMessage): void {
        if (!!newVal) {
            this.formErrorMessageDefault = { ...this.formErrorMessageDefault, ...newVal };
        }
    }
    //#endregion

    //#region Vue Life
    private async beforeCreate(): Promise<void> {}
    private async created(): Promise<void> {}
    private async beforeMount(): Promise<void> {}
    private async mounted(): Promise<void> {}
    private async beforeDestroy(): Promise<void> {}
    private async destroyed(): Promise<void> {}
    //#endregion

    //#region Init
    //#endregion

    //#region View Event
    private inputOldPassword(): void {
        if (!!this.formData.oldPassword) {
            this.formButtonDisabled.oldPassword = false;
            this.formError.oldPassword = false;
        } else {
            this.formButtonDisabled.oldPassword = true;
            this.formError.oldPassword = true;
            this.formErrorMessage.oldPassword = `${this.$i18n.Common_PasswordPrevious} ${this.$i18n.Form_ValueRequire}`;
        }

        this.$emit('inputFormPassword', this.formData, this.formButtonDisabled);
    }

    private inputPassword(): void {
        if (!!this.formData.password) {
            if (new RegExp(RegexService.strongPassword()).test(this.formData.password)) {
                this.formButtonDisabled.password = false;
                this.formError.password = false;
            } else {
                this.formButtonDisabled.password = true;
                this.formErrorMessage.password = this.formErrorMessageDefault.password;
                this.formError.password = true;
            }
        } else {
            this.formButtonDisabled.password = true;
            this.formError.password = true;
            this.formErrorMessage.password = `${this.$i18n.Common_Password} ${this.$i18n.Form_ValueRequire}`;
        }

        if (!!this.formData.confirmPassword) {
            this.inputConfirmPassword();
        }
    }

    private inputConfirmPassword(): void {
        if (!!this.formData.confirmPassword) {
            if (this.formData.confirmPassword !== this.formData.password) {
                this.formButtonDisabled.confirmPassword = true;
                this.formErrorMessage.confirmPassword = this.formErrorMessageDefault.confirmPassword;
                this.formError.confirmPassword = true;
            } else {
                this.formButtonDisabled.confirmPassword = false;
                this.formError.confirmPassword = false;
            }
        } else {
            this.formButtonDisabled.confirmPassword = true;
            this.formError.confirmPassword = true;
            this.formErrorMessage.confirmPassword = `${this.$i18n.Common_PasswordConfirm} ${this.$i18n.Form_ValueRequire}`;
        }

        this.$emit('inputFormPassword', this.formData, this.formButtonDisabled);
    }
    //#endregion

    //#region Other Function
    //#endregion
}
</script>

<style scoped lang="scss">
.form-password {
    padding-top: 8px;

    &--password {
        display: flex;
        align-items: center;

        & > * {
            box-sizing: border-box;
            padding-right: var(--padding-base);
            padding-left: var(--padding-base);

            &:first-child {
                padding-right: calc(var(--padding-base) * 2);
                padding-left: 0;
            }

            &:last-child {
                padding-right: 0;
                padding-left: calc(var(--padding-base) * 2);
            }
        }
    }

    .text-label {
        margin-bottom: 4px;
    }
}

.tip-normal {
    border: 2px dashed #2b2b2b;
    padding: 12px 16px;
    border-radius: 4px;

    &--title {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: bold;

        img {
            width: 16px;
            height: 16px;
        }

        &-text {
            margin-left: 12px;
        }
    }

    &--level1 {
        display: flex;
        align-items: center;
        margin-left: 32px;
        margin-top: 8px;
        font-size: 14px;
        line-height: 1.5;

        &-title {
            display: flex;
            align-items: center;
        }

        &-img {
            width: 16px;
            height: 16px;

            img {
                width: 16px;
                height: 16px;
            }
        }

        &-text {
            margin-left: 12px;
        }
    }
}
</style>
