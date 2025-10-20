<script setup lang="ts">
const isOpen = ref(false)
const {fetchProduct} = useProduct()
const route = useRoute()
const cleanPath = route.path.startsWith('/') ? route.path.slice(1) : route.path

const {data: product} = await useAsyncData(() => fetchProduct(cleanPath))

const config = useRuntimeConfig()
const canonicalUrl = `${config.public.siteUrl || 'https://otellica.ru'}${route.path}`

const productOpacity = computed(() => {
  // Ищем поле с field_title = "notInStock"
  const notInStockField = product.value?.fields?.find(
      field => field.field_title === "notInStock"
  );

  // Если поле найдено и оно имеет какое-то значение, возвращаем true
  // Можно настроить логику в зависимости от значения field_value если нужно
  return !!notInStockField;
});

// Добавляем мета-теги и каноническую ссылку
useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ]
})

useSeoMeta({
  title: product.value?.meta_title ? product.value?.meta_title : product.value.title,
  ogTitle: product.value?.meta_title ? product.value?.meta_title : product.value.title,
  description: product.value?.meta_description ? product.value?.meta_description : product.value.title,
  ogDescription: product.value?.meta_description ? product.value?.meta_description : product.value.title,
  ogImage: 'https://otellica.ru/assets/images/logo.webp',
})
if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Страница не найдена!'
  })
}
const cleanText = (html:string) => html.replace(/<[^>]*>/g, '')
</script>

<template>
  <main class="main">
    <section class="product">
      <div class="container product__container">
        <UBreadcrumb
            class="mb-8"
            divider="/"
            :links="[{ label: 'Главная', to: '/' }, {label: 'Текстиль', to: '/krovati'}, { label: cleanText(product?.preview_content) }]"
        />
        <div class="product__wrap">
          <div class="product__wrap-img">
            <a :href="product?.image" data-fancybox="gallery">
              <img :src="product?.image" :alt="product?.preview_content" draggable="false">
            </a>
            <ul v-if="product?.gallery.length > 1" class="product__wrap-gallery">
              <li v-for="image in product?.gallery">
                <a :href="image" data-fancybox="gallery">
                  <img :src="image" :alt="image" draggable="false">
                </a>
              </li>
            </ul>
          </div>
          <div class="flex-1">
            <h1>{{cleanText(product?.preview_content)  }}</h1>
            <div v-if="product?.features.length" class="product__attributes">
              <p v-for="(product, i) in  product?.features" :key="i">{{product?.title}}: {{product?.description}} </p>
            </div>
            <strong>Цена: <span v-for="sku in product?.sku" :key="sku.id">{{ sku.price }} ₽</span></strong>
            <div v-if="!productOpacity" class="product__btns">
              <button class="btn btn-primary" @click.prevent="isOpen = !isOpen">Получить каталог</button>
              <button class="btn flex gap-2 items-center btn-transparent" @click.prevent="isOpen = !isOpen">
                <svg class="reverse" width="26" height="40" viewBox="0 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 0.778503L0.109375 13.6691V13.8309V39.2215H25.8906V13.6691L13 0.778503ZM13 1.88324L25.1094 13.9926V38.4402H0.890625V13.9926L13 1.88324Z" fill="currentColor"/>
                  <path d="M9.875 19.6902C7.938 19.6902 6.35938 21.2689 6.35938 23.2059C6.35938 25.1429 7.938 26.7215 9.875 26.7215C11.812 26.7215 13.3906 25.1429 13.3906 23.2059C13.3906 21.2689 11.812 19.6902 9.875 19.6902ZM9.875 20.4715C11.3898 20.4715 12.6094 21.6911 12.6094 23.2059C12.6094 24.7207 11.3898 25.9402 9.875 25.9402C8.36022 25.9402 7.14062 24.7207 7.14062 23.2059C7.14062 21.6911 8.36022 20.4715 9.875 20.4715Z" fill="#EBD300"/>
                  <path d="M16.125 25.9402C14.188 25.9402 12.6094 27.5189 12.6094 29.4559C12.6094 31.3929 14.188 32.9715 16.125 32.9715C18.062 32.9715 19.6406 31.3929 19.6406 29.4559C19.6406 27.5189 18.062 25.9402 16.125 25.9402ZM16.125 26.7215C17.6398 26.7215 18.8594 27.9411 18.8594 29.4559C18.8594 30.9707 17.6398 32.1902 16.125 32.1902C14.6102 32.1902 13.3906 30.9707 13.3906 29.4559C13.3906 27.9411 14.6102 26.7215 16.125 26.7215Z" fill="currentColor"/>
                  <path d="M18.9736 19.8047L6.47363 32.3047L7.026 32.8571L19.526 20.3571L18.9736 19.8047Z" fill="currentColor"/>
                  <path d="M1.67188 31.0184V37.659H8.3125V36.8777H2.45312V31.0184H1.67188Z" fill="currentColor"/>
                  <path d="M13 4.06525C12.3574 4.06525 11.8281 4.59454 11.8281 5.23712C11.8281 5.8797 12.3574 6.409 13 6.409C13.6426 6.409 14.1719 5.8797 14.1719 5.23712C14.1719 4.59454 13.6426 4.06525 13 4.06525ZM13 4.8465C13.2204 4.8465 13.3906 5.01676 13.3906 5.23712C13.3906 5.45748 13.2204 5.62775 13 5.62775C12.7796 5.62775 12.6094 5.45748 12.6094 5.23712C12.6094 5.01676 12.7796 4.8465 13 4.8465Z" fill="currentColor"/>
                </svg>
                <span class="primary--border">получить скидку</span></button>
            </div>
            <div class="flex flex-col flex-wrap lg:flex-row gap-5 mb-5 lg:mb-0">
              <TheProductDelivery/>
              <TheProductPay/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="product?.content" class="container product__container">
        <h3>Описание</h3>
        <div v-html="product?.content"></div>
      </div>
      <UModal v-model="isOpen"
              :ui="{ container: 'items-start pt-14 bg-white sm:bg-gray-50/50', shadow: 'shadow-none sm:shadow-lg', padding: 'p-0 sm:p-0', rounded: 'rounded-none sm:rounded-lg' }"
              prevent-close
              class="modal">
        <div class="px-6 py-10">
          <UButton
              color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 modal__close"
              @click="isOpen = false"/>
          <TheModalForm :form-id="38" title="Оптовая цена"/>
        </div>
      </UModal>
    </section>
    <MainNewsList :bg="true"/>
  </main>
</template>

<style scoped>

</style>