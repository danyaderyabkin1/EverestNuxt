<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  leftWrap: {
    type: Object,
    required: true
  },
  rightWrap: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="services">
    <div class="container services__container">
      <h2 class="services__title" v-html="title"></h2>
      <div class="services__wrap">
        <p class="services__description">Предлагаем комплексные решения под ваши параметры.</p>
        <ul class="services__list">
          <li class="services__item">
            <NuxtLink :to="leftWrap.link">
              <img class="services__img" :src="`/assets/images/home/${leftWrap.image}`" alt="services">
            </NuxtLink>
            <NuxtLink class="services__link" :to="leftWrap.link">{{ leftWrap.title }}</NuxtLink>
          </li>
          <li class="services__item">
            <NuxtLink :to="rightWrap.link">
              <img class="services__img" :src="`/assets/images/home/${rightWrap.image}`" alt="services">
            </NuxtLink>
            <NuxtLink class="services__link" :to="rightWrap.link">{{ rightWrap.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>