<template>
  <div>
    <home></home>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Home from '{examples}/pages/Home.vue';

export default defineComponent({
  name: 'App',
  components: {
    Home,
  },
});
</script>

<style lang="less">

</style>
