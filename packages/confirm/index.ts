import { createApp, App, ComponentPublicInstance } from 'vue';
import Confirm from './src/Confirm.vue';

const getInstance = (element?: string | Element): ComponentPublicInstance => {
  return createApp(Confirm).mount(element ?? document.body);
};

export default {
  install: (app: App): void => {
    const element = document.createElement('div');
    document.body.appendChild(element);

    app.provide('$confirm', getInstance(element));
  },
  default: Confirm
};