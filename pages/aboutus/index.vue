<script setup lang="ts">
import {useDescriptions} from "~/composables/constants/itemsDescription";

const route = useRoute()
const config = useRuntimeConfig()
const canonicalUrl = `${config.public.siteUrl}${route.path}`
const {descriptionItems} = useDescriptions()

useHead({
  link: [
    {rel: 'canonical', href: canonicalUrl}
  ]
})

useSeoMeta({
  title: 'О нашей компании ',
  ogTitle: 'О нашей компании ',
  description: 'История компании началась с желания создать кровати',
  ogDescription: 'История компании началась с желания создать кровати',
  ogImage: '',
})

const itemsThx = [
  '/assets/images/about/dec_237670_page-0001-1-optimized.webp',
  '/assets/images/about/00208__page-0001-optimized.webp',
  '/assets/images/about/dec_237670_page-0001-1-optimized.webp',

]

</script>

<template>
  <main class="main">
    <div class="container max-w-7xl mx-auto">
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
          :links="[{ label: 'Главная', to: '/' }, {label: 'О компании'}]"
      />
    </div>
    <CollectionsWelcome/>
    <section class=" cooperation ">
      <div class="mx-auto px-4 sm:px-10 lg:px-14 py-4 sm:py-10 lg:py-14 max-w-7xl bg-[#EFF0F2] lg:rounded-[45px]">
        <h2 class="title mb-8">История компании</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div class="py-4">
            <div class="sm:pl-20 mb-4">
              <h5 class="text-xl xl:text-2xl font-semibold mb-4 proxima">ООО ПКФ «Эверест» работает на рынке
                инжиниринговых систем с 2008 года.</h5>
            </div>
            <ul class="space-y-3">
              <li class="flex sm:items-center gap-4">
                <svg class="hidden sm:block  sm:flex-shrink-0" width="60" height="60" viewBox="0 0 60 60" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_2002_53)">
                    <path opacity="0.5"
                          d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z"
                          stroke="#1C274C" stroke-width="3.75"/>
                    <path d="M21.25 31.25L26.25 36.25L38.75 23.75" stroke="#2898D8" stroke-width="3.75"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2002_53">
                      <rect width="60" height="60" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>

                <span class="text-[#666D75] dark:text-gray-300">
                  За это время мы собрали команду первоклассных специалистов, создали обширную материальную базу и накопили большой опыт.
                </span></li>
              <li class="flex sm:items-center gap-4">
                <svg class="hidden sm:block  sm:flex-shrink-0" width="60" height="60" viewBox="0 0 60 60" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_2002_53)">
                    <path opacity="0.5"
                          d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z"
                          stroke="#1C274C" stroke-width="3.75"/>
                    <path d="M21.25 31.25L26.25 36.25L38.75 23.75" stroke="#2898D8" stroke-width="3.75"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2002_53">
                      <rect width="60" height="60" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>

                <span
                    class="text-[#666D75] dark:text-gray-300">
                  За 17 лет существования на рынке мы зарекомендовали себя как стабильный партнер, ведущий бизнес в строгом соответствии с критериями надежности, современными стандартами качества и высокой ответственности перед своими клиентами.</span>
              </li>
              <li class="flex sm:items-center gap-4">
                <svg class="hidden sm:block  sm:flex-shrink-0" width="60" height="60" viewBox="0 0 60 60" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_2002_53)">
                    <path opacity="0.5"
                          d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z"
                          stroke="#1C274C" stroke-width="3.75"/>
                    <path d="M21.25 31.25L26.25 36.25L38.75 23.75" stroke="#2898D8" stroke-width="3.75"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2002_53">
                      <rect width="60" height="60" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>

                <span
                    class="text-[#666D75] dark:text-gray-300">
                  Руководствуясь принципами максимально лояльного отношения к клиентам, мы сумели составить собственную стратегию ведения бизнеса, неотъемлемыми компонентами которой являются оперативность обслуживания, доступность и официальная гарантия качества.
                </span>
              </li>
            </ul>
          </div>
          <div class="hidden lg:block">
            <img src="/public/assets/images/home/3c01005c597dc074c02cd6137a3eaeed295a0ae8.png" alt="Безопасность"
                 class="rounded-xl w-full h-auto">
          </div>
        </div>
      </div>

    </section>
    <MainDescription title="Преимущества, которые стали причиной успеха" :list-items="descriptionItems"/>
    <section id="contacts" class="contacts">
      <h4 class="title mb-8">Реквизиты и лицензии</h4>
      <div class="container contacts__container">
        <div class="bg-[#f3f3f3] p-8 rounded-[45px] flex flex-col items-start"><h5 class="text-lg lg:text-3xl mb-8 font-semibold w-fit">ООО "Эверест"</h5>
          <p class="mb-2 text-lg uppercase">инн: 3702676469</p>
          <p class="mb-2 text-lg uppercase">кпп: 370201001</p>
          <p class="mb-2 text-lg uppercase">юр. адрес: 153012, г. Иваново, ул. Сакко, д.39</p>
          <p class="mb-2 text-lg uppercase">директор: Успенский Илья Вадимович</p>
          <button class="btn btn-primary mt-auto">скачать карточку предприятия</button>
        </div>
        <div>
          <div class="certificate__wrap">
            <a v-for="(item, index) in itemsThx" :key="index" :href="item" data-fancybox="gallery">
              <img :src="item" class="w-full" draggable="false" alt="image">
            </a>
          </div>
        </div>
      </div><!----></section>
    <MainNewsList title="Последние выполненные проекты"/>
    <MainForm/>
  </main>


</template>

