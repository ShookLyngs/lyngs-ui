<template>
  <div
    class="ls-dialog"
    :class="dialogClasses"
    :style="dialogStyle"
    v-if="show"
  >
    <div class="ls-dialog-header">
      <slot name="header">
        <div class="ls-dialog-title">
          <span v-if="allowHtml" v-html="title"></span>
          <span v-else v-text="title"></span>
        </div>
        <ul class="ls-dialog-actions">
          <li class="ls-dialog-action">close</li>
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
          <li
            class="ls-dialog-action-button"
            v-for="(button, index) in buttons"
            :key="Date.now() + index"
          >
            <ls-button
              :text="button.text"
              :prefix="button.prefix"
              :suffix="button.suffix"
              :allowHtml="button.allowHtml"
              @click="onClickButton(button)"
            ></ls-button>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">

import ButtonComponent from '{packages}/button';
import { defineComponent, computed } from 'vue';
import { Button } from 'types';

const defaults = () => {
  return {
    buttons: [
      { text: 'Cancel' },
      { text: 'Confirm' },
    ],
    types: [
      'flex',
      'inline',
    ],
  };
};

export default defineComponent({
  name: "Dialog",
  components: {
    LsButton: ButtonComponent,
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
      type: String,
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

    const open = () => {
      console.log('open');
    };

    const close = () => {
      console.log('close');
    };

    const onClickButton = (button: Button) => {
      if (button && button.onClick) button.onClick();
      context.emit('click', button);
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

// dialog-root class
@background-color: #fff;
@side-space: 12px;
.ls-dialog {
  position: relative;
  margin: 0 auto;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  border-radius: 3px;
  background-color: @background-color;

  .ls-dialog-header,
  .ls-dialog-footer {
    display: flex;
    padding: 0 12px;
    justify-content: space-between;
    line-height: 40px;
    height: 40px;
  }
  .ls-dialog-footer {
    justify-content: flex-end;
  }
  .ls-dialog-actions {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .ls-dialog-content-container {
    padding: 0 20px;
  }

  &.is-flex {
    display: flex;
    flex-direction: column;
    max-height: calc(100% - (@side-space * 4));
    max-width: calc(100% - (@side-space * 2));

    .ls-dialog-content {
      flex: auto;
      overflow-y: auto;
    }
  }
  &.is-inline {
    display: inline-block;
    max-width: 100%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    word-wrap: break-word;
  }
}

</style>