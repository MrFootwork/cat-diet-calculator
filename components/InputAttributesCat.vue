<template>
  <div>

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

      <button class="cat-shape-help-toggle"
              @click="toggleCatShapeHelp">
        What is my cat?
      </button>
    </div>

    <div class="cat-shape-help"
         v-if="showHelp">
      <img src="/HealthyCatWeight.webp"
           alt="Can you see/feel the ribs of your cat?" />
    </div>

  </div>
</template>

<script setup lang="ts">
import Calculator from '~~/model/MCalculator';

const calculator = ref(Calculator.getInstance());
const showHelp = ref(false);

function toggleCatShapeHelp() {
  showHelp.value = !showHelp.value;
}
</script>

<style scoped lang="scss">
@use 'mixins' as *;

.cat-shape-help {
  margin: 1rem;
  display: flex;
  justify-content: center;

  img {
    width: 85vw;

  }
}

.cat-shape {
  input[type="radio"] {
    visibility: hidden;

    &:checked+label>img {
      box-shadow: inset -4px 4px 20px -12px #000000;
      transform: scale(95%);
      transition: all .1s ease-in-out;
    }
  }

  label {
    cursor: pointer;
    height: 5rem;

    img {
      height: 5rem;
      border-radius: 50%;
      box-shadow: -4px 4px 20px -10px #000000;
      transition: all .1s ease-in-out;

    }
  }
}
</style>