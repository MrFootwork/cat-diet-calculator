<!-- FIXME build nav bar with theme picker -->
<!-- FIXME build beautiful UI -->
<script setup lang="ts">
import { ref } from 'vue';
// model
import Database from '~~/model/MDatabase';
import Calculator from '~~/model/MCalculator';
// design components
import Container from '~~/components/DivisionContainer.vue';
import AnimationLoader from '~~/components/AnimationLoader.vue';
// input components
import InputAttributesCat from '~~/components/InputAttributesCat.vue';
import DisplayFoodMixture from '~~/components/DisplayFoodMixture.vue';
import SelectorFoodDry from '~~/components/SelectorFoodDry.vue';
import SelectorFoodWet from '~~/components/SelectorFoodWet.vue';

const db = ref(Database.getInstance());
const calculator = ref(Calculator.getInstance());

const isLoading = ref(true);

// Theming
onMounted(() => {
  document.body.className = 'theme-default';
});

const activeTheme = ref('theme-default');

function toggleTheme() {

  let bodyClass = document.body.className;

  if (activeTheme.value === 'theme-default') {
    activeTheme.value = 'theme-dark';
    document.body.className = 'theme-dark';
  } else {
    activeTheme.value = 'theme-default';
    document.body.className = 'theme-default';
  }

}

// UI
const showUi = ref(true);
const btnToggleUiCapture = ref('Show UI');

function toggleUi() {

  showUi.value = !showUi.value;
  btnToggleUiCapture.value = showUi.value ? 'Hide UI' : 'Show UI';

}

// data model
onBeforeMount(async () => {

  await calculator.value.refresh();
  isLoading.value = false;

});

async function refreshData() {

  isLoading.value = true;
  await calculator.value.refresh();
  isLoading.value = false;

}

async function resetDB() {

  isLoading.value = true;
  await db.value.resetDB();
  isLoading.value = false;

}

</script>

<template>
  <div>

    <div class="loader"
         v-if="isLoading">
      <AnimationLoader />
    </div>

    <div v-else>

      <div>
        <button @click="refreshData">Refresh Data</button>
        <button @click="resetDB">Reset Database</button>
        <!-- <button @click="toggleUi" id="btn-toggle-ui"> {{ btnToggleUiCapture }} </button> -->
        <button @click="toggleTheme">Change Theme</button>
      </div>

      <div class="calculator-ui"
           v-show="showUi">

        <Container class="slot handles padding bottom">
          <InputAttributesCat />
        </Container>

        <Container title="What dry food does your cat eat? (multiple selection possible)">
          <SelectorFoodDry />
        </Container>

        <Container title="Dry Food Mixer">
          <DisplayFoodMixture />
        </Container>

        <Container title="What wet food and how many bags does your cat eat?">
          <SelectorFoodWet />
        </Container>

      </div>

    </div>

  </div>
</template>

<style scoped lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

section.slot.handles.padding.bottom {
  padding-bottom: 0;
}
</style>
