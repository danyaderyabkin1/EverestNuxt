<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <li>
    <NuxtLink :to="item.link" target="_blank">
      <img :src="`/assets/images/clients/${item.img}`" alt="client-img">
    </NuxtLink>
  </li>
</template>

<style scoped>

</style>