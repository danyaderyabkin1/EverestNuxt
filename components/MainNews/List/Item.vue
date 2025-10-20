<script setup lang="ts">
const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const date = computed(() => {
  if (!props.article) return null;

  // Разбиваем строку на части
  const [datePart] = props.article.active_after.split(' ');
  const [day, month, year] = datePart.split('.');

  // Создаем дату из полученных частей (месяц - 1, так как в JS месяцы 0-11)
  const date = new Date(year, month - 1, day);

  // Форматируем дату
  return `${date.toLocaleString('ru-RU', { month: 'long' })} ${year}`;
});
</script>

<template>
  <li>
    <NuxtLink v-if="article?.preview_image" :to="article?.url">
      <img
          :src="article?.preview_image"
          alt="article">
    </NuxtLink>
    <NuxtLink v-else :to="article?.url">
      <img src="/assets/images/nophoto.jpg" alt="nophoto">
    </NuxtLink>
    <NuxtLink class="news__link" :to="article?.url">{{article?.title}}</NuxtLink>
    <span class="position-absolute">{{ date }}</span>
  </li>
</template>

<style scoped>

</style>