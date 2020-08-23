
import { ButtonList } from './button';

export type DialogOptionType = 'flex' | 'inline';

export interface DialogOptions {
  type?: DialogOptionType;
  title?: string;
  content?: string;
  buttons?: ButtonList;
  width?: number | string;
  maxWidth?: number | string;
  allowHtml?: boolean;
}

export interface DialogStatus {
  show?: boolean;
}

export interface ConfirmInstance {
  open?: (options: DialogOptions) => void;
  close?: () => void;
}

export interface ConfirmOptionList {
  [index: number]: DialogOptions & DialogStatus;
}