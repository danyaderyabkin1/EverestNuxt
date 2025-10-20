<script setup lang="ts">
import {useCategoriesBySlug} from "~/composables/useCategoryBySlug";
import {useTow} from "~/composables/constants/itemsTTow";
import {useDescriptions} from "~/composables/constants/itemsDescription";
const {descriptionItems} = useDescriptions()
const config = useRuntimeConfig()
const route = useRoute()
const cleanPath = computed(() => {
  return route.path.startsWith('/') ? route.path.slice(1) : route.path
})
const {fetchCategories} = useCategoriesBySlug();
// const {fetchWidgetByCode} = useWidgets();

// Автоматически перезагружает при изменении route.name
// const { data: widget } = useAsyncData(
//     () => `widget-${route.params.id}`,
//     () => fetchWidgetByCode(route.params.id)
// )
const { data: category } = await useAsyncData(
    `category-${cleanPath.value}`, // Уникальный ключ для каждой страницы
    () => fetchCategories(cleanPath.value),
    {
      watch: [cleanPath] // Автоматически перезапускаем при изменении
    }
)

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Главная",
            "item": `${config.public.siteUrl}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Текстиль",
            "item": `${config.public.siteUrl}/tekstil`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": category.value.title,
            "item": `${config.public.siteUrl}${route.path}`
          }
        ]
      })
    }
  ]
})

useSeoMeta({
  title: category.value.meta_title,
  description: category.value.meta_description,
  ogTitle: category.value.meta_title,
  ogDescription: category.value.meta_description,
  ogImage: category.value.image,
  ogUrl: `${config.public.siteUrl}${route.path}`,
  ogSiteName: `${config.public.siteName}`,
  ogType: 'website',
  ogLocale: 'ru_RU'
})
const cleanText = (html: string) => html.replace(/<[^>]*>/g, '')
</script>

<template>
  <main class="main">
    <div class="container">
      <UBreadcrumb
          class="text-gray-300 flex  custom-breadcrumb"
          divider="-"
          :ui="{
        label: 'text-gray-500 font-light',
        separator: 'text-gray-300',
        separatorIcon: 'text-gray-500',
        list: 'text-gray-500',
        link: 'text-gray-300'
    }"
          :links="[{ label: 'Главная', to: '/' }, {label: 'Кровати'}]"
      />
      <h1>{{cleanText(category?.title || '')}}</h1>
    </div>
<!--    <MainBanner-->
<!--        :title="cleanText(category?.preview_content)"-->
<!--        :description="cleanText(category?.content)"-->
<!--        :not-main-banner="true"-->
<!--        :bg-color="true"-->
<!--        :contrast="true"-->
<!--        :image="category?.image"/>-->

    <!--    <Category :title="category?.title" :id="category?.id"/>-->
    <ProductsList
        :title="category?.title"
        :category-id="category?.id"
        :grid-four="true"
    />
    <MainDescription title="Эверест" :list-items="descriptionItems"/>
    <MainChoice
        :title="cleanText(category?.content)"
        :image="category?.image"
        :reverse="true"
    />
<!--    <MainForm/>-->
    <MainNewsList/>
  </main>
</template>

<style scoped>
.products {
  padding: 0;
}
main {
  background-color: #EFF0F2;
}
</style>