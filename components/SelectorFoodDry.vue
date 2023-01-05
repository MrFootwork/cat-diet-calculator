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

      <!-- need to display somewhere -->
      <!-- <a target="_blank"
         href="https://icons8.com/icon/52220/modulansicht">
        Modulansicht</a> icon by
      <a target="_blank"
         href="https://icons8.com">Icons8</a>

      <a target="_blank"
         href="https://icons8.com/icon/I2q2wsTIgjzm/image">
        Image</a> icon by
      <a target="_blank"
         href="https://icons8.com">Icons8</a> -->

      <div class="wrapper-food">
        <div class="dry-food-card"
             v-for="(dryFood, i) in calculator.brandsOfType('dry')"
             :class="{ activated: dryFood.isMixPortion }"
             :key="dryFood._id"
             :data-pos="i - Math.floor(calculator.brandsOfType('dry').length / 2)">
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
  // FIXME transition between gallery and carousel view doesn't work
  // transition: all 2s;

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

    // transition: all 2s;

    .dry-food-card {

      &.activated {}

      label {
        img {}

        input {}
      }
    }
  }
}

// FIXME build card slider 
// https://codepen.io/frise/pen/mZvKpe 
//  https://www.youtube.com/watch?v=OQZNAMjC6Vg
.select-carousel {

  .wrapper-food {
    border: 1px solid salmon;

    display: flex;
    list-style: none;
    position: relative;
    width: 100%;
    height: 300px;
    justify-content: center;
    perspective: 300px;

    .dry-food-card {
      border: 1px solid salmon;

      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 0px;
      width: 150px;
      height: 250px;
      border-radius: 12px;
      box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.5);
      position: absolute;
      transition: all .3s ease-in;

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

      &:nth-child(1) {
        background: linear-gradient(45deg, #2D35EB 0%, #904ED4 100%);
      }

      &:nth-child(2) {
        background: linear-gradient(45deg, #2D35EB 0%, #fdbb2d 100%);
      }

      &:nth-child(3) {
        background: linear-gradient(45deg, #2D35EB 0%, #22c1c3 100%);
      }

      &:nth-child(4) {
        background: linear-gradient(45deg, #fdbb2d 0%, #904ED4 100%);
      }

      &:nth-child(5) {
        background: linear-gradient(45deg, #22c1c3 0%, #904ED4 100%);
      }

      &[data-pos="0"] {
        z-index: 5;
      }

      &[data-pos="-1"],
      &[data-pos="1"] {
        opacity: 0.7;
        filter: blur(1px) grayscale(10%);
      }

      &[data-pos="-1"] {
        transform: translateX(-40%) scale(.9);
        z-index: 4;
      }

      &[data-pos="1"] {
        transform: translateX(40%) scale(.9);
        z-index: 4;
      }

      &[data-pos="-2"],
      &[data-pos="2"] {
        opacity: 0.4;
        filter: blur(3px) grayscale(20%);
      }

      &[data-pos="-2"] {
        transform: translateX(-70%) scale(.8);
        z-index: 3;
      }

      &[data-pos="2"] {
        transform: translateX(70%) scale(.8);
        z-index: 3;
      }
    }
  }
}
</style>