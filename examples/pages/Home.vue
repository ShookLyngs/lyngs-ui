<template>
  <div>
    <ul ref="list">
      <li v-for="item in 500" :key="item">
        <button @click="openConfirm">Open Confirm({{ item }})</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import confirm from '{packages}/confirm';
import { async } from '{packages}/util';
import { defineComponent, ref, inject } from 'vue';
import { ConfirmInstance, DialogContext } from 'types';

export default defineComponent({
  name: 'Home',
  components: {},
  setup (props, context) {
    const list = ref(null);

    const openConfirm = (): void => {
      setTimeout(() => {
        confirm({
          title: String(Date.now()),
          content: String(Date.now() * Math.floor(Math.random() * Math.pow(10, 10))),
          width: '400px',
          allowHtml: true,
          closeOnClick: false,
          /*buttons: [
            { text: 'Cancel', shape: 'text', radius: 'capsule', trigger: 'cancel' },
            { text: 'Confirm', shape: 'solid', type: 'normal', radius: 'capsule' },
          ],*/
        }).then((context) => {
          context.close();
        }).catch((context) => {
          context.close();
        });
      }, 1000);
    };

    return {
      list,
      confirm,
      openConfirm
    };
  },
});
</script>

<style lang="less">

</style>
