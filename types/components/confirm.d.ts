
import { DialogInstance, DialogProps, DialogContext } from './dialog';
import { ComponentPublicInstance } from "vue";

export interface Confirm {
  open?: OpenConfirm;
  close?: CloseConfirm;
}
export type ConfirmInstance = ComponentPublicInstance & Confirm;

export interface CreateConfirmInstance {
  (element?: string | Element): ConfirmInstance;
}

export interface GetConfirmInstance {
  (): OpenConfirm;
}

export interface ConfirmTemplate {
  (): DialogInstance;
}
export interface IsShowConfirmDialog {
  (dialog: DialogInstance): boolean;
}
export interface OpenConfirm {
  (options: DialogProps): Promise<DialogContext>;
  open?: OpenConfirm;
  close?: CloseConfirm;
}
export interface CloseConfirm {
  (id: number): boolean;
}
export interface OnConfirmDialogClose {
  (dialog: DialogInstance): void;
}