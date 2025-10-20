<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  gridFour: {
    type: Boolean,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="edge gray-bg">
    <div class="container edge__container">
      <div class="edge__wrapper">
        <h2 class="edge__title primary--border w-fit mx-auto">{{ title }}</h2>
<!--        <strong>{{ description }}</strong>-->
      </div>
      <img v-if="image" :src="`/assets/images/edge/${image}`" alt="connect-image">
    </div>
    <div class="container edge__container">
      <ul :class="{'four-columns': gridFour}" class="edge__list">
        <MainEdgeItem v-for="item in items" :key="item.id" :item="item"/>
      </ul>
    </div>
  </section>
</template>

<style scoped>

</style>