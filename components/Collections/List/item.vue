<script setup lang="ts">
defineProps({
  product: {
    type: Object,
    required: true
  }
})
defineEmits(['openModal'])
</script>

<template>
  <li class="relative">
    <NuxtLink v-if="product?.image"  :to="product?.url">
      <img :src="product?.image" alt="product-image">
    </NuxtLink>
    <NuxtLink v-else :to="product?.url">
      <img src="/assets/images/nophoto.jpg" alt="product-image">
    </NuxtLink>
    <NuxtLink class="btn btn-primary text-center absolute bottom-0 left-1/2 -translate-x-1/2 text-nowrap" :to="product?.url">{{ product?.title }}</NuxtLink>

  </li>
</template>

<style scoped>

</style>