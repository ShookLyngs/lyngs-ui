<template>
  <div class="ls-modal-content">
    <slot></slot>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: "LsModalContent",
});
</script>

<style lang="less">
</style>