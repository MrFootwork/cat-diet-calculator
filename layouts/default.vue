<script setup lang="ts">

</script>

<template>
  <div class="background">
    <DisplayResult />
    <slot />
  </div>
</template>

<style lang="scss">
@use 'mixins' as *;
@use 'colors' as *;

:root {
  --background-padding: 5vw;
  --background-padding-max: 2rem;
}

%body {

  @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Montserrat:wght@700&display=swap');
  font-family: "Abril Fatface", cursive;

  margin: 0;
  padding: 0;
}

@include styleBody(default) {

  @extend %body;
  background-color: $light-background-color;
  color: $light-text-color;

  .background {
    background-image: url("/background-cats.png");
    background-size: contain;
    padding: min(var(--background-padding), var(--background-padding-max));
  }
}

@include styleBody(dark) {

  @extend %body;
  background-color: $dark-primary-color;
  color: $dark-secondary-color;

  .background {
    padding: min(var(--background-padding), var(--background-padding-max));
  }
}
</style>