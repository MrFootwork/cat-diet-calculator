<script setup lang="ts">
import Calculator from '~~/model/MCalculator';
import PieChart from '~~/components/PieChart';

defineProps([
  'pieChartData'
]);

const calculator = ref(Calculator.getInstance());

const pieChartData = computed(() => {

  const selectedDryBrandsNames = selectedDryBrands.value.map(brand => brand.name);
  const selectedDryBrandsColors = selectedDryBrands.value.map(brand => brand.color);
  const selectedDryBrandsPortions = selectedDryBrands.value.map(brand => brand.mixPortion);

  return {
    labels: selectedDryBrandsNames,
    datasets: [
      {
        backgroundColor: selectedDryBrandsColors,
        data: selectedDryBrandsPortions
      },
    ],
  };
});

const selectedDryBrands = computed(() => {

  return calculator.value
    .brandsOfType('dry')
    .filter(brand => brand.isMixPortion);

});
</script>

<template>
  <div class="wrapper component">

    <h4 class="title">Dry Food Mixer</h4>

    <div class="wrapper mixture">

      <div class="dry-mix"
           v-if="selectedDryBrands.length >= 2">

        <div class="dry-mix-slider"
             v-for="dryFood in selectedDryBrands"
             :key="dryFood._id">
          <input id="dry-food-brand-name"
                 type="range"
                 min="0"
                 max="1"
                 step=".1"
                 v-model.number="dryFood.mixPortion" />
        </div>
        <PieChart :chart-data="pieChartData" />
        <p>{{ selectedDryBrands.map(brand => brand.color) }}</p>

      </div>

      <div v-else-if="selectedDryBrands.length === 1">
        You use "{{ selectedDryBrands[0]?.name }}" as dry food only.
      </div>

      <div v-else-if="selectedDryBrands.length === 0">
        You haven't chosen your dry food, yet.
      </div>

    </div>

  </div>
</template>

<style scoped lang="scss">
@use 'variables' as *;

.wrapper.component {
  h4.title {
    margin: 0;
    padding: 0;
    padding-bottom: calc(3* $margin-button);
  }

  div.wrapper.micture {}
}
</style>