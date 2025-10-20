<script setup lang="ts">
const {fetchCategories} = useCategories();
const props = defineProps({
  categoryId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  customGrid: {
    type: Boolean,
    required: false
  }
})

const {data: categories} = await useAsyncData(() => fetchCategories(props.categoryId))
</script>

<template>
  <section class="category">
    <div class="container category__container">
      <h2 class="title">{{ title }}</h2>
<!--      <ul  class="category__list">-->
<!--        <li v-for="(item, i) in 8" :key="i">-->
<!--          <USkeleton class="h-60 w-full"/>-->
<!--          <USkeleton class="h-6 w-2/3"/>-->
<!--          <USkeleton class="h-8 w-1/3"/>-->
<!--        </li>-->
<!--      </ul>-->
      <ul :class="{'first--cat': customGrid}" class="category__list">
        <TheCategoryItem v-for="item in categories" :key="item?.id" :item="item" :item-link="item?.link"/>
        <TheCategoryForm/>
      </ul>
    </div>
  </section>
</template>

<style scoped>

</style>