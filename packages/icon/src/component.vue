<template>
  <template v-if="type === 'svg'">
    <svg class="ls-icon-svg" aria-hidden="true">
      <use :xlink:href="'#' + name"></use>
    </svg>
  </template>
  <template v-else-if="type === 'css'">
    <span class="ls-icon-css" :class="name"></span>
  </template>
</template>

<script lang="ts">

import './resources/iconfont.js';
import './resources/iconfont.css';
import { defineComponent, PropType } from 'vue';
import { IconProps } from 'types';

export default defineComponent({
  name: "LsIcon",
  props: {
    type: {
      type: String as PropType<IconProps['type']>,
      default: 'svg',
    },
    name: {
      type: String,
      default: '',
    }
  },
});
</script>

<style lang="less">
</style>