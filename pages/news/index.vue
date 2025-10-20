<script setup lang="ts">
const {fetchNews} = useNews()
const {data: news} = await useAsyncData(() => fetchNews())

const route = useRoute()
const config = useRuntimeConfig()
const canonicalUrl = `${config.public.siteUrl}${route.path}`

// Добавляем мета-теги и каноническую ссылку
useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ]
})

useSeoMeta({
  title: 'Публикации Otellica',
  ogTitle: 'Публикации Otellica',
  description: 'Публикации Otellica',
  ogDescription: 'Публикации Otellica',
  // ogImage: 'https://otellica.ru/assets/images/logo.webp',
})
</script>

<template>
  <main class="main">
    <section class="news">
      <div class="container news__container">
        <MainNewsList/>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>