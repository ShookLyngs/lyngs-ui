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

import { defineComponent, ref, inject } from 'vue';
import { ConfirmInstance } from 'types';

export default defineComponent({
  name: 'Home',
  components: {},
  setup () {
    const list = ref(null);
    const confirm = inject<ConfirmInstance>('$confirm');

    const openConfirm = (): void => {
      setTimeout(() => {
        if (confirm && typeof confirm.open === 'function') {
          confirm.open({
            title: String(Date.now()),
            content: String(Date.now() * Math.floor(Math.random() * Math.pow(10, 10))),
            width: '400px',
            allowHtml: true,
            closeOnClick: false,
            buttons: [
              { text: 'Cancel', shape: 'text', radius: 'capsule' },
              { text: 'Confirm', shape: 'solid', type: 'normal', radius: 'capsule',
                onClick(button) {
                  button.loading = true;
                  setTimeout(() => button.loading = false, 1000);
                },
              },
            ],
          });
        }
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
