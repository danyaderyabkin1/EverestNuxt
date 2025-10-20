<script setup lang="ts">
import {useSteps} from "~/composables/constants/itemSteps";
import {useColorsWood} from "~/composables/constants/itemsColorWood";
import {useColors} from "~/composables/constants/itemsColor";
import {useCategoriesBySlug} from "~/composables/useCategoryBySlug";



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

const {itemsSteps} = useSteps()
const {itemsColorsWood} = useColorsWood()
const {itemsColors} = useColors()

const cleanText = (html:string) => html.replace(/<[^>]*>/g, '')
</script>

<template>
  <main class="main">
    <MainBanner
        :title="cleanText(category?.preview_content)"
        :description="cleanText(category?.content)"
        :not-main-banner="true"
        :image="category?.image"/>
        <ProductsList
            :title="category?.title"
            :category-id="category?.id"
        />
<!--    <pre>{{category}}</pre>-->
    <MainSteps
        title="Почему Отеллика?"
        :bg-color="true"
        :items="itemsSteps"
    />
    <MainColors
        v-if="category?.meta_keywords === 'cloth'"
        title="Широкий выбор мебельных тканей"
        :bg-color="false"
        :items="itemsColors"
    />
    <MainColors
        v-if="category?.meta_keywords === 'wood'"
        title="Большой выбор фактуры"
        :bg-color="false"
        :items="itemsColorsWood"
    />

    <MainForm/>
  </main>
</template>

<style scoped>

</style>