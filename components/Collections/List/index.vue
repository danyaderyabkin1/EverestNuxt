<script setup lang="ts">
const props = defineProps({
  gridFour: {
    type: Boolean,
    required: false
  },
  categoryId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
  }
})
const {fetchProducts} = useProducts();
const {data: products, status} = await useAsyncData(() => fetchProducts(props.categoryId));
</script>

<template>
  <section :class="{'gray--bg': title}" class="products">
    <div class="container products__container ">
      <h2 class="text-center font-semibold" v-if="title">{{title}}</h2>
      <ul v-if="status == 'pending'" :class="{'four-columns': gridFour}" class="products__list load collection">
        <li v-for="(item, i) in 3" :key="i">
          <USkeleton class="h-60 w-full mb-0"/>
        </li>
      </ul>
      <ul v-else class="products__list collection">
        <CollectionsListItem v-for="product in products" :key="product?.id" :product="product"/>
      </ul>
    </div>
  </section>
</template>

<style scoped>

</style>