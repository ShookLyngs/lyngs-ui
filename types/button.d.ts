
export interface Button {
  text?: string;
  prefix?: string;
  suffix?: string;
  allowHtml?: boolean;
}

export interface ButtonList {
  [index: number]: Button;
}