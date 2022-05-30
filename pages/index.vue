<script lang="ts">
definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div>
    <button @click="getData">Get Data</button>
    <ul>
      <li v-for="foodBrand in foodBrands">
        <h2>{{ foodBrand.name }}</h2>
        <table class="recommendation">
          <tr>
            <th>Weight</th>
            <th>Ideal</th>
            <th>Overweight</th>
          </tr>
          <tr v-for="row in foodBrand.recommendations">
            <td>{{ row.weight }}</td>
            <td>{{ row.ideal }}</td>
            <td>{{ row.overweight }}</td>
          </tr>
        </table>
      </li>
    </ul>

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

    <div class="database">
      {{ allCollections }}
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MyClass from "~/model/MyClass";
import type Properties from "~/model/Properties"
import Database from "~~/model/MDatabase"

const foodBrands = ref([]) as any;
const name = ref('')
const age = ref(0)
const singleton = ref(MyClass.getInstance())
const allCollections = ref(Database.getInstance())

async function getData() {

  const data = await fetch(`/api/food`);
  let json = await data.json();
  foodBrands.value = json;

}

function getSingletonProps() {
  singleton.value.properties = {
    name: name.value,
    age: age.value
  }
}
</script>

<style lang="scss">
.recommendation {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;

  & td,
  & th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  & th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
  }

  & tr {
    &:nth-child(even) {
      background-color: #f2f2f2;
    }

    &:hover {
      background-color: #ddd;
    }
  }
}
</style>
