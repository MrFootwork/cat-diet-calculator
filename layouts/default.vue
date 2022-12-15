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
@use 'sassMixins' as *;
@use 'sassColors' as *;

:root {
  @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Montserrat:wght@700&display=swap');

  margin: 0;
  padding: 0;
}


@include styleBody(light) {
  background-color: $light-primary-color;
  color: $light-secondary-color;
}

@include styleBody(dark) {
  background-color: $dark-primary-color;
  color: $dark-secondary-color;
}
</style>