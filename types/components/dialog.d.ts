import { Button } from "./button";

export interface DialogProps {
  type?: 'flex' | 'inline';
  title?: string;
  content?: string | Element;
  buttons?: DialogButton[];
  width?: number | string;
  maxWidth?: number | string;
  allowHtml?: boolean;
  closeOnClick?: boolean;
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
  onClick?: (
    context: DialogContext,
    button: DialogButton
  ) => boolean | Promise<boolean>;
}