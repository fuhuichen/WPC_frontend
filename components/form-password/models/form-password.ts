import { InputTextModel } from '@/../components';

export type TSize = InputTextModel.TSize;
export type TVariant = InputTextModel.TVariant;
export type TMode = InputTextModel.TMode;

export interface IFormPasswordData {
    oldPassword: string;
    password: string;
    confirmPassword: string;
}

export interface IFormButtonDisabled {
    oldPassword: boolean;
    password: boolean;
    confirmPassword: boolean;
}

export interface IFormPasswordError {
    oldPassword?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
}

export interface IFormPasswordErrorMessage {
    oldPassword: string;
    password: string;
    confirmPassword: string;
}
