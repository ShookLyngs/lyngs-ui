
export interface ModalMask {
  show: boolean;
  pop: ('body' | 'parents') | number;
  plantClass: string;
}

export interface ModalGetWrapperElement {
  (): HTMLElement | null;
}
export interface ModalControlParentsClasses {
  (
    action: 'add' | 'remove',
    classes: string | string[],
    stopsAt?: number | string,
  ): void;
}