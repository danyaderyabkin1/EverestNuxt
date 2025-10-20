<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue'
import {Autoplay, EffectFade, Pagination} from 'swiper/modules'

const isOpen = ref(false)

// Данные для слайдов
const slides = [
  {
    title: 'Подберите для себя самую удобную кровать и получите скидку 5%',
    image: '/assets/images/banners/3c4e0cb1e4e98f184f8172195d278e4adc1cf612.png',
    mobileImage: '/assets/images/banners/3c4e0cb1e4e98f184f8172195d278e4adc1cf612.png', // можно указать другое изображение для мобильных
    icon: '/assets/images/description/sale-percent_svgrepo.com.svg',
    link: '/krovati',
    linkText: 'Смотреть кровати'
  },
  {
    title: 'Определите свой идеальный матрас и получите скидку 5%',
    image: '/assets/images/banners/81efa04c71585a647955f76330e17bfd0ce52af9.webp',
    mobileImage: '/assets/images/banners/81efa04c71585a647955f76330e17bfd0ce52af9.webp',
    icon: '/assets/images/description/sale-percent_svgrepo.com.svg',
    link: '/matrasy',
    linkText: 'Смотреть матрасы'
  }
]

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
  <section class="hero bg-[#F3F3F31A]">
    <div class="container">
      <div class="hero-slider">
        <Swiper
            v-bind="swiperOptions"
            class="main-swiper"
            :effect="'fade'"
            :fadeEffect="{crossFade: true}"

        >
          <SwiperSlide v-for="(slide, index) in slides" :key="index">
            <div class="slide-wrapper">
              <!-- Фон слайда (изображение) -->
              <div class="slide-background">
                <picture>
                  <source
                      media="(max-width: 768px)"
                      :srcset="slide.mobileImage || slide.image"
                  >
                  <img
                      :src="slide.image"
                      :alt="`Banner image ${index + 1}`"
                  >
                </picture>
              </div>

              <!-- Контент слайда -->
              <div class="hero__container swp">
                <div class="hero__wrapper swp">
                  <img
                      class="slide-icon"
                      :src="slide.icon"
                      :alt="`Icon ${index + 1}`"
                  >
                  <h2 class="hero__title">
                    {{ slide.title }}
                  </h2>
                </div>

                <!-- Кнопка с ссылкой для текущего слайда -->
                <NuxtLink
                    :to="slide.link"
                    class="btn btn-primary"
                >
                  Подобрать
                </NuxtLink>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

    <MainModal v-model="isOpen"/>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  justify-content: center;
  height: 73vh;
  position: relative;
  background-color: #F3F3F31A;
  padding: 3.5rem 3rem;
  max-height: 825px;
}

/* Десктоп версия */
.btn-primary {
  border-radius: 10px;
  font-size: 22px;
  margin-left: auto;
  display: flex;
  padding: 12px 24px;
}

.hero-slider :deep(.swiper-pagination) {
  bottom: 20px;
}

.hero-slider :deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.5;
  width: 30px;
  height: 30px;
  margin: 0 7px;
  transition: all 0.3s ease;
}

.hero-slider :deep(.swiper-pagination-bullet) {
  background: #ccc;
  border: 1px solid #fff;
}

.hero-slider :deep(.swiper-pagination-bullet-active) {
  background: #2496D7;
  border: 1px solid #fff;
  opacity: 1;
  transform: scale(1.1);
}

/* Стили для основного слайдера */
.main-swiper {
  width: 100%;
  height: 100%;
}

.slide-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.slide-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 60px;
  filter: opacity(.7);
}

.slide-icon {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  margin-bottom: 1rem;
}


/* Планшетная версия (768px - 1024px) */
@media (max-width: 1024px) {
  .hero {
    height: 60vh;
    padding: 1rem 2rem;
    max-height: 600px;
  }


  .slide-icon {
    width: 5rem;
    height: 5rem;
  }

  .btn-primary {
    font-size: 18px;
    padding: 10px 20px;
  }

  .slide-background img {
    border-radius: 40px;
  }

  .hero__container {
    gap: 2rem;
  }
}

/* Мобильная версия (до 768px) */
@media (max-width: 768px) {
  .hero {
    height: 50vh;
    min-height: 400px;
    padding: 0.5rem 1rem;
    max-height: 500px;
  }


  .slide-icon {
    width: 4rem;
    height: 4rem;
    margin: 0 auto 0.5rem auto;
  }

  .btn-primary {
    font-size: 16px;
    padding: 8px 16px;
    margin: 0 auto;
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }

  .slide-background img {
    border-radius: 20px;
    filter: opacity(.5);
  }

  .hero__container {
    gap: 1.5rem;
    align-items: center;
    text-align: center;
  }

  .hero__wrapper {
    align-items: center;
    gap: 8px;
    max-width: 320px;
  }

  .hero-slider :deep(.swiper-pagination) {
    bottom: 15px;
  }

  .hero-slider :deep(.swiper-pagination-bullet) {
    width: 20px;
    height: 20px;
    margin: 0 5px;
  }
}

/* Маленькие мобильные (до 480px) */
@media (max-width: 480px) {
  .hero {
    height: 45vh;
    min-height: 350px;
    padding: 1.25rem 0.5rem;
  }


  .slide-icon {
    width: 3rem;
    height: 3rem;
  }

  .btn-primary {
    font-size: 14px;
    padding: 6px 12px;
  }

  .hero__container {
    gap: 1rem;
  }

  .hero__wrapper {
    gap: 6px;
  }

  .hero-slider :deep(.swiper-pagination) {
    bottom: 10px;
  }

  .hero-slider :deep(.swiper-pagination-bullet) {
    width: 16px;
    height: 16px;
    margin: 0 4px;
  }
}

/* Очень большие экраны */
@media (min-width: 1440px) {
  .hero {
    height: 80vh;
    max-height: 900px;
  }

  .slide-icon {
    width: 7rem;
    height: 7rem;
  }
}
</style>