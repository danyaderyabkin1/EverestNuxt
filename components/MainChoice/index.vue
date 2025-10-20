<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: false
  },
  image: {
    type: String,
    required: true
  },
  reverse: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <section class="choice">
    <div :class="{reverse: reverse}" class=" choice__container">
      <div class="choice__wrapper">
        <h2 v-html="title"/>
        <img :src="`${image}`" alt="connect-image">
<!--        <ul class="choice__list">-->
<!--          <MainChoiceItem v-for="item in items" :key="item.id" :item="item"/>-->
<!--        </ul>-->
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>