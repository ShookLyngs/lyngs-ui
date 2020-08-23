import { App } from 'vue';
import Component from './src/Modal.vue';

export default Component;
export const install = (app: App): void => {
  app.component('LsModal', Component);
};