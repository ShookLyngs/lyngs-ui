import { App } from 'vue';
import Component from './src/Dialog.vue';

export default Component;
export const install = (app: App): void => {
  app.component('LsDialog', Component);
};