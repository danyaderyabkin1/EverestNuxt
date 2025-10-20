<script setup lang="ts">
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
  title: 'Мебель для гостиниц и отелей',
  ogTitle: 'Мебель для гостиниц и отелей',
  description: 'Обеспечьте комфорт для своих гостей на долгие годы с нашей качественной мебелью с нашей мебелью для гостиниц, отелец от Otellica',
  ogDescription: 'Обеспечьте комфорт для своих гостей на долгие годы с нашей качественной мебелью с нашей мебелью для гостиниц, отелец от Otellica',
  ogImage: 'https://otellica.ru/assets/images/logo.webp',
})

const breakpoints = ref({
  1: {
    slidesPerView: 1,
    spaceBetween: 10
  },
  480: {
    slidesPerView: 2,
    spaceBetween: 10
  },

  768: {
    slidesPerView: 3,
    spaceBetween: 30
  }
})

const slides = [
  {
    id: 1,
    image: 'tk1-optimized.webp'
  },
  {
    id: 2,
    image: 'tk2-optimized.webp'
  },
  {
    id: 3,
    image: 'tk3-optimized.webp'
  },
  {
    id: 4,
    image: 'tk4-optimized.webp'
  }
]

const descriptionItems = ref([
  {
    id: 1,
    title: 'Легкость очистки',
    description: 'Технология производства позволяет использовать различные средства дезинфекции.',
    image: 'clean.svg'
  },
  {
    id: 2,
    title: 'Сохранение формы',
    description: 'Наши мебельные ткани обладают устойчивостью к растяжению и деформациям.',
    image: 'check-1.svg'
  },
  {
    id: 3,
    title: 'Экологичность материалов',
    description: 'Использование качественных материалов, таких как клей на водяной основе, делает нашу мебель более безопасной.',
    image: 'eco.svg'
  },
  {
    id: 4,
    title: 'Богатая цветовая палитра',
    description: 'Мы предлагаем нашим клиентам широкий ассортимент мебельных тканей, который включает около 400 различных цветов и оттенков.',
    image: 'color-.svg'
  },
  {
    id: 5,
    title: 'Водоотталкивающие ткани',
    description: 'Мебельные ткани OTELLICA разработаны специально для гостиничного бизнеса, а потому отлично отталкивают влагу.',
    image: 'weave.svg'
  }
])
const cleanText = (html: string) => html.replace(/<[^>]*>/g, '')
</script>

<template>
  <main class="main">
    <MainBanner
        :image="category?.image"
        :title="cleanText(category?.preview_content)"
        :description="cleanText(category?.content)"
        :not-main-banner='true'/>
    <TheCategory :title="category?.subTitle" :category-id="category?.id"/>

    <MainDescription title="Мебельные ткани для гостиниц и отелей" :list-items="descriptionItems"/>
    <section class="slider">
      <div class="container slider__container relative pl-12 pr-12">
        <ul>
          <li v-for="item in slides" :key="item.id">
            <img :src="`/assets/images/mebel/${item?.image}`" alt="image">
          </li>
        </ul>
        <!--        <Swiper-->
        <!--            :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"-->
        <!--            :slides-per-view="4"-->
        <!--            :space-between="'20px'"-->
        <!--            :loop="true"-->
        <!--            :pagination="{-->
        <!--              enabled: true,-->
        <!--              clickable: true-->
        <!--              }"-->
        <!--            :navigation="{-->
        <!--            enabled: true,-->
        <!--            nextEl: '.swiper-button-nextE',-->
        <!--            prevEl: '.swiper-button-prevE',-->

        <!--          }"-->
        <!--            :breakpoints="breakpoints"-->
        <!--        >-->
        <!--          <SwiperSlide v-for="(slide,index) in slides" :key="index">-->
        <!--            <img :src="`/assets/images/mebel/${slide?.image}`" alt="image">-->
        <!--          </SwiperSlide>-->


        <!--        </Swiper>-->
        <!--        <div class="swiper-button-prevE"> ‹</div>-->
        <!--        <div class="swiper-button-nextE"> ›</div>-->
        <!--        <div class="swiper-pagination"/>-->
      </div>
    </section>
    <MainForm/>
  </main>
</template>

<style scoped>

</style>