<template>
  <div class="ls-button">
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

import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: "Button",
  props: {
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
  setup(props) {


    return {

    };
  },
});
</script>

<style lang="less">

</style>