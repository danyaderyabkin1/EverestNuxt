<script setup lang="ts">
const controlItems = ref([
  {
    id: 1,
    description: 'Наш сотрудник озвучивает окончательную стоимость заказа. В нее уже включены затраты на составление ТЗ,  упаковка, услуги доставки.',
    icon: 'Mask-group-5-optimized.webp'
  },
  {
    id: 2,
    description: 'Проверка соблюдения технических требований и стандартов на каждом этапе производства.',
    icon: 'Mask-group-6-optimized.webp'
  },
  {
    id: 3,
    description: 'Оценка качества выпускаемой продукции в процессе ее производства.',
    icon: 'Mask-group-7-optimized.webp'
  },
  {
    id: 4,
    description: 'Проведение испытаний и контроля готовой продукции на соответствие требованиям и стандартам..',
    icon: 'Mask-group-8-optimized.webp'
  },
  {
    id: 5,
    description: 'Оценка качества готовой продукции перед ее отгрузкой и реализацией.',
    icon: 'Mask-group-9-optimized.webp'
  }
])
</script>

<template>
  <li v-for="(item, index) in controlItems" :key="index">
    <div>{{item.id}}</div>
    <p>{{ item.description }}</p>
  </li>
</template>

<style scoped>

</style>