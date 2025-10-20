<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const {fetchNews} = useNews()
const {data: news} = useAsyncData(() => fetchNews())
defineProps({
  bg: {
    type: Boolean,
    required: false
  },
  title: {
    type: String
  }
})

// Ref для управления Swiper
const swiperInstance = ref(null)

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

// Функции для ручного управления навигацией
const goNext = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext()
  }
}

const goPrev = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev()
  }
}

const swiperOptions = {
  modules: [Autoplay, Pagination],
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  // pagination: {
  //   clickable: true,
  // },
  watchSlidesProgress: true,
  breakpoints: {
    1: {
      slidesPerView: 1.1,
      spaceBetween: 10
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
}
</script>

<template>
  <section class="news">
    <div :class="{'bg-white': bg}" class="news__container">
      <NuxtLink to="/news">
        <h4 class="title w-fit mx-auto ">{{title || `Новости и публикации`}}</h4>
      </NuxtLink>

      <!-- Обертка для всего слайдера -->
      <div class="news-slider-wrapper">
        <!-- Кнопки навигации ВНЕ swiper с ручным управлением -->
        <button
            class="news-slider-nav news-slider-nav--prev"
            aria-label="Предыдущий слайд"
            @click="goPrev"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Swiper слайдер БЕЗ встроенной навигации -->
        <ul class="news__list">
          <ClientOnly>
            <swiper
                v-bind="swiperOptions"
                class="news-slider"
                @swiper="onSwiper"
            >
              <swiper-slide
                  v-for="item in news"
                  :key="item?.id"
                  class="news-slider__slide"
              >
                <MainNewsListItem :article="item" />
              </swiper-slide>
            </swiper>
          </ClientOnly>
        </ul>

        <!-- Кнопки навигации ВНЕ swiper с ручным управлением -->
        <button
            class="news-slider-nav news-slider-nav--next"
            aria-label="Следующий слайд"
            @click="goNext"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-slider-wrapper {
  position: relative;
  max-width: 1520px;
  margin: 0 auto;
  padding: 0 3rem;
}

.swiper-slide {
  height: auto !important;
}

.news__list {
  position: relative;
}


.swiper-pagination {
  bottom: -3px !important;
}

.swiper-pagination-bullet-active {
  background: #2496D7 !important;
}

/* Стили для кнопок навигации ВНЕ swiper */
.news-slider-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.news-slider-nav:hover {
  background: #2496D7;
  border-color: #2496D7;
  color: white;
}

.news-slider-nav--prev {
  left: 0;
}

.news-slider-nav--next {
  right: 0;
}

/* Скрываем кнопки на мобильных */
@media screen and (max-width: 1200px) {
  .news-slider-nav--prev {
    left: -20px;
  }

  .news-slider-nav--next {
    right: -20px;
  }
}

@media screen and (max-width: 768px) {
  .news-slider-nav {
    display: none !important;
  }
}

@media screen and (max-width: 480px) {
  .swiper-pagination {
  }

  .news-slider-wrapper {
    padding: 0;
  }

}
</style>