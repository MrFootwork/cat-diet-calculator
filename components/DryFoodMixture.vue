<template>
  <div class="dry-mix" v-if="moreThanOneDryFoodSelected">
    <div class="dry-mix-slider" v-for="(dryFood, i) in selectedDryBrands" :key="dryFood._id">
      <input id="dry-food-brand-name" type="range" min="0" max="1" step=".1" v-model.number="dryFood.mixPortion" />
    </div>

    <PieChart :chart-data="pieChartData" />
    <p>{{ selectedDryBrands.map(brand => brand.color) }}</p>

  </div>
</template>

<script setup lang="ts">
import Calculator from '~~/model/MCalculator'
import PieChart from '~~/components/PieChart'

defineProps([
  'pieChartData'
])

const calculator = ref(Calculator.getInstance())

const pieChartData = computed(() => {

  const selectedDryBrandsNames = selectedDryBrands.value.map(brand => brand.name)
  const selectedDryBrandsColors = selectedDryBrands.value.map(brand => brand.color)
  const selectedDryBrandsPortions = selectedDryBrands.value.map(brand => brand.mixPortion)

  return {
    labels: selectedDryBrandsNames,
    datasets: [
      {
        backgroundColor: selectedDryBrandsColors,
        data: selectedDryBrandsPortions
      },
    ],
  }
})

const selectedDryBrands = computed(() => {

  return calculator.value
    .brandsOfType('dry')
    .filter(brand => brand.isMixPortion)

})

const moreThanOneDryFoodSelected = computed(() => {

  const selectedDryFoodCount = calculator.value
    .brandsOfType('dry')
    .reduce((count, brand) => {

      // TODO Find algorithm which breaks at finding more than one selected
      const isSelected = brand.isMixPortion || false

      return count + +isSelected
    }, 0)

  return selectedDryFoodCount > 1

})
</script>

<style scoped>
</style>