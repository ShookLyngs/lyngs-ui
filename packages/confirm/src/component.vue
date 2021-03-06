<template>
  <div>
    <!-- modal-mask -->
    <ls-modal-mask :show="isShowModal"></ls-modal-mask>

    <!-- dialog-list -->
    <transition-group name="ls-scale">
      <template v-for="dialog in instances">
        <ls-dialog
          v-if="isShowDialog(dialog)"
          :="dialog"
          :key="dialog.id"
          :show="isShowDialog(dialog)"
          @close="onDialogClose(dialog)"
        ></ls-dialog>
      </template>
    </transition-group>
  </div>
</template>

<script lang="ts">

import ModalMask from '{packages}/modal-mask';
import Dialog from '{packages}/dialog';
import { ref, computed, defineComponent } from 'vue';
import { DialogInstance, DialogContext, IsShowConfirmDialog, ConfirmTemplate, OpenConfirm, CloseConfirm, OnConfirmDialogClose, MousePosition, } from 'types';

let mousePosition: MousePosition | null = null;
const getMousePosition = (event: MouseEvent) => {
  mousePosition = {
    x: event.pageX,
    y: event.pageY,
  };
  setTimeout(() => {
    mousePosition = null;
  }, 100);
};
if (window && window.document && window.document.documentElement) {
  document.documentElement.addEventListener('click', getMousePosition, true);
}

export default defineComponent({
  name: "LsConfirm",
  components: {
    LsModalMask: ModalMask,
    LsDialog: Dialog,
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
      return new Promise<DialogContext>((resolve, reject) => {
        const dialog = {
          ...template(),
          ...options,
          ...{
            onPromiseResolve: resolve,
            onPromiseReject: reject,
            mousePosition: mousePosition,
          }
        };

        instances.value.push(dialog);
      });
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
      // refs
      instances,
      // computed
      current,
      isShowModal,
      // active
      isShowDialog,
      open,
      close,
      // passive
      onDialogClose,
    };
  }
});
</script>

<style scoped>

</style>