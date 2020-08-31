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

import { defineComponent, ref, onMounted } from 'vue';

interface ControlParentsClasses {
  (
    action: string,
    classes: string | string[],
    stopsAt?: number | string,
  ): void;
}

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
      type: [ String, Number ],
      default: 'body',
    },
    // classes that's gonna be planted on.
    maskClass: {
      type: String,
      default: 'ls-modal-mask-parent-hidden',
    },
  },
  setup(props, context) {
    const wrapper = ref(null);

    const getWrapperElement = (): HTMLElement | null => wrapper.value ?? null;

    const controlParentsClasses: ControlParentsClasses = (action, classes, stopsAt) => {
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

    const onClickWrapper = (): void => context.emit('click');

    const onBeforeEnter = (): void => {
      controlParentsClasses('add', props.maskClass, props.pop);
      context.emit('before-enter');
    };
    const onAfterEnter = (): void => {
      context.emit('after-enter');
    };
    const onBeforeLeave = (): void => {
      context.emit('before-leave');
    };
    const onAfterLeave = (): void => {
      controlParentsClasses('remove', props.maskClass, props.pop);
      context.emit('after-leave');
    };

    onMounted(() => {
      if (props.show) {
        onAfterEnter();
      } else {
        onBeforeLeave();
      }
    });

    return {
      wrapper,
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