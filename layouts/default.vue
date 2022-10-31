<template>
  <div>
    <NuxtLink to="/">Welcome To The Cats Diet Calculator</NuxtLink>
    <slot />
  </div>
</template>

<style lang="scss">
// @import "../assets/sass/abstracts/_mixins.scss";

@include componentTheme(light) {
  background-color: $light-primary-color;
  color: $light-secondary-color;
}

@include componentTheme(dark) {
  background-color: $dark-primary-color;
  color: $dark-secondary-color;
}
</style>