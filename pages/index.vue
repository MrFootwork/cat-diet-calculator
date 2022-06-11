<!-- FIXME build beautiful UI -->
<!-- FIXME persist brand images in database -->
<!-- TODO build components-->
<!-- FIXME report bug in vue-chartjs/issues
provide minimal repro in nuxt3 + vue-chartjs + pie chart 
error: dev renders, but build doesn't render -->
<template>
  <div>

    <div v-if="isLoading">
      <LoaderAnimation />
    </div>

    <div v-else>

      <div class="calculator-ui" v-if="showUi">

        <CatAttributes />

        <div class="dry-food">
          <div class="dry-food-card" v-for="dryFood in calculator.brandsOfType('dry')" :key="dryFood._id">
            <label :for="dryFood.name">
              <img :src="dryFood._id" :alt="dryFood.name" />
              <input type="checkbox" :id="dryFood.name" v-model="dryFood.isMixPortion" />
              {{ dryFood.name }}
            </label>
          </div>
        </div>

        <!-- TODO show pie chart to display the current dry food mixture -->
        <div class="dry-mix" v-if="moreThanOneDryFoodSelected">
          <div class="dry-mix-slider" v-for="(dryFood, i) in selectedDryBrands" :key="dryFood._id">
            <input id="dry-food-brand-name" type="range" min="0" max="1" step=".1"
              v-model.number="dryFood.mixPortion" />
          </div>

          <PieChart :chart-data="pieChartData" />
          <p>{{ selectedDryBrands.map(brand => brand.color) }}</p>

        </div>

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

      </div>

      <div>
        <div>
          <h5>calculator:</h5>
          <p>cat weight: {{ calculator.catWeight }}</p>
          <p>cat shape: {{ calculator.catShape }}</p>
        </div>

        <button @click="refreshData">Refresh Data</button>
        <button @click="reset">Reset Database</button>
        <button @click="toggleUi" id="btn-toggle-ui"> Show UI </button>
      </div>

      <div class="result">
        <p>Result: {{ calculator.getResult(calculator.allBrands) }}</p>
      </div>

    </div>

  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import Database from '~~/model/MDatabase'
import Calculator from '~~/model/MCalculator'
import CatAttributes from '~~/components/CatAttributesInput.vue'
import LoaderAnimation from '~~/components/LoaderAnimation.vue'
import PieChart from '~~/components/PieChart'
import Pie from '~~/components/Pie.vue'

defineProps([
  'pieChartData'
])

const db = ref(Database.getInstance())
const calculator = ref(Calculator.getInstance())

const isLoading = ref(true)
const showUi = ref(false)

onBeforeMount(async () => {

  await calculator.value.refresh()
  isLoading.value = false

})

const selectedDryBrands = computed(() => {

  return calculator.value
    .brandsOfType('dry')
    .filter(brand => brand.isMixPortion)

})

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

const moreThanOneDryFoodSelected = computed(() => {

  const selectedDryFoodCount = calculator.value
    .brandsOfType('dry')
    .reduce((count, brand) => {

      const isSelected = brand.isMixPortion || false

      return count + +isSelected
    }, 0)

  return selectedDryFoodCount > 1

})

function toggleUi() {

  showUi.value = !showUi.value
  const btnToggleUi = document.getElementById('btn-toggle-ui') || document.createElement('button')
  btnToggleUi.innerText = showUi.value ? 'Hide UI' : 'Show UI'

}

async function refreshData() {

  isLoading.value = true
  await calculator.value.refresh()
  isLoading.value = false

}

async function reset() {

  isLoading.value = true
  await db.value.resetDB()
  isLoading.value = false

}
</script>

<style lang="scss">
body {
  margin: 0;
  background-color: hsl(140, 100%, 85%)
}
</style>

<style scoped lang="scss">
.result {
  position: sticky;
  bottom: 10px;
  right: 0px
}
</style>
