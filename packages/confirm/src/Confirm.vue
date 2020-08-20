<template>
  <modal :show="modal.show">

  </modal>
</template>

<script>

import Modal from './Modal.vue';
import { reactive } from 'vue';

export default {
  name: "Confirm",
  components: {
    Modal,
  },
  setup() {
    const modal = reactive({
      show: false,
    });

    const open = () => {
      console.log('open');
    };

    const close = () => {
      console.log('close');
    };

    return {
      modal,
      open,
      close,
    };
  }
}
</script>

<style scoped>

</style>