<script setup lang="ts">
const handleError = () => clearError({redirect: '/'})
</script>

<template>
  <TheHeader/>
  <main class="main">
    <div class="flex flex-col gap-5 items-center p-14">
      <h1 class="text-center">Упс! Страница не найдена!</h1>
      <button class="btn btn-primary" @click="handleError">На главную</button>
    </div>
  </main>
  <TheFooter/>
</template>