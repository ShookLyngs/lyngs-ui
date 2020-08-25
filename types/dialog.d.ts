import {ButtonList} from "./button";

export interface DialogProps {
  type?: 'flex' | 'inline';
  title?: string;
  content?: string;
  buttons?: ButtonList;
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