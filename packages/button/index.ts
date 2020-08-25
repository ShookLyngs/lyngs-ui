import { App, Plugin } from 'vue';
import Component from './src/Button.vue';

const component: Plugin = {
  ...Component,
  install: (app: App): void => {
    app.component('LsButton', Component);
  },
};
export default component;