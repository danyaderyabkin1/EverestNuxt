<script setup lang="ts">
import {useCategories} from "~/composables/useCategories";

const props = defineProps({
  id: {
    type: Number
  },
  title: {
    type: String,
  }
})
const {fetchCategories} = useCategories();
const { data: categories } = await useAsyncData(
    `categories-${props.id}`, // Уникальный ключ для каждой страницы
    () => fetchCategories(props.id)
)
</script>

<template>
  <section class="category white my-8">
    <div class="container p-2 max-w-7xl">
      <h2  class="title font-semibold mb-4">{{ title }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-2 md:gap-3 lg:gap-6">
        <NuxtLink v-for="category in categories" :key="category?.id" :to="category?.url" class="relative h-36 sm:h-52 md:h-62 lg:h-64">
          <img v-if="category?.preview_image" class="shadow-sm" :src="category?.preview_image" :alt="category?.title">
          <img v-else class="shadow-sm" src="/assets/images/nophoto.jpg" alt="no-img">
          <h3 class="category__link border border-gray-200">{{category?.title}}</h3>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<style scoped>

</style>