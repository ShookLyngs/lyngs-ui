import { createApp } from 'vue';
import Component from './src/component.vue';
import { ConfirmInstance, CreateConfirmInstance, GetConfirmInstance } from 'types';

// only one component-instance in an App-instance
let globalInstance: ConfirmInstance;

// create an instance of confirm dialog
const createInstance: CreateConfirmInstance = (element) =>
  createApp(Component).mount(element ?? document.body);

// return and always return same instance of the component
const getInstance: GetConfirmInstance = () => {
  if (!globalInstance) {
    // create new instance, and store to global
    const element = document.createElement('div');
    document.body.appendChild(element);
    globalInstance = createInstance(element);

    // should have open() and close() inside of the instance
    if (!globalInstance.open) throw new Error("Missing property 'open' of component");
    if (!globalInstance.close) throw new Error("Missing property 'close' of component");

    // add dialog property methods to open()
    globalInstance.open.open = globalInstance.open;
    globalInstance.open.close = globalInstance.close;
  }

  // should have open() inside of the instance
  if (!globalInstance.open) throw new Error("Missing property 'open' of component");

  return globalInstance.open;
};
export default getInstance();