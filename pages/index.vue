<script lang="ts">
definePageMeta({
  layout: "custom",
})
</script>

<script setup lang="ts">
// const { data }: { data: any } = await useFetch('/api/hi?search=girls', {})

const { data } = await useAsyncData('seachData', () =>
  $fetch('/api/hi?search=gilmore')
)


</script>

<!-- <template>
  <div>
    <form class="form" @submit.prevent="searchForStuff">
      <input type="text" v-model="searchText">
      <button>Search For TS Shows</button>
    </form>
    <div class="stuff">
      <div v-for="show in myData">
        <img src="show.show?.image?.medium" alt="" srcset="">
      </div>
    </div>
    eriks video: 23:08
  </div>
</template> -->

<template>
  <div>
    <h1>hello World from page index.vue</h1>
    {{ data }}
    <img src="popcorn.jpeg" alt="" title="Das ist Popcorn">
  </div>
</template>

<style>
.stuff {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px
}
</style>