import { App, Plugin } from 'vue';
import Component from './src/component.vue';

const component: Plugin = {
  ...Component,
  install: (app: App): void => {
    app.component('LsModalContent', Component);
  },
};
export default component;