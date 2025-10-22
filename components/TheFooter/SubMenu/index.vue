<script setup lang="ts">
const {fetchCategories} = useCategories()
const {fetchProducts} = useProducts()
const { data: mainCategories } = await useAsyncData('categoriesFooter', async () => {
  const categories = await fetchCategories();
  const filteredCategories = categories.filter(cat => cat.id !== 13 && cat.id !== 14);
  return await Promise.all(
      filteredCategories.map(async cat => ({
        id: cat.id,
        subCategories: await fetchCategories(cat.id)
      }))
  );
});
</script>

<template>
  <ul class="nav__list" v-for="category in mainCategories" :key="category.id">
    <li v-if="category.id !== 503" class="nav__item" v-for="subCategory in category.subCategories" :key="category.id">
      <NuxtLink class="nav__link" :to="`${subCategory.url}`">{{ subCategory.title }}</NuxtLink>
    </li>
    <div v-else>
      <li class="nav__item">
        <NuxtLink class="nav__link" to="/proekty">Проектирование</NuxtLink>
      </li>
      <li class="nav__item">
        <NuxtLink class="nav__link" to="/proekty">Монтаж</NuxtLink>
      </li>
      <li class="nav__item">
        <NuxtLink class="nav__link" to="/proekty">Сервис</NuxtLink>
      </li>
    </div>
    <li v-if="category?.id === 505" class="mt-auto hidden xl:flex font-semibold">
      <p>© 2008-{{ new Date().getFullYear() }} Эверест | Все права защищены</p>
    </li>
  </ul>
</template>