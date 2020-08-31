import { createApp, App, Plugin } from 'vue';
import Component from './src/component.vue';
import { ConfirmInstance } from 'types';

const getInstance = (element?: string | Element) => {
  return createApp(Component).mount(element ?? document.body);
};

const component: Plugin = {
  ...Component,
  install: (app: App): void => {
    const element = document.createElement('div');
    document.body.appendChild(element);

    app.provide<ConfirmInstance>('$confirm', getInstance(element));
  },
};
export default component;