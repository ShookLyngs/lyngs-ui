
import Vue from 'vue';
import { createApp, App, Plugin } from 'vue';
import Confirm from './src/Confirm.vue';

const newInstance = (element?: string | Element): Vue.ComponentPublicInstance => {
  return createApp(Confirm).mount(element ?? document.body);
};

export default {
  install: (app: App): void => {
    app.provide('$confirm', newInstance());
  },
  default: Confirm
};