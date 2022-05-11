<script lang="ts">
definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div>
    <button @click="getData">Get Data</button>
    <p>{{ myData }}</p>

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

  </div>
</template>
<!-- FIXME build basic UI -->

<script setup lang="ts">
import { ref } from "vue";
import MyClass from "~/model/MyClass";

const myData = ref([]) as any;
const name = ref('')
const age = ref(0)
const singleton = ref(MyClass.getInstance({ name: '', age: 0 }))

async function getData() {

  const data = await fetch(`/api/food`);
  let json = await data.json();
  myData.value = json;

}

function getSingletonProps() {

  singleton.value.name = name.value
  singleton.value.age = age.value

}
</script>

<style lang="scss">
</style>
