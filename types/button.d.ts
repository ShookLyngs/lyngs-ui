
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
  onClick?: () => any;
}

export interface ButtonList {
  [index: number]: Button;
}