<template>
  <button class="ls-button" :class="classes" @click="onClick">
    <slot name="prefix">
      <i v-if="prefix" :class="prefix"></i>
    </slot>
    <slot>
      <span>{{ text }}</span>
    </slot>
    <slot name="suffix">
      <i v-if="suffix" :class="suffix"></i>
    </slot>
  </button>
</template>

<script lang="ts">

import { defineComponent, computed } from 'vue';
import { Button } from 'types';

export default defineComponent({
  name: "Button",
  props: {
    type: {
      type: String,
      default: 'normal',
      validator(value: string): boolean {
        return [ 'normal', 'theme', 'success', 'warning', 'danger', 'info' ].includes(value);
      }
    },
    shape: {
      type: String,
      default: 'solid',
      validator(value: string): boolean {
        return [ 'text', 'solid' ].includes(value);
      }
    },
    border: {
      type: String,
      default: 'radius',
      validator(value: string): boolean {
        return [ 'square', 'radius', 'capsule' ].includes(value);
      }
    },
    radius: {
      type: String,
      default: 'radius',
      validator(value: string): boolean {
        return [ 'square', 'radius', 'capsule' ].includes(value);
      }
    },
    text: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
    allowHtml: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: Button, context) {
    const classes = computed(() => {
      const list: string[] = [];

      list.push('type-' + props.type);
      list.push('shape-' + props.shape);
      list.push('radius-' + props.radius);

      if (props.disabled) {
        list.push('is-disabled');
      }

      return list;
    });

    const onClick = () => context.emit('click');

    return {
      classes,
      onClick,
    };
  },
});
</script>

<style lang="less">
</style>