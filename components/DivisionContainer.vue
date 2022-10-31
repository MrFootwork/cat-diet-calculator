<template>
  <section class="container">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
// @import "../assets/sass/abstracts/_mixins.scss";

%staticContainerAttributes {
  border-radius: 10px;
  margin: 1rem;
  padding: 1rem;
}

@include componentTheme(light) {
  .container {
    border: 3px solid $light-secondary-color;
    @extend %staticContainerAttributes
  }
}

@include componentTheme(dark) {
  .container {
    border: 3px solid $dark-secondary-color;
    @extend %staticContainerAttributes
  }
}
</style>