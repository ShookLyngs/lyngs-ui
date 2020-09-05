import { createApp } from 'vue';
import Component from './src/component.vue';
import { ConfirmInstance, CreateConfirmInstance, GetConfirmInstance } from 'types';

// only one component-instance in an App instance
let globalInstance: ConfirmInstance;

// create an instance of confirm dialog
const createInstance: CreateConfirmInstance = (element) =>
  createApp(Component).mount(element ?? document.body);

// return and always return same instance of the component
const getInstance: GetConfirmInstance = () => {
  if (!globalInstance) {
    const element = document.createElement('div');
    document.body.appendChild(element);
    globalInstance = createInstance(element);
  }

  if (!globalInstance.open) throw new Error("Missing property 'open' of component");
  if (!globalInstance.close) throw new Error("Missing property 'close' of component");

  const open = globalInstance.open;
  open.open = open;
  open.close = globalInstance.close;

  return open;
};
export default getInstance();