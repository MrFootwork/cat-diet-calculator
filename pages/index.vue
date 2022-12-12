<!-- FIXME build nav bar with theme picker -->
<!-- FIXME build beautiful UI -->
<template>
  <div>

    <div class="loader" v-if="isLoading">
      <LoaderAnimation />
    </div>

    <div v-else>

      <div>
        <!-- controls only for dev build -->
        <button @click="refreshData">Refresh Data</button>
        <button @click="resetDB">Reset Database</button>
        <button @click="toggleUi" id="btn-toggle-ui"> {{ btnToggleUiCapture }} </button>
        <button @click="toggleTheme">Change Theme</button>
      </div>

      <div class="calculator-ui" v-show="showUi">

        <Container>
          <CatAttributes />
        </Container>

        <Container>
          <DryFoodSelector />
        </Container>

        <Container>
          <DryFoodMixture />
        </Container>

        <Container>
          <WetFoodSelector />
        </Container>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// model
import Database from '~~/model/MDatabase'
import Calculator from '~~/model/MCalculator'
// design components
import Container from '~~/components/DivisionContainer.vue'
// input components
import CatAttributes from '~~/components/CatAttributesInput.vue'
import DryFoodSelector from '~~/components/DryFoodSelector.vue'
import DryFoodMixture from '~~/components/DryFoodMixture.vue'
import WetFoodSelector from '~~/components/WetFoodSelector.vue'

const db = ref(Database.getInstance())
const calculator = ref(Calculator.getInstance())

const isLoading = ref(true)

// Theming
onMounted(() => {
  document.body.className = 'theme-light'
})

const activeTheme = ref('theme-light')

function toggleTheme() {

  let bodyClass = document.body.className

  if (activeTheme.value === 'theme-light') {
    activeTheme.value = 'theme-dark'
    document.body.className = 'theme-dark'
  } else {
    activeTheme.value = 'theme-light'
    document.body.className = 'theme-light'
  }

}

// UI
const showUi = ref(false)
const btnToggleUiCapture = ref('Show UI')

function toggleUi() {

  showUi.value = !showUi.value
  btnToggleUiCapture.value = showUi.value ? 'Hide UI' : 'Show UI'

}

// data model
onBeforeMount(async () => {

  await calculator.value.refresh()
  isLoading.value = false

})

async function refreshData() {

  isLoading.value = true
  await calculator.value.refresh()
  isLoading.value = false

}

async function resetDB() {

  isLoading.value = true
  await db.value.resetDB()
  isLoading.value = false

}

</script>

<style scoped lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
</style>
