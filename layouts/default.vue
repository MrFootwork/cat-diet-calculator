<script setup lang="ts">
import ResultDisplay from '~~/components/DisplayResult.vue'

</script>

<template>
  <div>
    <ResultDisplay />
    <slot />
  </div>
</template>

<style lang="scss">
@use 'mixins' as *;
@use 'colors' as *;

:root {
  @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Montserrat:wght@700&display=swap');

  margin: 0;
  padding: 0;
}


@include styleBody(light) {
  background-color: $light-background-color;
  color: $light-text-color;
}

@include styleBody(dark) {
  background-color: $dark-primary-color;
  color: $dark-secondary-color;
}
</style>