<template>
  <ls-modal :show="isShowModal">
    <ls-dialog
      width="400px"
      title="Delete"
      content="This user is trying to delete connection with you: <Pentachaos(871080)>?"
    ></ls-dialog>
  </ls-modal>
</template>

<script lang="ts">

import Modal from '{packages}/modal';
import Dialog from '{packages}/dialog';
import { reactive, ref, computed } from 'vue';
import { DialogProps, DialogInstance } from 'types';

export default {
  name: "Confirm",
  components: {
    LsModal: Modal,
    LsDialog: Dialog,
  },
  props: {

  },
  setup() {
    const instances = ref<DialogInstance[]>([]);

    const current = computed((): DialogInstance => {
      const list = instances.value;
      return list.length ? list[list.length - 1] : null;
    });

    const isShowModal = computed((): boolean => !!current?.value?.showModal);

    const template = (): DialogInstance => {
      return {
        show: false,
        showModal: true,
      };
    };

    const open = (options: DialogProps): void => {
      instances.value.push({ ...template(), ...options })
    };

    const close = () => {
      console.log('close');
    };

    return {
      instances,
      current,
      isShowModal,
      open,
      close,
    };
  }
}
</script>

<style scoped>

</style>