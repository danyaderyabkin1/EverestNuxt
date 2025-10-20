<script setup lang="ts">
useSeoMeta({
  title: 'Комплексное оснащение отелей и гостиниц: от мебели до текстиля',
  ogTitle: 'Комплексное оснащение отелей и гостиниц: от мебели до текстиля',
  description: 'Полностью оснащаем отели и гостиницы текстилем и мебелью. Предлагаем комплексные решения под ваши параметры. Оснащаем так же фитнес-клубов.',
  ogDescription: 'Полностью оснащаем отели и гостиницы текстилем и мебелью. Предлагаем комплексные решения под ваши параметры. Оснащаем так же фитнес-клубов.',
  ogImage: '',
})
</script>

<template>
  <main class="main bg-[#EFF6F9]">
    <MainBanner
        :image="[
          '/assets/images/banners/abf31f4fd16f26a0d692d3b63e5e773e575eea84.webp',
          '/assets/images/banners/abf31f4fd16f26a0d692d3b63e5e773e575eea84.webp',
          '/assets/images/banners/abf31f4fd16f26a0d692d3b63e5e773e575eea84.webp',
          '/assets/images/banners/abf31f4fd16f26a0d692d3b63e5e773e575eea84.webp',
         '/assets/images/banners/abf31f4fd16f26a0d692d3b63e5e773e575eea84.webp',
        ]"
        title="Проектирование и монтаж систем вентиляции"
        description="Проведем качественную и надежную систему вентиляции и кондиционирования, в срок до 1 месяца, и обеспечим комфортное пребывание на объекте, без головной боли и срыва сроков!"
        :contrast="true"
        :bg-color="true"
        :not-main-banner="false"/>
    <HomeCooperationSwiper/>
    <HomeCooperation/>
    <MainNewsList/>
    <MainForm/>
    <HomeCalc/>
<!--    <MainSwiperBanner/>-->
  </main>
</template>
