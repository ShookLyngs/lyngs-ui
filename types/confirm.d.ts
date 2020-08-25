
import {DialogInstance, DialogOptions, DialogProps} from './dialog';
import { ComponentPublicInstance } from "vue";

export interface Confirm {
  open?: (options: DialogOptions) => void;
  close?: () => void;
}
export type ConfirmInstance = ComponentPublicInstance & Confirm;


export interface ConfirmTemplate {
  (): DialogInstance;
}
export interface IsShowConfirmDialog {
  (dialog: DialogInstance): boolean;
}
export interface OpenConfirm {
  (options: DialogProps): void;
}