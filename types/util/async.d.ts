
export interface Timeout {
  (length: number): Promise<void>;
}