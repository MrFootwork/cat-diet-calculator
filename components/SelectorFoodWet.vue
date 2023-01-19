<script setup lang="ts">
import FoodBrand from '~~/model/IFoodBrand';
import Calculator from '~~/model/MCalculator';

const calculator = ref(Calculator.getInstance());

const step = .5;
const minimum = 0;

function amountChange(brand: FoodBrand, operator: "+" | "-") {

  if (operator === "+") (brand.mixPortion as number) += step;

  if (operator === "-" && (brand.mixPortion as number) === 0) return;
  if (operator === "-") (brand.mixPortion as number) -= step;
}

function amountReset(brand: FoodBrand) {
  (brand.mixPortion as number) = 0;
}

// TODO is locale masking necessary?
// https://stackoverflow.com/questions/41112733/whats-the-proper-way-to-implement-formatting-on-v-model-in-vue-js-2-0
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

        <div class="input-number"
             v-if="wetFood.isMixPortion">
          <div class="input-number container">
            <button class="input-number-minus"
                    @click="amountChange(wetFood, '-')"
                    @dblclick="amountReset(wetFood)"
                    title="Double click to set to 0.">-</button>
            <input type="number"
                   :min="minimum"
                   :step="step"
                   v-model.number="wetFood.mixPortion" />
            <button class="input-number-plus"
                    @click="amountChange(wetFood, '+')">+</button>
          </div>
        </div>

      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'mixins' as *;
@use 'colors' as *;
@use 'variables' as *;

.wet-food {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  .wet-food-card {
    position: relative;

    @include foodCardSize;
    margin: 1rem;

    border-radius: $round-corner;
    @include boxShadowCard;

    &:hover {
      @include outlineOnHover;
    }

    &.activated {
      @include boxShadowCardActivated;
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
        border-radius: $round-corner;
      }

      input[type=checkbox] {
        visibility: hidden;
        display: none;
      }

      .input-number {

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;

        z-index: 10;
        bottom: 5%;
        width: 100%;

        & .input-number.container {

          display: flex;
          justify-content: space-between;
          align-items: center;

          width: 40%;
          min-width: 6rem;
          border-radius: 5rem;
          padding: .3rem;
          background-color: $light-primary-color;
          opacity: 90%;

          font-weight: 600;
          font-size: 1.2rem;
          color: white;

          &:hover {
            @include outlineOnHover;
          }

          input[type=number] {

            text-align: center;
            width: 2rem;
            background-color: inherit;
            outline: none;
            border: none;
            color: inherit;
            font-family: inherit;
            font-weight: inherit;
            font-size: inherit;

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

          button {
            width: 1.7rem;
            height: 1.7rem;
            border-radius: 50%;

            background: none;
            backdrop-filter: brightness(90%);
            border: none;
            cursor: pointer;

            font-weight: inherit;
            font-size: inherit;
            color: inherit;
            text-align: center;

            &:hover {
              box-shadow: -4px 3px 17px -5px black;
              backdrop-filter: brightness(100%);
            }

            &:active {
              box-shadow: inset -2px 2px 9px -5px black;
              backdrop-filter: brightness(100%);
            }
          }

          .input-number-minus {}

          .input-number-plus {}
        }
      }
    }
  }
}
</style>