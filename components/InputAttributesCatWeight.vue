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

    <input id="cat-weight"
           type="range"
           ref="slider"
           :min="weightMinimum"
           :max="weightMaximum"
           :step="weightSteps"
           v-model.number="calculator.catWeight" />

    <div class="cat-head"
         :style="{ left: sliderPosition }">
      <div class="line"></div>
      <label for="cat-weight">
        {{ displayCatWeight }}
      </label>
    </div>

  </div>
</template>

<style scoped lang="scss">
@use 'variables' as *;
@use 'mixins' as *;
@use 'colors' as *;

div.cat-weight.input-range {
  padding: 0;
  margin: $margin-button;
  margin-left: 0;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  &>div.cat-head {}


  &>input[type=range] {
    -webkit-appearance: none;
    appearance: none;
    cursor: ew-resize;

    padding: 0;
    margin: $margin-button $margin-button $margin-button 0;
    width: calc(2 * $size-button + 2 * $margin-button);

    border-radius: $round-corner;
    @include boxShadowSlider;

    background: none;

    &:hover {
      @include outlineOnHover;
    }

    &:active {
      outline: none;

      // cat head on hover
      &+div.cat-head {
        display: flex;
        align-items: center;
        justify-content: center;

        &>label {
          display: block;
        }
      }
    }

    // basic cat head
    &+div.cat-head {
      // display: none;
      display: flex;
      align-items: center;
      justify-content: center;

      position: absolute;
      top: .1rem;
      z-index: 10;

      aspect-ratio: 1/1;
      width: calc(11 * $margin-button);
      transform:
        translateX(calc((-11 * $margin-button + .53rem)/2));

      background-color: $light-primary-color;
      border-radius: 50%;

      &>label {
        display: none;

        text-align: center;
        pointer-events: none;
      }

      &>.line {
        position: absolute;
        height: 100px;
        widows: 1px;
        background-color: red;
      }
    }
  }
}
</style>