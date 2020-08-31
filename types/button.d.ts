
export interface Button {
  type?: string;
  shape?: string;
  border?: string;
  radius?: string;
  text?: string;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  loading?: boolean;
  allowHtml?: boolean;
  onClick?: (button: Button) => any;
}

export interface ButtonList {
  [index: number]: Button;
}

export interface OnClickButton {
  (
    button: Button,
    callback: () => void
  ): boolean | Promise;
}