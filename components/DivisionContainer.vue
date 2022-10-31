<template>
  <section class="container">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@use '../assets/sass/abstracts/_mixins.scss' as *;
@use '../assets/sass/abstracts/_colors.scss' as *;

%staticContainerAttributes {
  border-radius: 10px;
  margin: 1rem;
  padding: 1rem;
}

@include styleBody(light) {
  .container {
    border: 3px solid $light-secondary-color;
    @extend %staticContainerAttributes
  }
}

@include styleBody(dark) {
  .container {
    border: 3px solid $dark-secondary-color;
    @extend %staticContainerAttributes
  }
}
</style>