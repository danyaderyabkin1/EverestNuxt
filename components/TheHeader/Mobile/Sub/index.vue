<script setup lang="ts">
const props = defineProps({
  subCategories: Array,
  visible: Boolean,
})

</script>

<template>
  <ul v-if="visible" class="nav__list-dropdown">
    <li v-for="subCategory in subCategories" :key="subCategory?.id" class="nav__item">
      <NuxtLink :to="subCategory?.url">{{subCategory?.title}}</NuxtLink>
    </li>
  </ul>
</template>

<style scoped>

</style>