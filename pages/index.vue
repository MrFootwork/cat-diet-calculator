<script lang="ts">
definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div>
    <!-- <Slider1 />
    <Slider2 /> -->
    <button @click="getData">Get Data</button>
    <p>{{ myData }}</p>

    <div class="singleton">
      <button @click="getSingletonProps">Get Singleton Prop</button>
      <div class="name">
        <label for="singleton-name">Name</label>
        <input id="singleton-name" type="text" v-model="name">
      </div>
      <div class="age">
        <label for="singleton-age">Age</label>
        <input id="singleton-age" type="text" v-model="age">
      </div>
      <p>{{}}</p>
    </div>

  </div>
</template>
<!-- FIXME build basic UI -->

<script setup lang="ts">
import Slider1 from "../components/slider/slider1.vue";
import Slider2 from "../components/slider/slider2.vue";
import { ref } from "vue";
// FIXME make Class import work!
import MyClass from "model/MyClass";

const myData = ref([]) as any;
const name = ref('')
const age = ref(0)
const singleton = ref(MyClass)

async function getData() {
  const data = await fetch(`/api/food`);
  let json = await data.json();
  console.log(json);
  myData.value = json;
}

function getSingletonProps() {
  let properties = {
    name: name.value,
    age: age.value,
  }
  const singleton = MyClass.getInstance(properties)
}
</script>

<style lang="scss">
</style>
