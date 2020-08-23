<template>
  <ls-modal :show="modal.show">
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
import { reactive, ref } from 'vue';
import { DialogStatus, DialogOptions, ConfirmOptionList } from 'types';

export default {
  name: "Confirm",
  components: {
    LsModal: Modal,
    LsDialog: Dialog,
  },
  props: {

  },
  setup() {
    const dialogOptionsTemplate = (): DialogOptions & DialogStatus => {
      return {
        show: false,
      };
    };
    const modal = reactive({
      show: false,
    });

    const dialogInstances: Array<DialogOptions & DialogStatus> = [];
    const instances = ref(dialogInstances);

    const open = (options: DialogOptions) => {
      modal.show = !modal.show;
      instances.value.push({ ...dialogOptionsTemplate(), ...options });
    };

    const close = () => {
      console.log('close');
    };

    return {
      modal,
      instances,
      open,
      close,
    };
  }
}
</script>

<style scoped>

</style>