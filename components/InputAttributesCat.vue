<script setup lang="ts">
import Calculator from '@/model/MCalculator';
import { useModalStore } from './../store/modal';

const calculator = ref(Calculator.getInstance());

const modalStore = useModalStore();
const { showHelp, hideHelp } = modalStore;

// FIXME style display for modal correctly
function toggleCatShapeHelp() {
  const modalStore = useModalStore();
  if (!modalStore.isHelpVisible) {
    setTimeout(() => {
      showHelp();
    }, 40);
    return;
  }
  if (modalStore.isHelpVisible) {
    hideHelp();
  }
}
</script>

<template>
  <div class="options-wrapper">

    <!-- input cat weight -->
    <InputAttributesCatWeight />

    <!-- input cat shape -->
    <div class="cat-shape">

      <input type="radio"
             name="catShape"
             id="ideal"
             value="ideal"
             v-model="calculator.catShape" />
      <label for="ideal"
             class="radio-button ideal">
        <img src="https://img.icons8.com/color/96/null/thin-cat.png"
             alt="cat shape option ideal" />
        <!-- TODO attribution -->
        <!-- <a target="_blank" href="https://icons8.com/icon/fzZBYAwn9fbk/skinny-cat">Skinny Cat icon by Icons8</a> -->
      </label>

      <input type="radio"
             name="catShape"
             id="overweight"
             value="overweight"
             v-model="calculator.catShape" />
      <label for="overweight"
             class="radio-button overweight">
        <img src="https://img.icons8.com/color/96/null/fat-cat.png"
             alt="cat shape option overweight" />
        <!-- TODO attribution -->
        <!-- <a target="_blank" href="https://icons8.com/icon/ZGYXhUYK9ciX/fat-cat">Fat Cat icon by Icons8</a> -->
      </label>

      <button class="cat-shape-help-toggle"
              @click="toggleCatShapeHelp">
        <img src="https://img.icons8.com/flat-round/64/null/question-mark.png" />
        <!-- TODO attribution -->
        <!-- <a target="_blank" href="https://icons8.com/icon/80684/question-mark">Question Mark icon by Icons8</a> -->
      </button>

    </div>

    <!-- modal for help infos on cat shape -->
    <Teleport to="body">
      <div class="cat-shape-help"
           @click="toggleCatShapeHelp"
           v-if="modalStore.isHelpVisible">
        <img src="/HealthyCatWeight.webp"
             alt="Can you see/feel the ribs of your cat?"
             :data-show="modalStore.isHelpVisible" />
      </div>
    </Teleport>

  </div>
</template>

<style scoped lang="scss">
@use 'mixins' as *;
@use 'colors' as *;
@use 'variables' as *;


// the helper modal
.cat-shape-help {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: hsl(0, 0%, 0%, 0.2);
  backdrop-filter: blur(5px);

  img {
    position: fixed;

    z-index: 101;
    aspect-ratio: $aspect-ratio-info-box;

    border-radius: $round-corner;
    box-shadow: -3px 3px 15px 3px black;

    &[data-show=false] {
      width: 0;
    }

    &[data-show=true] {
      @include orientationSize(95)
    }
  }
}

.options-wrapper {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  .cat-shape {
    display: flex;
    align-items: flex-start;

    label,
    button {
      margin: $margin-button;
      margin-bottom: 0;
      padding: 0;
    }

    input[type=radio] {
      display: none;

      &:checked+label>img {
        @include boxShadowButtonChecked;
      }

      &:active+label>img {
        @include boxShadowButtonActive;
      }
    }

    label.radio-button {
      cursor: pointer;
      height: $size-button;
      aspect-ratio: 1 / 1;

      img {
        height: inherit;
        aspect-ratio: inherit;
        border-radius: $round-corner;
        @include boxShadowButton;
      }

      &:hover>img {
        @include outlineOnHover;
      }

      &.ideal {
        margin-left: 0;
      }

      &.overweight {}
    }

    button.cat-shape-help-toggle {
      cursor: pointer;

      background: none;
      border: none;
      width: auto;

      img {
        width: 1.5rem;
        border-radius: $round-corner;
      }

      &:hover>img {
        @include outlineOnHover;
      }

      &:active>img {
        transform: translateY(2px);
        box-shadow: none;
      }
    }
  }
}
</style>