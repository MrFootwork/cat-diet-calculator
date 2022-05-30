<template>
  <div>
    <div class="calculator-ui">
      <div class="cat-weight">
        <label for="cat-weight">{{ calculator.catWeight }}</label>
        <input id="cat-weight" type="range" min="3" max="6" v-model.number="calculator.catWeight" />
      </div>

      <div class="cat-shape">
        <label for="ideal">
          <input type="radio" name="catShape" id="ideal" value="ideal" v-model="calculator.catShape" />
          Ideal
        </label>
        <label for="overweight">
          <input type="radio" name="catShape" id="overweight" value="overweight" v-model="calculator.catShape" />
          Overweight
        </label>
        <button class="cat-shape-help-toggle" @click="toggleCatShapeHelp">
          What is my cat?
        </button>
      </div>

      <div class="cat-shape-help" v-if="showHelp">
        <img src="~~/HealthyCatWeight.webp" alt="Can you see/feel the ribs of your cat?" />
      </div>

      <div class="dry-food">
        <div class="dry-food-card" v-for="dryFood in calculator.brandsOfType('dry')" :key="dryFood._id">
          <label :for="dryFood.name">
            <img :src="dryFood._id" :alt="dryFood.name" />
            <input type="checkbox" :id="dryFood.name" v-model="dryFood.selected" />
            {{ dryFood.name }}
          </label>
        </div>
      </div>

      <div class="dry-mix">
        <div class="dry-mix-slider" v-for="(dryFood, i) in calculator
        .brandsOfType('dry')
        .filter(brand => brand.selected)" :key="dryFood._id">
          <label for="dry-food-brand-name">{{ dryFood.name }}</label>
          <input id="dry-food-brand-name" type="range" min="0" max="1" step=".1"
            v-model.number="dryFood.selectionValue" />
          <label for="dry-food-brand-name">{{ dryFood.selectionValue }}</label>
        </div>
      </div>

      <div class="wet-food">
        <div class="wet-food-card" v-for="wetFood in calculator.brandsOfType('wet')" :key="wetFood._id">
          <label :for="wetFood.name">
            <img :src="wetFood._id" :alt="wetFood.name" />
            <input type="checkbox" :id="wetFood.name" v-model="wetFood.selected" />
            {{ wetFood.name }}
            <input type="number" min="0" step=".5" v-model.number="wetFood.selectionValue" v-if="wetFood.selected" />
          </label>
        </div>
      </div>
    </div>

    <div>
      <div>
        <h5>calculator:</h5>
        <p>cat weight: {{ calculator.catWeight }}</p>
        <p>cat shape: {{ calculator.catShape }}</p>
        <p>Result: {{ calculator.result }}</p>
      </div>
      <div>
        <h5>db:</h5>
        <p>{{ JSON.stringify(calculator.allBrands) }}</p>
      </div>
      <button @click="fetchData">Update Data</button>
      <button @click="reset">Reset Database</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Database from '~~/model/Database'
import { ref } from 'vue'
import Calculator from '~~/model/Calculator'

const db = ref(Database.getInstance())
const calculator = ref(Calculator.getInstance())

const showHelp = ref(false)

function toggleCatShapeHelp() {
  showHelp.value = !showHelp.value
}

async function fetchData() {
  await calculator.value.refresh()
}

async function reset() {
  await db.value.resetDB()
}
</script>

<style scoped lang="scss">
.cat-shape-help {
  img {
    width: 50vw;
  }
}
</style>
