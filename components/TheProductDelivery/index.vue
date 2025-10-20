<script setup lang="ts">

const items = ref([
  {id: 1, title: 'Транспортная компания', icon: 'delivery.svg'},
  {id: 2, title: 'Самовывоз со склада', icon: 'wrhs.svg'},
  {id: 3, title: 'Доставка силами Отелика', icon: 'Vector.svg'},
])

</script>

<template>
  <ul class="product__list">
    <h4>Способы доставки</h4>
    <li v-for="item in items" :key="item.id">
      <img :src="`/assets/images/product/${item.icon}`" alt="icon">
      <p class="text-nowrap">{{item.title}}</p>
    </li>
  </ul>
</template>