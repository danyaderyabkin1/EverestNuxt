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
    img: 'big-logo-400x401.webp',
    link: 'https://malamut-land.ru/'
  },
  {
    id: 2,
    img: '6568454.webp',
    link: 'https://berejkihall.ru/'
  },
  {
    id: 3,
    img: 'hMw1vPZugEFRQVErdYn7RQursDW6tIJe6cemmZairdPPKvbOpQB0GceuF1avpxPClcf_6NntlnsgFQls8UVbce0v.webp',
    link: 'https://vk.com/ax_alta'
  },
  {
    id: 4,
    img: 'logo.svg',
    link: 'https://imera.ru/'
  },
  {
    id: 5,
    img: 'logo_utes.svg',
    link: 'https://uteshotel.com/aktsii/'
  },
  {
    id: 6,
    img: '_logo_vector_2_RGB_b.svg',
    link: 'https://chigish.ru/'
  },
  {
    id: 7,
    img: 'Frame.png',
    link: 'https://freedome.pro/'
  },
  {
    id: 8,
    img: 'east.png',
    link: 'https://www.termy40.ru/'
  },
  {
    id: 9,
    img: 'viz.png',
    link: 'https://hotel-vizavi.ru/'
  },
  {
    id: 10,
    img: 'sil.png',
    link: 'https://silf-hotel.ru/'
  },
  {
    id: 11,
    img: 'kav.png',
    link: 'https://apartkavkaz.ru/'
  },
  {
    id: 12,
    img: 'xxh.jpg',
    link: 'https://dzen.ru/suite/841668d6-5e98-40f5-a552-9365ae26aaf9'
  },
  {
    id: 13,
    img: 'vol.png',
    link: 'https://www.volga-hotel.ru/'
  },
  {
    id: 14,
    img: 'dream.png',
    link: 'https://dreamhostel89.ru/'
  },
  {
    id: 15,
    img: 'new_volga_white.png',
    link: 'https://nvapart.ru/'
  },
  {
    id: 16,
    img: 'VERONA.png',
    link: 'https://veronahotel-kras.ru/'
  },
  {
    id: 17,
    img: 'eng.png',
    link: 'https://enjoyhotelspb.ru/'
  },
  {
    id: 18,
    img: 'lf.png',
    link: 'https://lifeinn.ru/'
  },
  {
    id: 19,
    img: 'alv.png',
    link: 'https://alva-donna.ru/'
  },
  {
    id: 20,
    img: 'pl.png',
    link: 'https://the-pole.ru/#main'
  },
  {
    id: 21,
    img: 'el.jpg',
    link: 'https://vk.com/elkinagorke10'
  },
  {
    id: 22,
    img: 'aur.svg',
    link: 'https://aura-orenburg.ru/'
  },
  {
    id: 23,
    img: 'les.png',
    link: 'https://lesnoyparkhotel.ru/'
  },
  {
    id: 24,
    img: 'ost.png',
    link: 'https://glampingostrov.ru/'
  },
  {
    id: 25,
    img: 'gtr.png',
    link: 'https://lybhutor.ru/restoran'
  },
  {
    id: 26,
    img: 'lss.jpg',
    link: 'https://vk.com/leslastochka'
  },
  {
    id: 27,
    img: 'ascu.webp',
    link: 'https://tundrahotel.ru/'
  },
  {
    id: 28,
    img: 'aq.png',
    link: 'https://aquatermo01.ru/'
  },
  {
    id: 29,
    img: 'SH.png',
    link: 'https://hotel-ples.ru/'
  }
])
</script>

<template>
  <section class="clients">
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