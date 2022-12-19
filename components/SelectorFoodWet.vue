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
        <input v-if="wetFood.isMixPortion"
               type="number"
               min="0"
               step=".5"
               v-model.number="wetFood.mixPortion" />
        <label :for="wetFood.name">{{ wetFood.name }}</label>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import Calculator from '~~/model/MCalculator'

const calculator = ref(Calculator.getInstance())
</script>

<style scoped lang="scss">
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

    box-shadow: -5px 5px 20px -5px hsl(0, 0%, 0%);

    &.activated {
      box-shadow: 5px 5px 15px 5px #FF8080, -9px 5px 15px 5px #FFE488, -7px -5px 15px 5px #8CFF85, 12px -5px 15px 5px #80C7FF, 12px 10px 15px 7px #E488FF, -10px 10px 15px 7px #FF616B, -10px -7px 27px 1px #8E5CFF, 5px 5px 15px 5px rgba(0, 0, 0, 0);
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

      // how to hide the spin buttons
      // input[type=number]::-webkit-inner-spin-button {
      //   -webkit-appearance: none;
      // }

      input[type=number] {
        position: absolute;

        bottom: 0;
        right: 0;
        z-index: 100;
      }
    }
  }
}
</style>