<script setup lang="ts">
const props = defineProps({
  categories: Array,
  visibleMenu: Boolean,
})

const activeCategoryId = ref<number | null>(null) // Храним ID открытой категории

const toggleSubMenu = (id: number) => {
  activeCategoryId.value = activeCategoryId.value === id ? null : id // Закрываем, если уже открыто
}
</script>

<template>
  <ul :class="{hidden: !visibleMenu}" class="nav__list mobile">
    <li v-for="category in categories" :key="category?.id" class="nav__item">
      <NuxtLink
          v-if="category?.id !== 13"
          class="nav__link drop"
          @click.prevent="toggleSubMenu(category?.id)">
        {{ category?.title }}
        <UIcon name="lucide:chevron-down" class="size-5"/>
      </NuxtLink>
      <NuxtLink v-else :to="category?.url" class="nav__link drop">
        {{ category?.title }}
        <UIcon name="lucide:chevron-down" class="size-5 invisible"/>
      </NuxtLink>

      <TheHeaderMobileSub
          :visible="activeCategoryId === category?.id"
          :sub-categories="category?.subCategories"
      />
    </li>
    <li class="nav__item">
      <NuxtLink class="nav__link" to="/aboutus">О нас <UIcon name="lucide:chevron-down" class="size-5 invisible"/></NuxtLink>
    </li>
  </ul>
</template>