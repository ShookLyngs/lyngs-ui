// packages-entry

// types
import { Plugin } from 'vue';

// components
import Button from './button';
import ModalMask from './modal-mask';
import ModalContent from './modal-content';
import Dialog from './dialog';
import Icon from './icon';
const components: { [key: string]: Plugin } = {
  Button,
  ModalMask,
  ModalContent,
  Dialog,
  Icon,
};

// instances
import Confirm from './confirm';

const plugin: Plugin = {
  install: (app) => {
    // installing active-trigger-components
    for (const key in components) {
      const component = components[key];
      component.install && component.install(app);
    }

    // planting global-instances
    app.config.globalProperties.$confirm = Confirm;
  }
};
export default plugin;