<template>
  <div class="resultContainer">
    <img class="imageBowl" src="@/public/food-bowl.png" alt="">
    <p class="resultDisplay">{{ `${calculator.getResult(calculator.allBrands)} g` }}</p>
  </div>
</template>

<script setup lang="ts">
import Calculator from '~~/model/MCalculator'

const calculator = ref(Calculator.getInstance())
</script>

<style scoped lang="scss">
@use 'sassMixins' as *;
@use 'sassColors' as *;

.resultContainer {
  --length: 3vw;

  position: fixed;
  top: 1rem;
  right: var(--length);

  .imageBowl {
    position: absolute;
    top: 0;
    right: 0;
  }

  .resultDisplay {
    position: absolute;
    top: -30px;
    right: -9px;

    font-family: "Abril Fatface", cursive;
    font-size: 2rem;

    @include styleBody(light) {
      @at-root .resultDisplay {
        color: $light-text-color;
      }
    }

    @include styleBody(dark) {
      @at-root .resultDisplay {
        color: $dark-text-color;
      }
    }
  }


}
</style>