<template>
  <ls-modal :show="isShowModal">
    <ls-dialog
      v-for="dialog in instances"
      :key="dialog.id"
      :show="isShowDialog(dialog)"
      :title="dialog.title"
      :content="dialog.content"
      :buttons="dialog.buttons"
      :width="dialog.width"
      :max-width="dialog.maxWidth"
      :allow-html="dialog.allowHtml"
      :close-on-click="dialog.closeOnClick"
    ></ls-dialog>
  </ls-modal>
</template>

<script lang="ts">

import Modal from '{packages}/modal';
import Dialog from '{packages}/dialog';
import { ref, computed } from 'vue';
import { DialogInstance, IsShowConfirmDialog, ConfirmTemplate, OpenConfirm } from 'types';

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

    const isShowModal = computed(() => !!current?.value?.showModal);

    const isShowDialog: IsShowConfirmDialog = (dialog) => dialog.id === current.value.id;

    const template: ConfirmTemplate = () => {
      return {
        id: Date.now() + Math.floor(Math.random() * 100),
        show: false,
        showModal: true,
      };
    };

    const open: OpenConfirm = (options) => {
      instances.value.push({ ...template(), ...options })
    };

    const close = () => {
      console.log('close');
    };

    return {
      instances,
      current,
      isShowModal,
      isShowDialog,
      open,
      close,
    };
  }
}
</script>

<style scoped>

</style>