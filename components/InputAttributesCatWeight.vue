<script setup lang="ts">
import Calculator from '@/model/MCalculator';

const calculator = ref(Calculator.getInstance());

// computed values
const displayCatWeight = computed(() => new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 1,
  style: 'unit',
  unit: 'kilogram'
}).format(calculator.value.catWeight));
const weightMinimum = computed(() => calculator.value.weightProperties.minimum);
const weightMaximum = computed(() => calculator.value.weightProperties.maximum);
const weightSteps = computed(() => calculator.value.weightProperties.steps);

// read current slider width
const slider = ref<HTMLInputElement>();
const sliderWidth = computed(() => {
  return slider.value?.offsetWidth || 0;
});

// calculate slider position in relation to parent
const sliderPosition = computed(() => {
  // adjust start position, if minimum is not right
  const shiftStart = '1rem';
  // adjust length factor, if end position doesn't match
  const lengthFactor = 0.9;

  const relativePosition =
    (calculator.value.catWeight - weightMinimum.value) /
    (weightMaximum.value - weightMinimum.value);

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
      {{ displayCatWeight }}
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
    width: auto;
    text-align: center;
  }

  &>input[type=range] {
    -webkit-appearance: none;
    appearance: none;
    padding: 0;
    margin: $margin-button;
    width: calc(2 * $size-button + 4 * $margin-button);
  }
}
</style>