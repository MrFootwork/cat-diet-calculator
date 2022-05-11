<script lang="ts">
definePageMeta({
  layout: "custom",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
const searchText = ref("");

const myData = ref([]) as any;

async function searchForStuff() {
  const data = await fetch(`/api/shows?search=${searchText.value}`);
  let json = await data.json();
  // some data sets don't have images
  // flexbox will add gaps to empty sets, too
  json = json.filter((show) => show.show.image);
  myData.value = json;
}
</script>

<template>
  <div>
    <form class="form" @submit.prevent="searchForStuff">
      <input type="text" v-model="searchText" />
      <button>Search For TS Shows</button>
    </form>
    <div class="stuff">
      <div v-for="show in myData">
        <img
          :src="show.show?.image?.medium"
          class="movie-card"
          alt=""
          srcset=""
        />
      </div>
    </div>
    <!-- eriks video: 23:08 -->
  </div>
</template>

<style lang="scss">
.stuff {
  margin: 50px;
  max-width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  .movie-card {
    border-radius: 8px;
    box-shadow: 5px 5px 10px 0px black;

    transition: all 0.1s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
