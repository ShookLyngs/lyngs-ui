<template>
  <div>
    <!--call-confirm-->
    <ul ref="list">
      <li v-for="item in 500" :key="item">
        <ls-button @click="openConfirm"><ls-icon name="ls-icon-loading"></ls-icon> click({{ item }})</ls-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import confirm from '{packages}/confirm';
import { async } from '{packages}/util';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const list = ref(null);

    const openConfirm = (): void => {
      setTimeout(() => {
        confirm({
          title: String(Date.now()),
          content: String(Date.now() * Math.floor(Math.random() * Math.pow(10, 10))),
          width: '400px',
          allowHtml: true,
          closeOnClick: false,
        }).then(async (context) => {
          if (context.button) context.button.loading = true;
          await async.timeout(1000);
          context.close();
        }).catch((context) => {
          context.close();
        });
      }, 1000);
    };

    return {
      list,
      confirm,
      openConfirm,
    };
  },
});
</script>

<style lang="less">

</style>
