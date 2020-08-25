
export interface Button {
  type?: string;
  text?: string;
  prefix?: string;
  suffix?: string;
  allowHtml?: boolean;
  onClick?: () => any;
}

export interface ButtonList {
  [index: number]: Button;
}