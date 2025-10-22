<script setup lang="ts">
const {fetchCategories} = useCategories()
const { data: mainCategories } = await useLazyAsyncData('categories', async () => {
  const categories = await fetchCategories();
  const withSubs = await Promise.all(
      categories.map(async cat => ({
        ...cat,
        subCategories: await fetchCategories(cat.id, '', '')
      }))
  );
  return { categories: withSubs };
});
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
    <section class="catalog">
      <div class="container catalog__container max-w-7xl rounded-3xl lg:rounded-[45px]">
        <div class="text-center mt-4 md:mt-0">
          <h3>Каталог товаров</h3>
        </div>
        <div v-for="item in mainCategories?.categories" class="flex flex-wrap  justify-center items-center md:p-4">
          <div v-if="item.id === 505" v-for="sub in item.subCategories" class="w-full md:w-2/5 lg:w-1/3 p-4">
            <NuxtLink :to="`${sub.url}`" class="relative catalog__wrapper">
              <h4 class="catalog__title md:w-2/3 text-lg font-semibold absolute top-10 text-center  left-1/2 -translate-x-1/2">{{sub?.title}}</h4>
              <img v-if="sub?.preview_image" :src="`${sub?.preview_image}`" alt="Ventilation Equipment" class="w-full xl:h-[580px] object-cover rounded-3xl mt-2">
              <img v-else src="/assets/images/nophoto.jpg" alt="Ventilation Equipment" class="w-full xl:h-[580px] object-cover rounded-3xl mt-2">
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <HomeCooperation/>
    <HomeCalc/>
    <MainNewsList/>
    <MainForm/>
<!--    <MainSwiperBanner/>-->
  </main>
</template>
