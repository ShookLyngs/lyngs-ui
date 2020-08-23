
export interface Button {
  text?: string;
  icon?: string;
  allowHtml?: boolean;
}

export interface ButtonList {
  [index: number]: Button;
}