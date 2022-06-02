<script setup lang="ts">
definePageMeta({
  layout: "default",
});
</script>

<template>
  <div>
    <h1>Some Info</h1>
    {{ $route.params }}
  </div>
</template>
