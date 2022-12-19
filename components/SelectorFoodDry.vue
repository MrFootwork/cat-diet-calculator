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
            <label :for="dryFood.name"> {{ dryFood.name }}</label>
          </label>
        </div>
      </div>

    </div>
  </div>
</template>
<!-- FIXME build card slider -->
<!-- https://codepen.io/frise/pen/mZvKpe -->
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
      margin: 0 .1rem 0;
      visibility: hidden;
    }

    label {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        cursor: pointer;
        // filter: invert(91%) sepia(2%) saturate(6695%) hue-rotate(72deg) brightness(102%) contrast(87%);

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
        // https://codepen.io/sosuke/pen/Pjoqqp
        // https://stackoverflow.com/a/50942954/13608849
        // used that genius codepen to calculate the filter
        filter: invert(19%) sepia(15%) saturate(1008%) hue-rotate(106deg) brightness(94%) contrast(88%);


      }

      .option {}
    }
  }

  .wrapper-food {

    .dry-food-card {
      position: relative;

      width: 30vw;
      height: 46vw;
      max-width: 260px;
      max-height: 400px;
      margin: 1rem;

      border-radius: 5%;

      box-shadow: -5px 5px 20px -5px hsl(0, 0%, 0%);

      &.activated {
        box-shadow: 5px 5px 15px 5px #FF8080, -9px 5px 15px 5px #FFE488, -7px -5px 15px 5px #8CFF85, 12px -5px 15px 5px #80C7FF, 12px 10px 15px 7px #E488FF, -10px 10px 15px 7px #FF616B, -10px -7px 27px 1px #8E5CFF, 5px 5px 15px 5px rgba(0, 0, 0, 0);
      }

      label {
        position: absolute;

        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          border-radius: 5%;
        }

        input {
          visibility: hidden;
        }

        label {}
      }


    }
  }
}

// .dry-food,
.select-gallery {

  .wrapper-food {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .dry-food-card {



      &.activated {}

      label {

        img {}

        input {}
      }
    }
  }
}

.select-carousel {

  .wrapper-food {
    border: 1px solid salmon;


    .dry-food-card {
      border: 1px solid salmon;

      &.activated {}

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