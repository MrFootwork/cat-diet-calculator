<script setup lang="ts">
import Calculator from '@/model/MCalculator';

const calculator = ref(Calculator.getInstance());
const weightMinimum = computed(() => calculator.value.weightProperties.minimum);
const weightMaximum = computed(() => calculator.value.weightProperties.maximum);
const weightSteps = computed(() => calculator.value.weightProperties.steps);

const sliderValue = computed(() => {
  return calculator.value.catWeight;
});

const sliderPosition = computed(() => {
  const thisPosition = (
    (calculator.value.catWeight - weightMinimum.value) /
    (weightMaximum.value - weightMinimum.value)
  );

  if (sliderValue.value === weightMaximum.value) {
    return ((thisPosition * 100) + 2) + "px";
  } else if (sliderValue.value === weightMaximum.value) {
    return ((thisPosition * 100) - 2) + "px";
  } else {
    return ((thisPosition * 100)) + "px";
  }

  return ((thisPosition * 100) - 2) + "px";
});
</script>

<template>
  <!-- FIXME create seperate range slider component -->
  <!-- inspiration: https://codepen.io/kdbkapsere/pen/vRmVZX -->
  <div class="cat-weight input-range">
    <label for="cat-weight"
           :style="{ left: sliderPosition }">
      {{ calculator.catWeight }}
    </label>
    <input id="cat-weight"
           type="range"
           :min="weightMinimum"
           :max="weightMaximum"
           :step="weightSteps"
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
    position: absolute;
    top: 0;
    width: 2rem;
    text-align: center;
  }

  &>input[type=range] {
    border: 3px solid red;
    width: calc(2 * $size-button + 1px);
  }
}
</style>