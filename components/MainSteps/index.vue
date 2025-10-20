<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  bgColor: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <section :class="{gray: bgColor}" class="steps">
    <div class="container steps__container">
      <h2 class="title">{{ title }}</h2>
      <ul class="steps__list">
        <MainStepsItem v-for="item in items" :key="item.id" :item="item"/>
      </ul>
    </div>
  </section>
</template>

<style scoped>

</style>