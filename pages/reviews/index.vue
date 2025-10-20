<script setup lang="ts">
</script>

<template>
  <main class="main">
    <section class="description">
      <h1 class="page-title mb-4">Отзывы о нас</h1>
      <UBreadcrumb
          class="mb-8 font-light text-gray-300 flex justify-center custom-breadcrumb"
          divider="-"
          :ui="{
                label: 'text-gray-500 font-light',
                separator: 'text-gray-300',
                separatorIcon: 'text-gray-500',
                list: 'text-gray-500',
                link: 'text-gray-300'
            }"
          :links="[{ label: 'Главная', to: '/' }, {label: 'Отзывы'}]"
      />
    </section>
  </main>
</template>
