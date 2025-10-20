<script setup lang="ts">
import {useDescriptions} from "~/composables/constants/itemsDescription";
import {useCategoriesBySlug} from "~/composables/useCategoryBySlug";
const {descriptionItems} = useDescriptions()
const route = useRoute()
const cleanPath = route.path.startsWith('/') ? route.path.slice(1) : route.path
const {fetchCategories} = useCategoriesBySlug();
const {data: category} = await useAsyncData(() => fetchCategories(cleanPath))

const config = useRuntimeConfig()
const canonicalUrl = `${config.public.siteUrl || 'https://otellica.ru'}${route.path}`

// Добавляем мета-теги и каноническую ссылку
useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ]
})

useSeoMeta({
  title: category.value?.meta_title,
  ogTitle: category.value?.meta_title,
  description: category.value?.meta_description,
  ogDescription: category.value?.meta_description,
  ogImage: 'https://otellica.ru/assets/images/logo.webp',
})
</script>

<template>
  <main class="main">
    <ProductsList :title="category.title" :category-id="category.id" :grid-four="true" :contain-images="true"/>
    <MainDescription title="Преимущества, которые стали причиной успеха этих проектов" :list-items="descriptionItems"/>
    <section>
      <div class="container flex flex-col items-center">
        <p class="w-full md:flex md:w-2/5 primary--border text-center mb-3"></p>
        <h2 class="w-full md:flex md:w-2/5 text-center font-semibold">Выбирая нас, вы делаете шаг к созданию комфортного
          и
          привлекательного пространства для ваших гостей, что положительно скажется на их впечатлениях и,
          соответственно, на вашем бизнесе.</h2>
      </div>
    </section>
    <MainForm/>
  </main>
</template>

<style scoped>

</style>