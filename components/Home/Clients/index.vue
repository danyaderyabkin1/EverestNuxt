<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})
const modal = ref(false)
const itemsClients = ref([
  {
    id: 1,
    img: '007d6f264d28a5922d79fe7620cfbbe06103c304.png',
    link: '#'
  },
  {
    id: 2,
    img: '9a035c724468180b501268cd1ec7df96a20e8238.png',
    link: '#'
  },
  {
    id: 3,
    img: '874cd05bd1cc408aa96b2371a8a6cdb5783c6c1d.png',
    link: '#'
  },
  {
    id: 4,
    img: '6691fc33c4fc96b62a726c00054f5e64cb2c64d4.png',
    link: '#'
  },
  {
    id: 5,
    img: 'a2af3b9871a8aa3920c7057986be7c2fe970197a.png',
    link: '#'
  },
  {
    id: 6,
    img: 'aa168670fe0199893e8fb974a46f6856a0a5cfdd.png',
    link: '#'
  }
])
</script>

<template>
  <section class="clients" id="clients">
    <UModal v-model="modal" fullscreen class="modal">
      <div class="px-6 py-10">
        <UButton
            color="gray"
            variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 modal__close"
            @click.prevent="modal = false"/>
        <h3 class="modal__title">{{ title }}</h3>
        <ul class="clients__list md">
          <HomeClientsItem v-for="item in itemsClients" :key="item.id" :item="item"/>
        </ul>
      </div>
    </UModal>
    <div class="container">
      <h2 class="title">{{ title }}</h2>
      <ul class="clients__list">
        <HomeClientsItem v-for="item in items" :key="item.id" :item="item"/>
      </ul>
      <button class="btn btn-primary mx-auto" @click.prevent="modal = true">Смотреть все</button>
    </div>
  </section>
</template>

<style scoped>

</style>