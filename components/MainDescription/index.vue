<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  listItems: {
    type: Array,
    required: true
  }
})

</script>

<template>
  <section class="description">
    <div class="container description__container">
      <h2 class="title mt-4 mb-8 md:mt-8 md:mb-16">{{ title }}</h2>
      <ul class="description__list">
        <li class="description__item" v-for="item in listItems" :key="item?.id">
          <div class="description__item-icon">
            <img :src="`/assets/images/description/${item.image}`" alt="icon">
          </div>
          <div>
            <h3>{{ item?.title }}</h3>
            <p>{{ item?.description }}</p>
          </div>
        </li>
      </ul>
      <div class="w-full md:flex md:w-2/5 flex flex-col mx-auto my-12 md:my-20">
        <p class="primary--border text-center mb-3"></p>
        <h2 class="text-center font-semibold">Выбирая нас, вы делаете шаг к созданию комфортного
          и
          привлекательного пространства для ваших гостей, что положительно скажется на их впечатлениях и,
          соответственно, на вашем бизнесе.</h2>
      </div>
    </div>

  </section>
</template>

<style scoped>

</style>