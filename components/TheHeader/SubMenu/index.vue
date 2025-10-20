<script setup lang="ts">
const props = defineProps<{
  subCategory: object | null // Добавляем null, если id может отсутствовать
}>();
</script>

<template>
  <ul class="nav__list-dropdown">
    <li v-for="category in subCategory" :key="category.id">
      <NuxtLink :to="`${category.url}`">{{ category.title }}</NuxtLink>
    </li>
  </ul>
</template>