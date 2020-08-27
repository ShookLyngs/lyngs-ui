
import { DialogInstance, DialogOptions, DialogProps} from './dialog';
import { ComponentPublicInstance } from "vue";

export interface Confirm {
  open?: OpenConfirm;
  close?: CloseConfirm;
}
export type ConfirmInstance = ComponentPublicInstance & Confirm;


export interface ConfirmTemplate {
  (): DialogInstance;
}
export interface IsShowConfirmDialog {
  (dialog: DialogInstance): boolean;
}
export interface OpenConfirm {
  (options: DialogProps): number;
}
export interface CloseConfirm {
  (id: number): boolean;
}
export interface OnConfirmDialogClose {
  (dialog: DialogInstance): void;
}