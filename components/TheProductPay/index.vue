<script setup lang="ts">

const items = ref([
  {id: 1, title: 'Безналичный расчет', icon: 'bnk.svg'},
  {id: 2, title: 'Карта любого банка', icon: 'credit.svg'},
  {id: 3, title: 'Наличными', icon: 'russian.svg'},
])

</script>

<template>
  <ul class="product__list">
    <h4>Варианты оплаты</h4>
    <li v-for="item in items" :key="item.id">
      <img :src="`/assets/images/about/${item.icon}`" alt="icon">
      <p class="text-nowrap">{{item.title}}</p>
    </li>
  </ul>
</template>