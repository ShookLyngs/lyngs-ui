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

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const openConfirm = (): void => {
      console.log('button triggered');
    };

    return {
      openConfirm
    };
  },
});
</script>

<style lang="less">

</style>
