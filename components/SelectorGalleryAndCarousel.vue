<script setup lang="ts">
import FoodBrand from '~~/model/IFoodBrand';
import Calculator from '~~/model/MCalculator';

const props = defineProps<{
  title?: string;
  foodType: FoodBrand['type'];
}>();

const optionSelected = ref('select-carousel');

const calculator = ref(Calculator.getInstance());
const currentFoodBrands = computed(() => calculator.value.brandsOfType(props.foodType));

function imageURL(foodCard: FoodBrand) {

  if (foodCard.image) return foodCard.image;

  const baseUrl = 'https://via.placeholder.com/100x150';
  const query = `?text=${foodCard.name}`;

  return baseUrl + query;
};

/*************************************
 *  carousel functionality
 *************************************/
const countBrandFoodType = computed(() => {
  return currentFoodBrands.value.length;
});
// all food cards
const cardHTMLRefs = ref<HTMLElement[] | undefined>();
// [data-pos] where cards are not visible anymore
const positionOutOfSight = 3;
// visible carousel cards
const countVisibleCards = 5;
const hasLessCardsThanVisible = countBrandFoodType.value < countVisibleCards;

// initial HTML data attribute positions
function initiatePosition(i: number) {
  if (!hasLessCardsThanVisible) return i - positionOutOfSight;
  return i - positionOutOfSight + (countVisibleCards - countBrandFoodType.value);
};

function isHiddenLeft(i: number) {
  if (hasLessCardsThanVisible) return false;
  return (i - positionOutOfSight) <= -positionOutOfSight;
}

function isHiddenRight(i: number) {
  if (hasLessCardsThanVisible) return false;
  return (i - positionOutOfSight) >= positionOutOfSight;
}

// click handler
function selectCard(event: Event) {
  if (!(event.target instanceof HTMLElement)) return;

  const newActive = event.target.parentElement?.parentElement;
  const isItem = event.target.closest(`.food-card>label>input[type=checkbox]`);

  if (newActive && isItem) update(newActive);
};

function moveCarousel(direction: 'left' | 'right') {
  let positionalDirection = '';

  if (direction === 'left') positionalDirection = '-1';
  if (direction === 'right') positionalDirection = '1';

  const newActive = cardHTMLRefs.value?.find(foodCard => {
    return foodCard.dataset.pos === positionalDirection;
  });

  if (newActive) update(newActive);
};

// update all food cards after click
function update(newActive: HTMLElement) {
  const newActivePos = newActive.dataset.pos;

  // set HTML data attributes for all cards
  cardHTMLRefs.value?.forEach((item) => {
    if (!item) return;

    var itemPos = item.dataset.pos;

    if (itemPos && newActivePos) {
      item.dataset.pos = getPos(itemPos, newActivePos);
      item.dataset.isHiddenLeft = '' + (+item.dataset.pos <= -positionOutOfSight);
      item.dataset.isHiddenRight = '' + (+item.dataset.pos >= positionOutOfSight);
    };
  });
};

function getPos(current: string, steps: string) {
  const newPos = +current - +steps;
  const moveToRight = +steps < 0;
  const moveToLeft = +steps > 0;
  const isHidden = Math.abs(newPos) > positionOutOfSight;

  if (moveToRight && isHidden) {
    return '' + (newPos - countBrandFoodType.value);
  };

  if (moveToLeft && isHidden) {
    return '' + (newPos + countBrandFoodType.value);
  };

  return '' + newPos;
};

// swipe actions
function touchStart(touchEvent: TouchEvent) {
  // We only care if one finger is used
  if (touchEvent.changedTouches.length !== 1) return;

  const posXStart = touchEvent.changedTouches[0].clientX;

  addEventListener('touchend', (touchEvent) => {
    touchEnd(touchEvent, posXStart);
  }, { once: true });
}

function touchEnd(touchEvent: TouchEvent, posXStart: number) {

  const distance = posXStart - touchEvent.changedTouches[0].clientX;
  if (Math.abs(distance) < 30) return;

  const containerWidth = (document.querySelector('.wrapper-food') as HTMLDivElement).offsetWidth;
  const distanceRatio = Math.abs(distance) / containerWidth;
  const direction = distance > 0 ? 'right' : 'left';
  const numberDirection = distance > 0 ? 1 : -1;

  // big motion rotates more cards
  if (distanceRatio >= 0.6) {
    const newActive = cardHTMLRefs.value?.find(foodCard => {
      return foodCard.dataset.pos === '' + numberDirection * 3;
    });
    if (newActive) update(newActive);
    return;
  }

  if (distanceRatio >= 0.3) {
    const newActive = cardHTMLRefs.value?.find(foodCard => {
      return foodCard.dataset.pos === '' + numberDirection * 2;
    });
    if (newActive) update(newActive);
    return;
  }

  moveCarousel(direction);
}
</script>

<!-- FIXME Turn everything into a component to be reused for dry and wet food -->
<!-- also add input-number for wet food version -->

