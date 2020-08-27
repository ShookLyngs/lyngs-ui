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
      @close="onDialogClose(dialog)"
    ></ls-dialog>
  </ls-modal>
</template>

<script lang="ts">

import Modal from '{packages}/modal';
import Dialog from '{packages}/dialog';
import { ref, computed } from 'vue';
import { DialogInstance, IsShowConfirmDialog, ConfirmTemplate, OpenConfirm, CloseConfirm, OnConfirmDialogClose } from 'types';

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
      const merged = { ...template(), ...options };
      instances.value.push(merged);

      return merged.id;
    };

    const close: CloseConfirm = (id) => {
      const list = instances.value;
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list.splice(i, 1);
          return true;
        }
      }
      return false;
    };

    const onDialogClose: OnConfirmDialogClose = (dialog) => {
      if (dialog.id) close(dialog.id);
    };

    return {
      instances,
      current,
      isShowModal,
      isShowDialog,
      open,
      close,
      onDialogClose,
    };
  }
}
</script>

<style scoped>

</style>