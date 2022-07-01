<template>
  <section class="container">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import "../assets/scss/mixins/theme.scss";

// LIGHT
$light-border-color: black;
// DARK
$dark-border-color: yellow;


@mixin container($border-color) {
  .container {
    border: 3px solid $border-color;
    border-radius: 10px;
    margin: 1rem;
    padding: 1rem;
  }
}

@include componentTheme(light) {
  @include container($light-border-color);
}

@include componentTheme(dark) {
  @include container($dark-border-color);
}
</style>