<template>
  <div>
    <ul>
      <li v-for="item in 500" :key="item">
        <button @click="openConfirm">Open Confirm({{ item }})</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { defineComponent, inject } from 'vue';
import { ConfirmInstance } from 'types';


export const getConfirmInstanceStructure = (): ConfirmInstance => {
  return {
    open: (options) => void 0,
    close: () => void 0,
  };
};

export default defineComponent({
  name: 'Home',
  components: {},
  setup () {
    const confirm = inject('$confirm', getConfirmInstanceStructure());

    const openConfirm = (): void => {
      if (typeof confirm.open === 'function') {
        confirm.open({
          title: 'Delete',
          content: 'Are you sure you wanna delete: <b>Chaos(871080)</b> ?',
        });
      }
    };

    return {
      confirm,
      openConfirm
    };
  },
});
</script>

<style lang="less">

</style>
