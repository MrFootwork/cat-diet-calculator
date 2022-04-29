<template>
  <div>
    <h1>Counter</h1>
    <p>{{ theCount }}</p>
    <button @click="addOne">press me</button>
  </div>
</template>


<script  lang="ts">
definePageMeta({
  layout: "custom",
})
</script>


<script setup lang="ts">

import { ref } from 'vue'

const theCount = ref(0)

function addOne() {
  theCount.value++
}

</script>
