<template>
  <div>
    <!-- FIXME build basic UI -->
    <div class="calculator-ui">
      <div class="cat-weight">
        <label for="cat-weight">{{ catWeight }}</label>
        <input id="cat-weight" type="range" min="3" max="6" v-model="catWeight" />
      </div>
      <div class="body-shape">
        <input name="body-shape" type="radio" id="ideal" /> <label for="radio">Ideal</label>
        <input name="body-shape" type="radio" id="overweight" /> <label for="radio">Overweight</label>
      </div>
      <div class="dry-food">
        <div v-for="dryFood in dryProcessor.data">
          <img :src="dryFood.id" :alt="dryFood.name">
          <input type="checkbox" :id="dryFood.name" />
          <label :for="dryFood.name"> {{ dryFood.name }} </label>
        </div>
      </div>
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
      <p> {{ JSON.stringify(db.data) }}</p>
    </div>

    <button @click="fetchData"> Update Data </button>
    <button @click="reset"> Reset Database </button>

  </div>
</template>

<script setup lang="ts">
import Database from '~/model/Database'
import DataProcessorDry from '~/model/DataProcessorDry'
import DataProcessorWet from '~/model/DataProcessorWet'
import { ref } from 'vue'

const catWeight = ref(4)

const db = ref(Database.getInstance())
const dryProcessor = ref(DataProcessorDry.getInstance())
const wetProcessor = ref(DataProcessorWet.getInstance())

async function fetchData() {
  await db.value.fetchMongo()
  dryProcessor.value.processData()
  wetProcessor.value.processData()
}

async function reset() {
  await db.value.resetDB()
}
</script>

<style scoped>
</style>