<template>
  <transition name="ls-scale">
    <ls-modal-content v-if="show">
      <div
        class="ls-dialog"
        :class="dialogClasses"
        :style="dialogStyle"
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
                v-for="(button, index) in buttons"
                :key="Date.now() + index"
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
import { defineComponent, computed } from 'vue';
import { DialogButton } from 'types';

const defaults = () => {
  return {
    buttons: [
      { text: 'Cancel', shape: 'text', radius: 'capsule' },
      { text: 'Confirm', shape: 'solid', type: 'normal', radius: 'capsule' },
    ],
    types: [
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
      type: Array,
      default: () => defaults().buttons,
    },
    type: {
      type: String,
      default: 'flex'
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
  },
  setup(props, context) {

    const dialogWidth = computed((): string => {
      const width = props.width;
      return typeof width === 'number' ? width + 'px' : width;
    });
    const dialogMaxWidth = computed((): string => {
      const maxWidth = props.maxWidth;
      return typeof maxWidth === 'number' ? maxWidth + 'px' : maxWidth;
    });
    const dialogStyle = computed((): object => {
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
            types             = defaults().types;

      if (props.type && types.includes(props.type)) {
        classes.push(`is-${props.type}`);
      }

      return classes;
    });

    const close = (button?: DialogButton) => {
      context.emit('close', button);
    };

    const onClickButton = (button: DialogButton) => {
      context.emit('click', button);

      if (typeof button.onClick === 'function') {
        const result = button.onClick({ close }, button);

        if (Object.prototype.toString.call(result) === '[object Promise]' && result !== false && result !== true) {
          return result.then(result => result && close(button)).catch();
        }
        if (result) {
          return close(button);
        }
      }

      if (props.closeOnClick) {
        close(button);
      }
    };

    return {
      dialogMaxWidth,
      dialogStyle,
      dialogClasses,
      open,
      close,
      onClickButton,
    };
  }
});
</script>

<style scoped lang="less">
</style>