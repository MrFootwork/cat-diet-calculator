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
      <label for="ideal">
        <input type="radio"
               name="catShape"
               id="ideal"
               value="ideal"
               v-model="calculator.catShape" />
        <img src="https://img.icons8.com/color/96/null/thin-cat.png"
             alt="cat shape option ideal" />
        <!-- need to attribute for image -->
        <!-- <a target="_blank" href="https://icons8.com/icon/fzZBYAwn9fbk/skinny-cat">Skinny Cat icon by Icons8</a> -->
      </label>
      <label for="overweight">
        <input type="radio"
               name="catShape"
               id="overweight"
               value="overweight"
               v-model="calculator.catShape" />
        <img src="https://img.icons8.com/color/96/null/fat-cat.png"
             alt="cat shape option overweight" />
        <!-- <a target="_blank" href="https://icons8.com/icon/ZGYXhUYK9ciX/fat-cat">Fat Cat icon by Icons8</a> -->
      </label>
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
.cat-shape-help {
  margin: 1rem;
  display: flex;
  justify-content: center;

  img {
    width: 85vw;

  }
}
</style>