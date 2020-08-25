import { App, Plugin } from 'vue';
import Component from './src/Modal.vue';

const component: Plugin = {
  ...Component,
  install: (app: App): void => {
    app.component('LsModal', Component);
  },
};
export default component;