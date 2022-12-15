<template>
  <div class="wet-food">
    <div class="wet-food-card" v-for="wetFood in calculator.brandsOfType('wet')" :key="wetFood._id">
      <label :for="wetFood.name">
        <img :src="wetFood._id" :alt="wetFood.name" />
        <input type="checkbox" :id="wetFood.name" v-model="wetFood.isMixPortion" />
        {{ wetFood.name }}
        <input type="number" min="0" step=".5" v-model.number="wetFood.mixPortion" v-if="wetFood.isMixPortion" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import Calculator from '~~/model/MCalculator'

const calculator = ref(Calculator.getInstance())
</script>

<style scoped>
</style>