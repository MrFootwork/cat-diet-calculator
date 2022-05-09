<template>
  <div>
    <h1>Continues deployment works great!</h1>
    <!-- <Slider1 />
    <Slider2 /> -->
    <button @click="getData">Get Data</button>
    <p>{{ myData }}</p>
  </div>
</template>

<script setup lang="ts">
import Slider1 from "../components/slider/slider1.vue";
import Slider2 from "../components/slider/slider2.vue";
import { ref } from 'vue'

const myData = ref([]) as any

async function getData() {
  const data = await fetch(`/api/food`)
  let json = await data.json()
  console.log(json)
  // some data sets don't have images
  // flexbox will add gaps to empty sets, too
  // json = json.filter(show => show.show.image)
  myData.value = json
}
</script>

<style lang="scss">
</style>