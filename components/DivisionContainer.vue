<template>
  <section class="container">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@use 'mixins' as *;
@use 'colors' as *;

%staticContainerAttributes {
  border-radius: 10px;
  margin: 1rem 2rem;
  padding: 1rem;
}

@include styleBody(default) {
  .container {
    backdrop-filter: blur(12px);
    @include boxShadow;
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