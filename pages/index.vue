<!-- FIXME persist brand images in database -->
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

        <ResultDisplay />

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
// logic components
import CatAttributes from '~~/components/CatAttributesInput.vue'
import DryFoodSelector from '~~/components/DryFoodSelector.vue'
import DryFoodMixture from '~~/components/DryFoodMixture.vue'
import WetFoodSelector from '~~/components/WetFoodSelector.vue'
import ResultDisplay from '~~/components/ResultDisplay.vue'

const db = ref(Database.getInstance())
const calculator = ref(Calculator.getInstance())

const isLoading = ref(true)
const showUi = ref(false)
const btnToggleUiCapture = ref('Show UI')

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

function toggleUi() {

  showUi.value = !showUi.value
  btnToggleUiCapture.value = showUi.value ? 'Hide UI' : 'Show UI'

}
</script>

<style lang="scss">
@mixin app($bg-color) {
  background-color: $bg-color;
}

@import "../assets/scss/mixins/theme.scss";

@include componentTheme(light) {
  @include app(purple);
}

@include componentTheme(dark) {
  @include app(black);
}
</style>

<style scoped lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;

}
</style>
