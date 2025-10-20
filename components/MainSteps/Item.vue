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
    <div class="steps__left">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
    <b>{{ item.id }}</b>
    <div/>
  </li>
</template>

<style scoped>

</style>