<script setup lang="ts">
const advantagesItems = ref([
  {
    id: 1,
    title: 'Обязательная сертификация',
    description: 'Вся выпускаемая нами продукция, прошла необходимую сертификацию и соответствует требованиям “О безопасности продукции легкой промышленности” ТР ТС 017/2011',
    icon: 'eac-768x768-optimized.webp'
  },
  {
    id: 2,
    title: 'Брендирование товара',
    description: 'Разместим логотип клиента на любом гостиничном текстиле: халатах, постельном белье, полотенцах и многом другом. Доступно брендирование на таких тканях, как махра, а также выполнение жаккардовых бирок с логотипом.',
    icon: 'picpod.webp'
  },
  {
    id: 3,
    title: 'Индивидуальный пошив',
    description: 'В наличии имеется широкий ассортимент отельных тканей: более 70 видов. Полный же каталог OTELLICA включает более 2000 позиций.',
    icon: 'ind3-768x768-optimized.webp'
  },
  {
    id: 4,
    title: 'Изготовление по индивидуальным размерам',
    description: 'Изготовим мебельные конструкции под требования и параметры вашего объекта.',
    icon: 'pr3-768x768-optimized.webp'
  }
])
</script>

<template>
  <section class="advantages mb-12">
    <div class="container advantages__container">
      <h3>Наше <span class="primary--border">производство</span></h3>
      <ul class="advantages__list">
        <li v-for="item in advantagesItems" :key="item.id">
          <div class="advantages__wrap">
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </div>
          <img :src="`/assets/images/home/${item.icon}`" alt="advantages-img">
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>

</style>