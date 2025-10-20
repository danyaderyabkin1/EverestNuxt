<script setup lang="ts">
const props = defineProps<{
  subCategory: array | null
}>();
</script>

<template>
  <ul v-if="subCategory?.length" class="aside__dropdown">
    <li v-for="category in subCategory" :key="category.id">
      <NuxtLink :to="`${category?.url}`">{{ category?.title }}</NuxtLink>
    </li>
  </ul>
</template>