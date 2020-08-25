
import { DialogOptions } from './dialog';
import { ComponentPublicInstance } from "vue";

export interface Confirm {
  open?: (options: DialogOptions) => void;
  close?: () => void;
}
export type ConfirmInstance = ComponentPublicInstance & Confirm;