<script lang="ts">
definePageMeta({
  layout: "custom",
})
</script>

<template>
  <div>
    <!-- <Slider1 />
    <Slider2 /> -->
    <button @click="getData">Get Data</button>
    <p>{{ myData }}</p>
  </div>
</template>
<!-- FIXME build basic UI -->
<script setup lang="ts">
import Slider1 from "../components/slider/slider1.vue";
import Slider2 from "../components/slider/slider2.vue";
import { ref } from 'vue'

const myData = ref([]) as any

async function getData() {
  const data = await fetch(`/api/food`)
  let json = await data.json()
  console.log(json)
  myData.value = json
}
</script>

<style lang="scss">
</style>