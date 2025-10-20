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
    <div class="edge__img">
      <img src="/assets/images/edge/check-svgrepo.svg" alt="check-svgrepo" />
    </div>
    <div>
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </li>
</template>

<style scoped>

</style>