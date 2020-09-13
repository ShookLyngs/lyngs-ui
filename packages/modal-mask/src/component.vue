<template>
  <transition
    name="ls-fade"
    @before-enter="onBeforeEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @after-leave="onAfterLeave"
  >
    <div
      class="ls-modal-mask"
      ref="wrapper"
      v-if="show"
      @click="onClickWrapper"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted, PropType } from 'vue';
import { ModalMask, ModalGetWrapperElement, ModalControlParentsClasses } from 'types';

export default defineComponent({
  name: "LsModalMask",
  props: {
    // indicates the visibility of the component
    show: {
      type: Boolean,
      default: false,
    },
    // the component will do class actions base on this prop.
    // possible String values:
    // - 'body': only plant classes on document.body.
    // - 'parents': plant classes on every parent of the component.
    // possible Number values:
    // - n: find parents and stops at the nth, only accept positive number.
    pop: {
      type: [ String, Number ] as PropType<ModalMask['pop']>,
      validator: (value: ModalMask['pop']) => typeof value === 'string' || value > 0,
      default: 'body',
    },
    // classes that's gonna be planted on.
    plantClass: {
      type: String,
      default: 'ls-modal-mask-parent-hidden',
    },
  },
  setup(props: ModalMask, context) {
    const wrapper = ref(null);

    const getWrapperElement: ModalGetWrapperElement = () => wrapper.value ?? null;

    const controlParentsClasses: ModalControlParentsClasses = (action, classes, stopsAt) => {
      const merged = Array.isArray(classes) ? classes : [ classes ],
            wrap   = getWrapperElement(),
            body   = document.body;
      let   parent = wrap?.parentElement,
            index  = 0;

      if (stopsAt === 'body') {
        if (body.classList[action] instanceof Function) {
          merged.forEach(string => body.classList[action](string));
        }
      } else {
        while (parent) {
          if (parent.classList[action] instanceof Function) {
            merged.forEach(string => parent && parent.classList[action](string));
          }

          if (parent === body) break;
          if (typeof stopsAt === 'number' && ++index && index >= stopsAt) break;

          parent = parent.parentElement ? parent.parentElement : null;
        }
      }
    };

    const onClickWrapper = () => context.emit('click');

    const onBeforeEnter = () => {
      controlParentsClasses('add', props.plantClass, props.pop);
      context.emit('before-enter');
    };
    const onAfterEnter = () => {
      context.emit('after-enter');
    };
    const onBeforeLeave = () => {
      context.emit('before-leave');
    };
    const onAfterLeave = () => {
      controlParentsClasses('remove', props.plantClass, props.pop);
      context.emit('after-leave');
    };

    onMounted(() => {
      if (props.show) onAfterEnter();
      else onBeforeLeave();
    });

    return {
      // refs
      wrapper,
      // passives
      onClickWrapper,
      onBeforeEnter,
      onAfterEnter,
      onBeforeLeave,
      onAfterLeave,
    };
  },
});
</script>

<style lang="less">
</style>