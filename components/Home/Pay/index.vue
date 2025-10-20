<script setup lang="ts">
const payItems = ref([
  {
    id: 1,
    title: 'Отсутствие скрытых комиссий',
    description: 'Наш сотрудник озвучивает окончательную стоимость заказа. В нее уже включены затраты на составление ТЗ,  упаковка, услуги доставки.',
    icon: 'percent.svg'
  },
  {
    id: 2,
    title: 'Индивидуальный подход',
    description: 'Успешно сотрудничаем с юридическими лицами, ИП, самозанятыми и физическими лицами. Также возможны различные способы оплаты: наличными, безналичными платежами.',
    icon: 'message.svg'
  },
  {
    id: 3,
    title: 'Минимальный заказ',
    description: 'Минимальная сумма заказа, которая может пойти в обработку составляет 40 000 р.',
    icon: 'price.svg'
  }
])
</script>

<template>
  <section class="pay">
    <h3><span class="primary--border">Удобные и прозрачные</span> условия оплаты</h3>
    <div class="container pay__container">
      <ul class="pay__list">
        <li v-for="item in payItems" :key="item.id">
          <img :src="`/assets/images/home/${item.icon}`" alt="pay-icon">
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>

</style>