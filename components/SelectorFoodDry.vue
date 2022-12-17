<template>
  <div>
    <div class="dry-food">

      <div class="options">

        <input type="checkbox" name="view-mode" class="option gallery" id="gallery">
        <label for="gallery" name="view-mode">
          <img src="/icon-grid.png" alt="icon-grid" id="img-gallery">
        </label>

        <input type="checkbox" name="view-mode" class="option carousel" id="carousel">
        <label for="carousel" name="view-mode">
          <img src="/icon-carousel.png" alt="icon-carousel" id="img-carousel">
        </label>

      </div>

      <a target="_blank" href="https://icons8.com/icon/52220/modulansicht">Modulansicht</a> icon by <a target="_blank"
        href="https://icons8.com">Icons8</a>

      <a target="_blank" href="https://icons8.com/icon/I2q2wsTIgjzm/image">Image</a> icon by <a target="_blank"
        href="https://icons8.com">Icons8</a>

      <div class="dry-food-card" v-for="dryFood in calculator.brandsOfType('dry')" :key="dryFood._id">
        <label :for="dryFood.name">
          <!-- <img :src="dryFood._id" :alt="dryFood.name" /> -->
          <img :src="urlPlaceholder(dryFood)" :alt="dryFood.name" />
          <input type="checkbox" :id="dryFood.name" v-model="dryFood.isMixPortion" />
          {{ dryFood.name }}
        </label>
      </div>

    </div>
  </div>
</template>
<!-- FIXME build card slider -->
<!-- https://www.youtube.com/watch?v=OQZNAMjC6Vg -->
<script setup lang="ts">
import FoodBrand from '~~/model/IFoodBrand';
import Calculator from '~~/model/MCalculator'

const modeGalleryOn = ref(true)

const calculator = ref(Calculator.getInstance())

// FIXME persist brand images in database
// 1. save images in database
// 2. adjust model to handle images
const urlPlaceholder = function (dryFood: FoodBrand) {

  if (dryFood.image) {
    return dryFood.image
  }

  const baseUrl = 'https://via.placeholder.com/100x150'
  const query = `?text=${dryFood.name}`

  return baseUrl + query

}
</script>

<style scoped lang="scss">
@use 'sassColors' as *;

.dry-food {

  .options {
    width: 100%;

    display: flex;
    justify-content: flex-end;

    input {
      display: none;
    }

    label {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        color: $light-highlight-color;

      }

      #img-gallery {
        width: 2rem;
        height: 2rem;
      }

      #img-carousel {
        width: 3rem;
        height: 3rem;
      }
    }

    .option {}
  }

  .dry-food-image {}

  .dry-food,
  .options,
  input,
  label,
  img {
    border: 1px solid red;
  }
}
</style>