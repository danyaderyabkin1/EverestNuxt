<script setup lang="ts">
const route = useRoute()
const cleanPath = route.path.startsWith('/') ? route.path.slice(1) : route.path
const {fetchProduct} = useProduct()
const {data: product} = await useAsyncData(() => fetchProduct(cleanPath))

const config = useRuntimeConfig()
const canonicalUrl = `${config.public.siteUrl || 'https://otellica.ru'}${route.path}`

// Добавляем мета-теги и каноническую ссылку
useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ]
})

useSeoMeta({
  title: product.value?.meta_title,
  ogTitle: product.value?.meta_title,
  description: product.value?.meta_description,
  ogDescription: product.value?.meta_description,
  ogImage: 'https://otellica.ru/assets/images/logo.webp',
})


</script>
<template>
  <section class="collect">
    <div class="collect__container container">
      <div>
        <h1>{{ product?.title }}</h1>
        <UBreadcrumb
            :ui="{label: 'gap-x-3 text-gray-400'}"
            divider="/"
            :links="[{ label: 'Главная', to: '/' }, { label: 'Наши проекты', to: '/proekty' }, { label: product?.title }]"
        >
          <template #divider>
            <span class="w-3 h-1 rounded-full bg-gray-300 dark:bg-gray-700"/>
          </template>
        </UBreadcrumb>
      </div>
      <div class="hero__wrap-btn">
        <a href="#question" class="btn btn-primary hero__btn" type="button">Задать вопрос</a>
        <div class="hero__contacts">
          <div class="hero__contacts-wrapper">
            <a
                class="tg"
                href="https://t.me/+79158120572"
                target="_blank">
              <UIcon name="uil:telegram" class="size-9"/>
            </a>
            <a
                class="what"
                href="https://api.whatsapp.com/send/?phone=79158120572&text&type=phone_number&app_absent=0"
                target="_blank">
              <UIcon name="i-mingcute-whatsapp-fill" class="size-9"/>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="collect__container collect__container--grid container">
      <a class="collect__img" :href="product?.image" data-fancybox="gallery">
        <img :src="product?.image" :alt="product?.image">
      </a>
        <ul class="collect__list">
          <li :class="{full: product?.gallery.length >= 10}" v-for="(item, index) in product?.gallery" :key="index">
            <div class="pc">+{{product?.gallery?.length - 8}}</div>
            <div class="mob">+{{product?.gallery?.length - 5}}</div>
            <a :href="item" data-fancybox="gallery">
              <img :src="item" :alt="item">
            </a>
          </li>
        </ul>
    </div>
    <div class="container description--container" v-html="product?.content">
    </div>
  </section>
  <CollectionsList title="Другие проекты" :category-id="product.parent_id" />
  <div class="p-6" id="question"></div>
  <TheOptForm/>
</template>

<style scoped>
.hero__btn, .hero__contacts {
  background-color: #2496D8;
  color: white;
  min-width: auto;
}
.hero__contacts-wrapper {
  background-color: #fff;
}
</style>