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
    <img :src="`/assets/images/colors/${item.img}`" alt="color-img">
    <p>{{ item.title }}</p>
  </li>
</template>

<style scoped>

</style>