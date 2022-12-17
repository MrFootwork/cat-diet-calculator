<template>
  <div>
    <div class="dry-food"
         :class="optionSelected">

      <div class="options">

        <input type="radio"
               name="view-mode"
               class="option gallery"
               id="gallery"
               v-model="optionSelected"
               value="select-gallery"
               checked>
        <label for="gallery"
               name="view-mode">
          <img src="/icon-grid.png"
               alt="icon-grid"
               id="img-gallery">
        </label>

        <input type="radio"
               name="view-mode"
               class="option carousel"
               id="carousel"
               v-model="optionSelected"
               value="select-carousel">
        <label for="carousel"
               name="view-mode">
          <img src="/icon-carousel.png"
               alt="icon-carousel"
               id="img-carousel">
        </label>

      </div>

      <a target="_blank"
         href="https://icons8.com/icon/52220/modulansicht">
        Modulansicht</a> icon by
      <a target="_blank"
         href="https://icons8.com">Icons8</a>

      <a target="_blank"
         href="https://icons8.com/icon/I2q2wsTIgjzm/image">
        Image</a> icon by
      <a target="_blank"
         href="https://icons8.com">Icons8</a>

      <div class="wrapper-food">
        <div class="dry-food-card"
             :class="{ activated: dryFood.isMixPortion }"
             v-for="dryFood in calculator.brandsOfType('dry')"
             :key="dryFood._id">
          <label :for="dryFood.name">
            <img :src="imageURL(dryFood)"
                 :alt="dryFood.name" />
            <input type="checkbox"
                   :id="dryFood.name"
                   v-model="dryFood.isMixPortion" />
            {{ dryFood.name }}
          </label>
        </div>
      </div>

    </div>
  </div>
</template>
<!-- FIXME build card slider -->
<!-- https://www.youtube.com/watch?v=OQZNAMjC6Vg -->
<script setup lang="ts">
import FoodBrand from '~~/model/IFoodBrand';
import Calculator from '~~/model/MCalculator'

const optionSelected = ref('select-gallery')

const calculator = ref(Calculator.getInstance())

const imageURL = function (dryFood: FoodBrand) {

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
        cursor: pointer;
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

    @at-root input:checked+label>img {
      filter: invert(100%)
    }

    .option {}
  }

  .dry-food-image {}

  .wrapper-food {
    .dry-food-card {
      width: 30vw;
      height: 50vh;
      margin: 1rem;

      label {
        cursor: pointer;

        img {
          max-height: 100%;
          max-width: 100%;
        }
      }
    }
  }
}

// .dry-food,
.select-gallery {

  .wrapper-food {
    border: 1px solid violet;

    display: flex;

    flex-wrap: wrap;


    .dry-food-card {
      border: 1px solid violet;



      &.activated {
        border: 5px solid blue;

      }

      label {
        border: 1px solid violet;

        img {
          border: 1px solid violet;

        }

        input {
          border: 1px solid violet;

        }
      }
    }
  }
}

.select-carousel {

  .wrapper-food {
    border: 1px solid salmon;

    display: flex;

    flex-wrap: wrap;


    .dry-food-card {
      border: 1px solid salmon;

      &.activated {
        border: 5px solid red;

      }

      label {
        border: 1px solid salmon;

        img {
          border: 1px solid salmon;

        }

        input {
          border: 1px solid salmon;

        }
      }
    }
  }
}
</style>