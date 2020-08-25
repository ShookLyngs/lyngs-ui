import { App, Plugin } from 'vue';
import Component from './src/Modal.vue';

const component: Plugin = {
  ...Component,
  install: (app: App): void => {
    app.component('LsButton', Component);
  },
};
export default component;