<script setup lang="ts">
import Calculator from '@/model/MCalculator';

const calculator = ref(Calculator.getInstance());

</script>

<template>
  <!-- FIXME create seperate range slider component -->
  <!-- inspiration: https://codepen.io/kdbkapsere/pen/vRmVZX -->
  <div class="cat-weight input-range">
    <label for="cat-weight">{{ calculator.catWeight }}</label>
    <input id="cat-weight"
           type="range"
           min="3"
           max="6"
           v-model.number="calculator.catWeight" />
  </div>
</template>

<style scoped lang="scss">
@use 'variables' as *;

div.cat-weight.input-range {
  // border: 3px solid black;
  padding: 0;
  margin: $margin-button;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  &>label {
    // border: 3px solid violet;
    width: 2rem;
    text-align: center;
  }

  &>input[type=range] {
    border: 3px solid red;
    width: calc(2 * 4rem);
  }
}
</style>