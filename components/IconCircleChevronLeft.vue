<script setup lang="ts">

</script>

<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 512 512">
      <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path
            d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512s256-114.6 256-256zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
    </svg>
  </div>
</template>

<style scoped lang="scss">
@use 'colors' as *;
@use 'mixins' as *;

$circle-size: 4rem;

svg {
  width: $circle-size;
  height: $circle-size;
  fill: $light-primary-color;
  border-radius: 50%;

  transition: transform .1s ease-out;
}

button:hover>div>svg {
  @include outlineOnHover;
}

button:active>div>svg {
  outline: none
}

button:active>div>svg {
  box-shadow: none;
  transform: translateY(3px);
  transition: none;
}
</style>