import {ButtonList} from "./button";

export interface DialogProps {
  type?: 'flex' | 'inline';
  title?: string;
  content?: string;
  buttons?: ButtonList;
  width?: number | string;
  maxWidth?: number | string;
  allowHtml?: boolean;
  showModal?: boolean;
}

export interface DialogStatus {
  show?: boolean;
}

export type DialogInstance = DialogOptions & DialogStatus;