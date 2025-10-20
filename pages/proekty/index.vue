<script setup lang="ts">
import {useDescriptions} from "~/composables/constants/itemsDescription";
const route = useRoute()
const config = useRuntimeConfig()
const canonicalUrl = `${config.public.siteUrl || 'https://otellica.ru'}${route.path}`

// Добавляем мета-теги и каноническую ссылку
useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ]
})

useSeoMeta({
  title: 'Кейсы Otellica',
  ogTitle: 'Кейсы Otellica',
  description: 'Наши кейсы и опыт последних лет',
  ogDescription: 'Наши кейсы и опыт последних лет',
  ogImage: 'https://otellica.ru/assets/images/logo.webp',
})
const {descriptionItems} = useDescriptions()
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
          :links="[{ label: 'Главная', to: '/' }, {label: 'Наши проекты'}]"
      />
      <h1>Наши проекты</h1>
    </div>
    <CollectionsList :category-id="503" :per-page="9"/>
    <MainDescription title="Преимущества, которые стали причиной успеха этих проектов" :list-items="descriptionItems"/>
    <MainForm/>
  </main>


</template>

