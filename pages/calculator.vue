<template>
  <div>
    <!-- FIXME build basic UI -->
    <div class="calculator-ui">

      <div class="cat-weight">
        <label for="cat-weight">{{ catWeight }}</label>
        <input id="cat-weight" type="range" min="3" max="6" v-model="catWeight" />
      </div>

      <div class="body-shape">
        <label for="ideal">
          <input type="radio" name="body-shape" id="ideal" />
          Ideal
        </label>
        <label for="overweight">
          <input type="radio" name="body-shape" id="overweight" />
          Overweight
        </label>
      </div>

      <div class="dry-food">
        <label v-for="dryFood in dryProcessor.data" :key="dryFood.name" :for="dryFood.name">
          <img :src="dryFood.id" :alt="dryFood.name">
          <input type="checkbox" :id="dryFood.name" />
          {{ dryFood.name }}
        </label>
      </div>

      <!-- FIXME build Calculator with check states to display only checked brands -->
      <div class="dry-mix">
        <div class="dry-mix-slider" v-for="(dryFood, i) in dryProcessor.data" :key="dryFood.name">
          <label for="dry-food-brand-name">{{ dryFood.name }}</label>
          <input id="dry-food-brand-name" type="range" min="0" max="1" step=".1" v-model="dryFoodRatio[i]" />
          <label for="dry-food-brand-name">{{ dryFoodRatio[i] }}</label>
        </div>
      </div>

      <p>`Ratios: ` {{ dryFoodRatio }}</p>

    </div>

    <div>
      <h5>dryProcessor:</h5>
      <p> {{ JSON.stringify(dryProcessor.data) }} </p>
    </div>
    <div>
      <h5> wetProcessor:</h5>
      <p>{{ JSON.stringify(wetProcessor.data) }}</p>
    </div>
    <div>
      <h5>db:</h5>
      <p> {{ JSON.stringify(calculator.allBrands) }}</p>
    </div>

    <button @click="fetchData"> Update Data </button>
    <button @click="reset"> Reset Database </button>

  </div>
</template>

<script setup lang="ts">
import Database from '~~/model/Database'
import DataProcessorDry from '~~/model/DataProcessorDry'
import DataProcessorWet from '~~/model/DataProcessorWet'
import { ref } from 'vue'
import Calculator from '~~/model/Calculator';

const catWeight = ref(4)

const db = ref(Database.getInstance())
const calculator = ref(Calculator.getInstance())
const dryProcessor = ref(DataProcessorDry.getInstance())
const wetProcessor = ref(DataProcessorWet.getInstance())

let dryFoodRatio = ref([])

// async function fetchData() {
//   await db.value.fetchMongo()
//   dryProcessor.value.processData(db.value.data)
//   wetProcessor.value.processData(db.value.data)
//   dryFoodRatio.value = dryProcessor.value.data.map(brand => 0)
// }

async function fetchData() {
  await calculator.value.refresh()
}

async function reset() {
  await db.value.resetDB()
}
</script>

<style scoped>
</style>