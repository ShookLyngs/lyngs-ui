<template>
  <transition name="ls-scale">
    <ls-modal-content v-if="show" @click="onClickModalContent">
      <div
        class="ls-dialog"
        :class="dialogClasses"
        :style="dialogStyle"
        @click.stop=""
      >
        <div class="ls-dialog-header">
          <slot name="header">
            <div class="ls-dialog-title">
              <slot name="title">
                <span v-if="allowHtml" v-html="title"></span>
                <span v-else v-text="title"></span>
              </slot>
            </div>
            <ul class="ls-dialog-actions">
              <slot name="header-actions">
                <li class="ls-dialog-action">close</li>
              </slot>
            </ul>
          </slot>
        </div>
        <div class="ls-dialog-content">
          <slot name="content">
            <div class="ls-dialog-content-container">
              <span v-if="allowHtml" v-html="content"></span>
              <span v-else v-text="content"></span>
            </div>
          </slot>
        </div>
        <div class="ls-dialog-footer">
          <slot name="footer">
            <ul class="ls-dialog-actions">
              <ls-button
                v-for="(button, index) in dialogButtons"
                :key="index"
                :type="button.type"
                :shape="button.shape"
                :border="button.border"
                :radius="button.radius"
                :text="button.text"
                :prefix="button.prefix"
                :suffix="button.suffix"
                :allowHtml="button.allowHtml"
                :disabled="button.disabled"
                :loading="button.loading"
                @click="onClickButton(button)"
              ></ls-button>
            </ul>
          </slot>
        </div>
      </div>
    </ls-modal-content>
  </transition>
</template>

<script lang="ts">

import LsButton from '{packages}/button';
import ModalContent from '{packages}/modal-content';
import { defineComponent, computed, ref, watch, onMounted, Ref, PropType } from 'vue';
import { DialogProps, DialogButton, DialogClose, DialogContext, UpdateDialogButtons } from 'types';

const defaults = (): { buttons: Array<DialogButton>; displays: ('flex' | 'inline' | undefined)[]; } => {
  return {
    buttons: [
      { text: 'Cancel', shape: 'text', radius: 'capsule', trigger: 'cancel' },
      { text: 'Confirm', shape: 'solid', type: 'normal', radius: 'capsule', trigger: 'confirm', loading: false },
    ],
    displays: [
      'flex',
      'inline',
    ],
  };
};

export default defineComponent({
  name: "LsDialog",
  components: {
    LsButton: LsButton,
    LsModalContent: ModalContent,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: [ String, Object ],
      default: '',
    },
    buttons: {
      type: Array as PropType<DialogButton[]>,
      default: () => defaults().buttons,
    },
    display: {
      type: String as PropType<DialogProps['display']>,
      default: 'flex',
    },
    width: {
      type: [ Number, String ],
      default: '',
    },
    maxWidth: {
      type: [ Number, String ],
      default: '',
    },
    allowHtml: {
      type: Boolean,
      default: false,
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    onConfirm: {
      type: Function as PropType<DialogProps['onConfirm']>,
    },
    onCancel: {
      type: Function as PropType<DialogProps['onCancel']>,
    },
    onPromiseResolve: {
      type: Function as PropType<DialogProps['onPromiseResolve']>,
    },
    onPromiseReject: {
      type: Function as PropType<DialogProps['onPromiseReject']>,
    },
  },
  setup(props: DialogProps, context) {
    // computed
    const dialogWidth = computed((): string => {
      const width = props.width !== void 0 ? props.width : '';
      return typeof width === 'number' ? width + 'px' : width;
    });
    const dialogMaxWidth = computed((): string => {
      const maxWidth = props.maxWidth !== void 0 ? props.maxWidth : '';
      return typeof maxWidth === 'number' ? maxWidth + 'px' : maxWidth;
    });
    const dialogStyle = computed(() => {
      const style: {
        maxWidth?: string;
        width?: string;
      } = {};

      const maxWidth = dialogMaxWidth;
      if (maxWidth.value) {
        style.maxWidth = maxWidth.value;
      }

      const width = dialogWidth;
      if (width.value) {
        style.width = width.value;
      }

      return style;
    });
    const dialogClasses = computed(() => {
      const classes: string[] = [],
            displays          = defaults().displays;

      if (props.display && displays.includes(props.display)) {
        classes.push(`is-${props.display}`);
      }

      return classes;
    });

    // active methods
    const updateButtons: UpdateDialogButtons = (buttons) =>
      dialogButtons.value = buttons ?? defaults().buttons;
    const close: DialogClose = (button) => context.emit('close', button);

    // passive methods
    const onClickButton = (button: DialogButton) => {
      context.emit('click', button);

      const callbackContext: DialogContext = {
        source: 'button',
        close: close.bind(context, button),
        button: button,
      };
      let result: boolean | Promise<boolean> = false;

      if ((!button.trigger || button.trigger === 'confirm') && props.onPromiseResolve) {
        props.onPromiseResolve(callbackContext);
      } else if (button.trigger === 'cancel' && props.onPromiseReject) {
        props.onPromiseReject(callbackContext);
      }

      if (button.trigger === 'confirm' && props.onConfirm) {
        result = props.onConfirm(callbackContext);
      } else if (button.trigger === 'cancel' && props.onCancel) {
        result = props.onCancel(callbackContext);
      } else if ((!button.trigger || button.trigger === 'click') && button.onClick) {
        result = button.onClick(callbackContext);
      }

      if (Object.prototype.toString.call(result) === '[object Promise]' && typeof result !== 'boolean') {
        return result.then(bool => bool && close(button)).catch(() => void 0);
      }
      if (result) {
        return close(button);
      }

      if (props.closeOnClick) {
        close(button);
      }
    };
    const onClickModalContent = () => {
      const callbackContext: DialogContext = {
        close: close,
        source: 'modal'
      };

      context.emit('click-modal', callbackContext);
      if (props.onPromiseReject) props.onPromiseReject(callbackContext);
      if (props.closeOnClickModal) close();
    };

    // watchers
    let dialogButtons: Ref<DialogButton[]> = ref([]);
    watch(() => props.buttons, updateButtons);
    onMounted(() => updateButtons(props.buttons));

    return {
      // data
      dialogButtons,
      // computed
      dialogMaxWidth,
      dialogStyle,
      dialogClasses,
      // active methods
      close,
      // passive methods
      onClickButton,
      onClickModalContent
    };
  }
});
</script>

<style scoped lang="less">
</style>