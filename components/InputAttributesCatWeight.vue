<script setup lang="ts">
import Calculator from '@/model/MCalculator';

const calculator = ref(Calculator.getInstance());
const weightMinimum = computed(() => calculator.value.weightProperties.minimum);
const weightMaximum = computed(() => calculator.value.weightProperties.maximum);
const weightSteps = computed(() => calculator.value.weightProperties.steps);

const slider = ref<HTMLInputElement>();
const sliderWidth = computed(() => {
  let width = slider.value?.offsetWidth;
  return width ? width : 0;
});

const sliderValue = computed(() => {
  return calculator.value.catWeight;
});

const sliderPosition = computed(() => {
  const thisPosition = (
    (calculator.value.catWeight - weightMinimum.value) /
    (weightMaximum.value - weightMinimum.value)
  );

  let borderCorrection = 0;

  if (sliderValue.value === weightMinimum.value) {
    borderCorrection = 2;
  } else if (sliderValue.value === weightMaximum.value) {
    borderCorrection = -2;
  } else {
    borderCorrection = 0;
  }
  const positionLeft = thisPosition * sliderWidth.value + borderCorrection;
  console.log(positionLeft);
  // return `calc(0.9rem + ${positionLeft} px)`;
  return `calc(0.9rem + 12 px)`;

  // return ((thisPosition * 100) + borderCorrection) + "px";
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