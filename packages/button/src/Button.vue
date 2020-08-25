<template>
  <div class="ls-button" tabindex="-1" @click="onClick">
    <slot name="prefix">
      <i v-if="prefix" :class="prefix"></i>
    </slot>
    <slot>
      <span>{{ text }}</span>
    </slot>
    <slot name="suffix">
      <i v-if="suffix" :class="suffix"></i>
    </slot>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: "Button",
  props: {
    type: {
      type: String,
      default: '',
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
  },
  setup(props, context) {
    const onClick = () => context.emit('click');

    return {
      onClick,
    };
  },
});
</script>

<style lang="less">

</style>