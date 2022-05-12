<script lang="ts">
definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div class="singleton">
    <div class="name">

      <label for="singleton-name">Name</label>
      <input id="singleton-name" type="text" v-model="name">

    </div>
    <div class="age">

      <label for="singleton-age">Age</label>
      <input id="singleton-age" type="text" v-model="age">

    </div>

    <button @click="getSingletonProps">Get Singleton Prop</button>
    <p>{{ singleton.properties.name }} ist {{ singleton.properties.age }} Jahre alt. </p>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MyClass from "~/model/MyClass";
import type Properties from '~/model/Properties';

const defaultProperties: Properties = {
  name: "name",
  age: 0
}

const name = ref('')
const age = ref(0)
const singleton = ref(MyClass.getInstance(defaultProperties))

function getSingletonProps() {
  singleton.value.properties = {
    name: name.value,
    age: age.value
  }
}
</script>

<style scoped>
</style>