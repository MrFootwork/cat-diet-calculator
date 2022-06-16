<template>
  <div>
    <div class="dry-food">
      <div class="dry-food-card" v-for="dryFood in calculator.brandsOfType('dry')" :key="dryFood._id">
        <label :for="dryFood.name">
          <img :src="dryFood._id" :alt="dryFood.name" />
          <input type="checkbox" :id="dryFood.name" v-model="dryFood.isMixPortion" />
          {{ dryFood.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Calculator from '~~/model/MCalculator'

const calculator = ref(Calculator.getInstance())

</script>

<style scoped>
</style>