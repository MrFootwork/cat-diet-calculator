<template>
  <div>
    <NuxtLink to="/">Welcome To The Cats Diet Calculator</NuxtLink>
    <slot />
  </div>
</template>

<style lang="scss">
@use 'sassMixins' as *;
@use 'sassColors' as *;

@include styleBody(light) {
  background-color: $light-primary-color;
  color: $light-secondary-color;
}

@include styleBody(dark) {
  background-color: $dark-primary-color;
  color: $dark-secondary-color;
}
</style>