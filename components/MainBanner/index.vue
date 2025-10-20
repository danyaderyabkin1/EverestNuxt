<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  secondDescription: {
    type: Array,
    required: false
  },
  image: {
    type: [String, Array],
    required: false
  },
  mobileImage: {
    type: [String, Array],
    required: false
  },
  contrast: {
    type: Boolean,
    required: false,
    default: true
  },
  bgColor: {
    type: Boolean,
    required: false,
  },
  notMainBanner: {
    type: Boolean,
    required: true,
    default: true
  }
})

const isOpen = ref(false)

// Проверяем, является ли image массивом
const isImageArray = computed(() => {
  return Array.isArray(props.image) && props.image.length > 0
})

// Проверяем, является ли mobileImage массивом
const isMobileImageArray = computed(() => {
  return Array.isArray(props.mobileImage) && props.mobileImage.length > 0
})

// Настройки слайдера
const swiperOptions = {
  modules: [Autoplay, Pagination, EffectFade],
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
  pagination: {
    clickable: true,
  },
}
</script>

<template>
  <section :class="{gray: bgColor}" class="hero">
    <div class="container">
      <!-- Слайдер для массива изображений -->
      <div v-if="isImageArray" class="hero-slider">
        <!-- Десктоп слайдер -->
        <Swiper
            v-bind="swiperOptions"
            class="hero-swiper-desktop"
            :effect="'fade'"
            :fadeEffect="{crossFade: true}"
        >
          <SwiperSlide v-for="(img, index) in image" :key="index">
            <img :src="img" :alt="`Banner image ${index + 1}`">
          </SwiperSlide>
        </Swiper>

        <!-- Мобильный слайдер -->
        <Swiper
            v-if="isMobileImageArray"
            v-bind="swiperOptions"
            class="hero-swiper-mobile"
            :effect="'fade'"
            :fadeEffect="{crossFade: true}"
        >
          <SwiperSlide v-for="(img, index) in mobileImage" :key="index">
            <img :src="img" :alt="`Banner mobile image ${index + 1}`">
          </SwiperSlide>
        </Swiper>
        <Swiper
            v-else
            v-bind="swiperOptions"
            class="hero-swiper-mobile"
        >
          <SwiperSlide v-for="(img, index) in image" :key="index">
            <img :src="img" :alt="`Banner image ${index + 1}`">
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Старое поведение для одиночного изображения -->
      <picture v-else-if="image">
        <source media="(max-width:650px)" :srcset="mobileImage ?? image">
        <img :src="image" alt="connect-image">
      </picture>

      <div class="hero__container">
        <div :class="{contrast: contrast}" class="hero__wrapper">
          <h1 class="hero__title" :class="{'title--main': !notMainBanner}">{{ title }}</h1>
          <div v-if="notMainBanner" class="hero__separator my-2"></div>
          <p>{{ description }}</p>
          <ul v-if="secondDescription">
            <li v-for="(item, i) in secondDescription" :key="i">{{ item }}</li>
          </ul>
        </div>

        <div class="hero__wrap-btn">
          <NuxtLink to="/krovati" class="btn btn-primary hero__btn" type="button">Перейти в каталог</NuxtLink>
          <div class="hero__contacts">
            <div class="hero__contacts-wrapper">
              <a
                  class="tg"
                  href="https://t.me/+79621690551"
                  target="_blank">
                <UIcon name="uil:telegram" class="size-9"/>
              </a>
              <a
                  class="what"
                  href="https://api.whatsapp.com/send/?phone=%2B79621690551&text&type=phone_number&app_absent=0"
                  target="_blank">
                <UIcon name="i-mingcute-whatsapp-fill" class="size-9"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <MainModal v-model="isOpen"/>
  </section>
</template>

<style scoped>
.hero-slider :deep(.swiper-pagination) {
  bottom: 20px;
}

.hero-slider :deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.5;
  width: 30px;
  height: 30px;
  margin: 0 7px;
}

.hero-slider :deep(.swiper-pagination-bullet) {
  background: #D9D9D9;
  border: 1px solid #fff;
}

.hero-slider :deep(.swiper-pagination-bullet-active) {
  background: #2496D7;
  border: 1px solid #fff;
  opacity: 1;
  transform: scale(1.1);
}
</style>