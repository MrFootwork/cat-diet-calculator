<script setup lang="ts">
import Calculator from '~~/model/MCalculator'

const calculator = ref(Calculator.getInstance())
</script>

<template>
  <div class="result-container">

    <div class="wrapper-bowl">
      <!-- https://nuxt.com/docs/getting-started/assets#public-directory -->
      <img class="image-bowl"
           src="/food-bowl-fish.png"
           alt="">
    </div>

    <div class="wrapper-result-display">
      <p id="result"
         class="result-display">{{ `${calculator.getResult(calculator.allBrands)} g` }}</p>
    </div>

    <div class="wrapper-label">
      <div class="label-result">
        <label for="result">Daily</label>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
@use 'sassMixins' as *;
@use 'sassColors' as *;


@include styleBody(light) {
  .result-container {
    color: $light-text-color;
  }
}

@include styleBody(dark) {
  .result-container {
    color: $dark-text-color;
  }
}

.result-container {
  --length: 3vw;

  position: fixed;
  top: 1rem;
  right: var(--length);
  font-family: "Abril Fatface", cursive;

  z-index: 100;

  .wrapper-bowl {
    .image-bowl {
      position: relative;
      top: 0;
      right: 0;
      width: calc(1.3*96px);
      height: calc(1.3*96px);
    }
  }

  .wrapper-result-display {
    position: absolute;
    top: -30px;
    right: -9px;
    width: 100%;
    height: 100%;
    text-align: center;

    .result-display {
      position: relative;
      font-size: 2rem;
    }
  }

  .wrapper-label {
    position: absolute;
    top: 80px;
    right: 0px;
    width: 100%;
    text-align: center;

    .label-result {
      font-size: 1.5rem;
    }
  }
}
</style>