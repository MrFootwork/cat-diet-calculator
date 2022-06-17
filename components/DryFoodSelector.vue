<template>
  <div>
    <div class="dry-food">
      <div class="dry-food-card" v-for="dryFood in calculator.brandsOfType('dry')" :key="dryFood._id">
        <label :for="dryFood.name">
          <!-- <img :src="dryFood._id" :alt="dryFood.name" /> -->
          <img :src="urlPlaceholder(dryFood)" :alt="dryFood.name" />
          <input type="checkbox" :id="dryFood.name" v-model="dryFood.isMixPortion" />
          {{ dryFood.name }}
        </label>
      </div>
    </div>
  </div>
</template>
<!-- FIXME build card slider -->
<!-- https://www.youtube.com/watch?v=OQZNAMjC6Vg -->
<script setup lang="ts">
import FoodBrand from '~~/model/IFoodBrand';
import Calculator from '~~/model/MCalculator'

const calculator = ref(Calculator.getInstance())

const urlPlaceholder = function (dryFood: FoodBrand) {

  const baseUrl = 'https://via.placeholder.com/100x150'
  const query = `?text=${dryFood.name}`

  return baseUrl + query

}
</script>

<style scoped>
</style>