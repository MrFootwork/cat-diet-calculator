<template>
  <section class="container">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<style scoped lang="scss">
@use 'mixins' as *;
@use 'colors' as *;
@use 'variables' as *;

h4 {
  margin: 0 $margin-button calc(2* $margin-button) 0;
}

%staticContainerAttributes {
  border-radius: 10px;
  margin: 1rem 0;
  padding: $padding-container;
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