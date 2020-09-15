import { Button } from "./button";
import { UnwrapRefSimple } from 'vue';

export interface DialogProps {
  show?: boolean;
  title?: string;
  content?: string | Element;
  buttons?: DialogButton[];
  display?: 'flex' | 'inline';
  width?: number | string;
  maxWidth?: number | string;
  allowHtml?: boolean;
  closeOnClick?: boolean;
  closeOnClickModal?: boolean;
  onConfirm?: DialogCallback;
  onCancel?: DialogCallback;
  onPromiseResolve?: DialogCallback;
  onPromiseReject?: DialogCallback;
}
export interface DialogStatus {
  id: number;
  showModal?: boolean;
}
export type DialogInstance = DialogOptions & DialogStatus;

export interface DialogContext {
  source: 'button' | 'modal';
  close: DialogClose;
  button?: DialogButton;
}
export interface DialogButton extends Button {
  trigger?: 'click' | 'confirm' | 'cancel',
  onClick?: (
    context: DialogContext
  ) => boolean | Promise<boolean>;
}
export interface DialogCallback {
  (
    context: DialogContext
  ): boolean | Promise<boolean>;
}

export interface DialogClose {
  (button?: DialogButton): void;
}
export interface UpdateDialogButtons {
  (buttons?: DialogButton[]): void;
}
export interface DialogDefaultProps {
  (): {
    buttons: DialogButton[];
    displays: (DialogProps['display'])[];
  };
}
export interface OnClickDialogButton {
  (button: UnwrapRefSimple<DialogButton> | DialogButton): any;
}