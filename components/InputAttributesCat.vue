<script setup lang="ts">
import Calculator from '@/model/MCalculator';
import { useModalStore } from '@/store/modal';
import { storeToRefs } from 'pinia';


const calculator = ref(Calculator.getInstance());

const modalStore = useModalStore();
const { isHelpVisible } = storeToRefs(modalStore);
const { showHelp, hideHelp } = modalStore;

// const showHelp = ref(false);
// FIXME get this component to work with pinia
// BUG help modal is not showing
function toggleCatShapeHelp() {
  if (!modalStore) showHelp();
  if (modalStore) hideHelp();
}
</script>

<template>
  <div class="options-wrapper">

    <div class="cat-weight">
      <label for="cat-weight">{{ calculator.catWeight }}</label>
      <input id="cat-weight"
             type="range"
             min="3"
             max="6"
             v-model.number="calculator.catWeight" />
    </div>

    <div class="cat-shape">

      <input type="radio"
             name="catShape"
             id="ideal"
             value="ideal"
             v-model="calculator.catShape" />
      <label for="ideal">
        <img src="https://img.icons8.com/color/96/null/thin-cat.png"
             alt="cat shape option ideal" />
        <!-- need to attribute for image -->
      </label>
      <!-- <a target="_blank" href="https://icons8.com/icon/fzZBYAwn9fbk/skinny-cat">Skinny Cat icon by Icons8</a> -->

      <input type="radio"
             name="catShape"
             id="overweight"
             value="overweight"
             v-model="calculator.catShape" />
      <label for="overweight">
        <img src="https://img.icons8.com/color/96/null/fat-cat.png"
             alt="cat shape option overweight" />
      </label>
      <!-- <a target="_blank" href="https://icons8.com/icon/ZGYXhUYK9ciX/fat-cat">Fat Cat icon by Icons8</a> -->
    </div>

    <button class="cat-shape-help-toggle"
            @click="toggleCatShapeHelp">
      What is my cat?
    </button>

    <div class="cat-shape-help"
         @click="toggleCatShapeHelp"
         v-if="isHelpVisible">
      <img src="/HealthyCatWeight.webp"
           alt="Can you see/feel the ribs of your cat?" />
    </div>

  </div>
</template>

<style scoped lang="scss">
@use 'mixins' as *;

.options-wrapper {
  display: flex;
  // align-items: center;
  flex-direction: column;

  // .cat-shape-help {
  //   margin: 1rem;
  //   display: flex;
  //   justify-content: center;

  //   img {
  //     width: 85vw;

  //   }
  // }
  .cat-shape-help {
    position: fixed;
    // top: 0;
    // left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #000000;

    img {
      position: fixed;

      z-index: 100;
      width: 85vw;

    }
  }

  .cat-shape {
    input[type=radio] {
      display: none;

      &:checked+label>img {
        box-shadow: inset -6px 6px 25px -12px #000000;
        transform: scale(95%);
        transition: all 0s ease-in;
      }

      // TODO click animation for "negative" click

    }

    label {
      cursor: pointer;
      height: 5rem;

      img {
        height: 5rem;
        border-radius: 50%;
        box-shadow: -4px 4px 30px -6px #000000;
        transition: all .04s ease-in;
      }
    }

    input[type=radio]:checked:focus+label>img {
      box-shadow: inset -6px 6px 25px -12px #000000;
      transform: scale(90%);
      transition: all .04s ease-in;
    }
  }

  .cat-shape-help-toggle {
    width: 10rem;
  }
}
</style>