<template>
  <div :class="`${optionSelected} ${foodType}-food-cards`">

    <div class="header">

      <h4 class="title">{{ props.title }}</h4>

      <div class="options">

        <input type="radio"
               :name="`${props.foodType}-view-mode`"
               class="option gallery radio-button"
               :id="`${props.foodType}-gallery`"
               v-model="optionSelected"
               value="select-gallery">
        <label :for="`${props.foodType}-gallery`"
               :name="`${props.foodType}-view-mode`"
               class="radio-button">
          <img src="/icon-grid.png"
               alt="icon-grid"
               :id="`img-${props.foodType}-gallery`">
        </label>

        <input type="radio"
               :name="`${props.foodType}-view-mode`"
               class="option carousel radio-button"
               :id="`${props.foodType}-carousel`"
               v-model="optionSelected"
               value="select-carousel"
               checked>
        <label :for="`${props.foodType}-carousel`"
               :name="`${props.foodType}-view-mode`"
               class="radio-button">
          <img src="/icon-carousel.png"
               alt="icon-carousel"
               :id="`img-${props.foodType}-carousel`">
        </label>

      </div>
    </div>

    <!-- TODO attribution -->
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

    <div class="wrapper-food"
         @touchstart="touchStart">

      <button v-if="optionSelected === 'select-carousel'"
              class="button left"
              @click="moveCarousel('left')">
        <IconCircleChevronLeft />
      </button>

      <div class="food-card"
           v-for="(foodCard, i) in currentFoodBrands"
           :class="{ activated: foodCard.isMixPortion }"
           :key="foodCard._id"
           ref="cardHTMLRefs"
           :data-pos="initiatePosition(i)"
           :data-is-hidden-left="isHiddenLeft(i)"
           :data-is-hidden-right="isHiddenRight(i)">
        <label :for="foodCard.name">

          <img :src="imageURL(foodCard)"
               :alt="foodCard.name" />

          <input type="checkbox"
                 :id="foodCard.name"
                 v-model="foodCard.isMixPortion"
                 @click="selectCard($event)" />

        </label>
      </div>

      <button v-if="optionSelected === 'select-carousel'"
              class="button right"
              @click="moveCarousel('right')">
        <IconCircleChevronRight />
      </button>

    </div>

  </div>
</template>

<style scoped lang="scss">
@use 'colors' as *;
@use 'mixins' as *;
@use 'variables' as *;

.dry-food-cards,
.wet-food-cards {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .title {
      margin: 0;
    }

    .options {
      width: auto;

      display: flex;
      justify-content: flex-end;

      input[type=radio].option {
        height: 0;
        width: 0;
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        // firefox would display 1.6px borders
        -moz-appearance: none;

        &:checked+label {
          @include boxShadowButtonChecked;
        }

        &:active+label {
          @include boxShadowButtonActive;
        }

        &:focus+label,
        &:hover+label {
          @include outlineOnHover;
        }
      }

      label.radio-button {
        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;

        margin: $margin-button;
        aspect-ratio: 1 / 1;
        width: $size-button;
        border-radius: $round-corner;

        @include boxShadowButton;

        // mouse down on input element doesn't fire after first focus
        // for consecutive clicks I had to apply on the child img
        &:active>img {
          @include boxShadowButtonActive;
        }

        img {
          aspect-ratio: 1/1;

          &#img-gallery {
            width: 85%;
          }

          &#img-carousel {
            width: 100%;
          }
        }

        @at-root input+label>img {
          filter: invert(87%) sepia(39%) saturate(3430%) hue-rotate(336deg) brightness(87%) contrast(82%);
        }

        .option {}
      }
    }
  }

  // basic style for food cards
  .wrapper-food {

    .food-card {
      position: relative;

      @include foodCardSize;
      margin: 1rem;

      border-radius: $round-corner;
      @include boxShadowCard;

      &:hover {
        @include outlineOnHover;
      }

      // TODO add zoom effect on hover
      // inspired by: https://codepen.io/petegarvin1/pen/YzWBbRx
      &.activated {
        @include boxShadowCardActivated;
        z-index: 10;

        &>label {
          z-index: 5;

          &>img {
            z-index: inherit;
          }
        }
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
          border-radius: $round-corner;
        }

        input {
          display: none
        }
      }
    }
  }
}

// gallery style
.select-gallery {

  .wrapper-food {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .food-card {

      &.activated {}

      label {
        img {}

        input {}
      }
    }
  }
}

// carousel style
.select-carousel {

  .wrapper-food {
    display: flex;
    justify-content: center;

    list-style: none;
    position: relative;
    width: 100%;
    @include orientationHeight($food-card-height);
    max-height: 450px;
    perspective: 300px;

    .button {
      position: absolute;

      height: inherit;
      max-height: inherit;
      z-index: 10;

      background: none;
      border: none;
      cursor: pointer;

      &.left {
        left: 0;

        & .previous {}
      }

      &.right {
        right: 0;

        & .next {}
      }
    }

    .food-card {
      display: flex;
      align-items: center;
      justify-content: center;

      color: #fff;
      font-size: 0px;

      border-radius: 12px;
      position: absolute;
      transition: transform .2s ease-in;

      &.activated {}

      label {

        img {}

        input {}
      }

      &[data-pos="0"] {
        z-index: 5;
      }

      &[data-pos="-1"],
      &[data-pos="1"] {
        filter: blur(1px) grayscale(10%);
      }

      &[data-pos="-1"] {
        transform: translateX(-60%) scale(.9);
        z-index: 4;
      }

      &[data-pos="1"] {
        transform: translateX(60%) scale(.9);
        z-index: 4;
      }

      &[data-pos="-2"],
      &[data-pos="2"] {
        filter: blur(2px) grayscale(20%);
      }

      &[data-pos="-2"] {
        transform: translateX(-90%) scale(.8);
        z-index: 3;
      }

      &[data-pos="2"] {
        transform: translateX(90%) scale(.8);
        z-index: 3;
      }

      &[data-is-hidden-left="true"] {
        transform: translateX(-140%) scale(0);
        z-index: 0;
      }

      &[data-is-hidden-right="true"] {
        transform: translateX(140%) scale(0);
        z-index: 0;
      }
    }
  }
}
</style>