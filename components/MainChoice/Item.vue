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
    <p v-html="item.title"/>
  </li>
</template>

<style scoped>

</style>