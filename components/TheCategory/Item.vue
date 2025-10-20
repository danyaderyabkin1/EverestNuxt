<script setup lang="ts">
defineProps({
  item: {
    type: Object
  },
  itemLink: {
    type: String
  }
})
</script>

<template>
  <li>
    <NuxtLink class="category__link" :to="item?.url">
      <img v-if="item?.id !== 11" :src="item?.preview_image" alt="cat-image">
      <img v-else src="/assets/images/image.jpg" alt="cat-image">
      <h3 class="btn btn-primary text-nowrap">{{ item?.subTitle }}</h3>
    </NuxtLink>
  </li>
</template>

<style scoped>

</style>