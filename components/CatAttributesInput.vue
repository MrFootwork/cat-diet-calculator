<template>
  <div>

    <div class="cat-weight">
      <label for="cat-weight">{{ calculator.catWeight }}</label>
      <input id="cat-weight" type="range" min="3" max="6" v-model.number="calculator.catWeight" />
    </div>

    <div class="cat-shape">
      <label for="ideal">
        <input type="radio" name="catShape" id="ideal" value="ideal" v-model="calculator.catShape" />
        Ideal
      </label>
      <label for="overweight">
        <input type="radio" name="catShape" id="overweight" value="overweight" v-model="calculator.catShape" />
        Overweight
      </label>
      <button class="cat-shape-help-toggle" @click="toggleCatShapeHelp">
        What is my cat?
      </button>
    </div>

    <div class="cat-shape-help" v-if="showHelp">
      <img src="/HealthyCatWeight.webp" alt="Can you see/feel the ribs of your cat?" />
    </div>

  </div>
</template>

<script setup lang="ts">
import Calculator from '~~/model/MCalculator'

const calculator = ref(Calculator.getInstance())
const showHelp = ref(false)

function toggleCatShapeHelp() {
  showHelp.value = !showHelp.value
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