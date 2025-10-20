<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <section class="quiz">
    <div class="container quiz__container">
      <h3>НЕТ ВРЕМЕНИ ИЗУЧАТЬ КАТАЛОГ?</h3>
      <p>Ответьте на 4 вопроса, и мы подарим скидку 5% на первый заказ</p>
      <button class="btn btn-white" @click.prevent="isOpen = !isOpen">Пройди опрос</button>
    </div>
    <UModal v-model="isOpen" prevent-close class="modal" width="w-full ">
      <div class="px-6 py-10">
        <UButton
            color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 modal__close"
            @click="isOpen = false"/>
        <h3 class="modal__title">Опрос - Квиз</h3>
        <UInput class="mb-4" placeholder="Имя"/>
        <UInput class="mb-4" placeholder="Телефон"/>
        <UInput class="mb-4" placeholder="Почта"/>
        <button class="btn btn-primary">Отправить</button>
      </div>
    </UModal>
  </section>
</template>

<style scoped>

</style>