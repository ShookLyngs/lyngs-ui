import { Button } from "./button";

export interface DialogProps {
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
  show?: boolean;
  showModal?: boolean;
}
export type DialogInstance = DialogOptions & DialogStatus;

export interface DialogContext {
  close: (button?: DialogButton) => void;
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