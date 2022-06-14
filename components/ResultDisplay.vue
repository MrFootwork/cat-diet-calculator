<template>
  <div class="result">
    <p>Result: {{ calculator.getResult(calculator.allBrands) }}</p>
  </div>
</template>

<script setup lang="ts">
import Calculator from '~~/model/MCalculator'

const calculator = ref(Calculator.getInstance())
</script>

<style scoped lang="scss">
.result {
  position: sticky;
  bottom: 10px;
  right: 0px;
  width: 100px
}
</style>