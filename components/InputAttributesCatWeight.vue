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

// cat head resizes dynamically
const catHeadScale = computed(() => {
  return `${1 + .4 * relativePosition.value - .2}`;
});

/********************************************************
 *    slider
 ********************************************************/
// relative position of the slider
const relativePosition = computed(() => {
  return (calculator.value.catWeight - weightMinimum.value) /
    (weightMaximum.value - weightMinimum.value);
});
// read current slider width
const slider = ref<HTMLInputElement>();
const sliderWidth = computed(() => {
  return slider.value?.offsetWidth || 0;
});
// calculate slider position in relation to parent
const sliderPosition = computed(() => {
  // adjust start position, if minimum is not right
  const shiftStart = '1.3rem';
  // adjust length factor, if end position doesn't match
  const lengthFactor = .9;

  const positionLeft = lengthFactor * relativePosition.value * sliderWidth.value;

  return `calc(${shiftStart} + ${positionLeft}px)`;
});
// TODO cat head motion sets value
// impossible to style built-in slider thumb
// thoughts: rebuild the range thumb from scratch

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

    <div class="cat-head-wrapper">
      <div class="cat-head"
           :style="{ left: sliderPosition, scale: catHeadScale }">
        <div class="grid-line"></div>
        <div class="mouth whisker whisker-1"></div>
        <div class="mouth whisker whisker-2"></div>
        <div class="mouth whisker whisker-3"></div>
        <div class="mouth whisker-mask"></div>
        <div class="ear left"></div>
        <div class="ear right"></div>
        <label for="cat-weight">
          {{ displayCatWeight }}
        </label>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
@use 'variables' as *;
@use 'mixins' as *;
@use 'colors' as *;

div.cat-weight.input-range {
  padding: 0;
  margin: calc(16* $margin-button) 0 0 0;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  &>input[type=range] {
    -webkit-appearance: none;
    appearance: none;
    cursor: ew-resize;

    padding: 1px;
    margin: 0;
    width: calc(2 * $size-button + 2 * $margin-button);

    border-radius: calc($round-corner * 2);
    @include boxShadowSlider;

    background: none;

    &:active {
      outline: none;
    }

    &:hover,
    &:focus {
      @include outlineOnHover;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: calc($size-button / 3);
      aspect-ratio: 1/1;

      background: $light-primary-color;
      border-radius: 50%;

      transition: 1s ease-in-out;
    }

    &::-moz-range-thumb {
      width: calc($size-button / 3.6);
      height: calc($size-button / 3.6);

      background: $light-primary-color;
      border-radius: 50%;
      border: none;

      transition: 0.1s ease-in-out;
    }

    // basic cat head
    &+div.cat-head-wrapper>div.cat-head {
      // display: none;
      display: flex;
      align-items: center;
      justify-content: center;

      position: absolute;
      top: 3rem;
      z-index: 10;

      aspect-ratio: 1/1;
      width: calc(11 * $margin-button);
      transform: translateX(calc((-11 * $margin-button + .53rem)/2));

      background-color: $light-primary-color;
      border-radius: 50%;

      &>label {
        display: inline-block;
        translate: 0 -.3rem;
        z-index: 20;

        color: white;

        text-align: center;
        pointer-events: none;
      }

      &>.mouth {
        position: absolute;
        display: block;
        translate: 0 .9rem;

        &.whisker-mask {
          height: 1.5rem;
          width: 1.5rem;
          border-radius: 50%;
          background-color: inherit;
        }

        &.whisker {
          height: 5rem;
          width: 2px;
          background-color: $light-secondary-color;

          &.whisker-1 {
            rotate: 80deg;
          }

          &.whisker-2 {
            rotate: 90deg;
          }

          &.whisker-3 {
            rotate: 100deg;
          }
        }
      }

      &>.ear {
        position: absolute;
        width: 20%;
        height: 50%;
        top: 0%;
        background-color: $light-primary-color;
        border-radius: 50%;
        z-index: 8;

        &.left {
          transform: rotate(160deg);
          left: 6%;
        }

        &.right {
          transform: rotate(20deg);
          right: 6%;
        }
      }
    }
  }
}
</style>