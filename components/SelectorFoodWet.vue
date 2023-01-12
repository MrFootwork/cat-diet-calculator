<script setup lang="ts">
import Calculator from '~~/model/MCalculator';

const calculator = ref(Calculator.getInstance());
</script>

<template>
  <div class="wet-food">
    <div class="wet-food-card"
         v-for="wetFood in calculator.brandsOfType('wet')"
         :key="wetFood._id"
         :class="{ activated: wetFood.isMixPortion }">
      <label :for="wetFood.name">
        <img :src="wetFood.image"
             :alt="wetFood.name" />
        <input type="checkbox"
               :id="wetFood.name"
               v-model="wetFood.isMixPortion" />

        <div class="input-number">
          <button class="input-number-minus"></button>
          <input v-if="wetFood.isMixPortion"
                 type="number"
                 min="0"
                 step=".5"
                 v-model.number="wetFood.mixPortion" />
          <button class="input-number-plus"></button>
        </div>

        <label :for="wetFood.name">{{ wetFood.name }}</label>
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'mixins' as *;

.wet-food {
  display: flex;
  align-items: center;
  justify-content: center;


  .wet-food-card {
    position: relative;

    width: 30vw;
    height: 46vw;
    max-width: 260px;
    max-height: 400px;
    margin: 1rem;

    border-radius: 5%;

    @include boxShadowCard;

    &.activated {
      @include boxShadowRainbow;
    }

    label {
      position: absolute;

      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        border-radius: 5%;
      }

      input[type=checkbox] {
        visibility: hidden;
      }

      .input-number {
        & .input-number-minus {}

        input[type=number] {
          position: absolute;

          bottom: 0;
          right: 0;
          z-index: 100;

          // hide spin buttons for
          // firefox 
          -moz-appearance: textfield;
          appearance: textfield;
          margin: 0;

          // and for chrome
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
        }

        & .input-number-plus {}
      }

    }
  }
}
</style>