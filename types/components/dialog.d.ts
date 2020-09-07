import { Button } from "./button";

export interface DialogProps {
  display?: 'flex' | 'inline';
  title?: string;
  content?: string | Element;
  buttons?: DialogButton[];
  width?: number | string;
  maxWidth?: number | string;
  allowHtml?: boolean;
  closeOnClick?: boolean;
  onConfirm?: DialogCallback;
  onCancel?: DialogCallback;
}
export interface DialogStatus {
  id: number;
  show?: boolean;
  showModal?: boolean;
}
export type DialogInstance = DialogOptions & DialogStatus;

export interface DialogContext {
  close: (button?: DialogButton) => void;
}
export interface DialogButton extends Button {
  trigger?: 'click' | 'confirm' | 'cancel',
  onClick?: (
    context: DialogContext,
    button: DialogButton
  ) => boolean | Promise<boolean>;
}
export interface DialogCallback {
  (
    context: DialogContext,
    button?: DialogButton
  ): boolean | Promise<boolean>;
}