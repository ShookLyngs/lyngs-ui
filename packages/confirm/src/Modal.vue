<template>
  <transition
    name="fade"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
  >
    <div
      class="ls-modal-wrapper"
      ref="wrapper"
      v-if="show"
      @click="onClickWrapper"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';

interface ControlParentsClasses {
  (
    action: string,
    classes: string | string[],
    stopsAt?: number | string,
  ): void;
}

export default defineComponent({
  name: "Modal",
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

    const onAfterEnter = (): void => {
      controlParentsClasses('add', 'ls-modal-parent-hidden', props.pop);
      context.emit('after-enter');
    };

    const onBeforeLeave = (): void => {
      controlParentsClasses('remove', 'ls-modal-parent-hidden', props.pop);
      context.emit('after-leave');
    };

    return {
      wrapper,
      onClickWrapper,
      onAfterEnter,
      onBeforeLeave,
    };
  },
});
</script>

<style lang="less">

// modal background
.ls-modal-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;

  &.is-show {
    opacity: 1;
  }
}

//
.ls-modal-parent-hidden {
  overflow: hidden;
}

// <Transition> Fading transition classes
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}

</style>