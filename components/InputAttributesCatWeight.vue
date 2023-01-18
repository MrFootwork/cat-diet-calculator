<script setup lang="ts">
import Calculator from '@/model/MCalculator';

const calculator = ref(Calculator.getInstance());
const weightMinimum = computed(() => calculator.value.weightProperties.minimum);
const weightMaximum = computed(() => calculator.value.weightProperties.maximum);
const weightSteps = computed(() => calculator.value.weightProperties.steps);

// read current slider width
const slider = ref<HTMLInputElement>();
const sliderWidth = computed(() => {
  let width = slider.value?.offsetWidth;
  return width ? width : 0;
});

// calculate slider position in relation to parent
const sliderPosition = computed(() => {
  const relativePosition = (
    (calculator.value.catWeight - weightMinimum.value) /
    (weightMaximum.value - weightMinimum.value)
  );

  const shiftStart = '1rem';
  const lengthFactor = 0.9;
  const positionLeft = lengthFactor * relativePosition * sliderWidth.value;

  return `calc(${shiftStart} + ${positionLeft}px)`;
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
           ref="slider"
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
    top: $margin-button;
    width: 2rem;
    text-align: center;
  }

  &>input[type=range] {
    padding: 0;
    margin: $margin-button;
    width: calc(2 * $size-button + 4 * $margin-button);
  }
}
</style>