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
    <p>{{ singleton.name }} ist {{ singleton.age }} Jahre alt. </p>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MyClass from "~/model/MyClass";

const name = ref('')
const age = ref(0)
const singleton = ref(MyClass.getInstance({ name: '', age: 0 }))

function getSingletonProps() {

  singleton.value.name = name.value
  singleton.value.age = age.value

}
</script>

<style scoped>
</style>