<script setup lang="ts">
const isOpen = ref(false)
const {fetchProduct} = useProduct()
const route = useRoute()
const cleanPath = route.path.startsWith('/') ? route.path.slice(1) : route.path

const {data: product} = await useAsyncData(() => fetchProduct(cleanPath))

// Выбранные опции - теперь храним объект с groupId и выбранным sku.id
const selectedOptions = ref<Record<string, number>>({})

// Функция для группировки SKU по description
const groupedSku = computed(() => {
  if (!product.value?.sku) return []

  const groups = {}

  product.value.sku.forEach(item => {
    const groupName = item.description || 'Без категории'
    if (!groups[groupName]) {
      groups[groupName] = []
    }
    groups[groupName].push(item)
  })

  return Object.entries(groups).map(([title, items]) => ({
    title,
    items
  }))
})

// Базовая цена (первый элемент с description "Размер")
const basePrice = computed(() => {
  const sizeGroup = groupedSku.value.find(group => group.title === 'Размер')
  return sizeGroup?.items[0]?.price || product.value?.sku[0]?.price || 0
})

// ID базовой опции (первый размер)
const baseOptionId = computed(() => {
  const sizeGroup = groupedSku.value.find(group => group.title === 'Размер')
  return sizeGroup?.items[0]?.id
})

// Итоговая цена с учетом выбранных опций
const totalPrice = computed(() => {
  let total = 0

  // Проходим по всем группам и добавляем цену выбранной опции
  groupedSku.value.forEach(group => {
    const selectedOptionId = selectedOptions.value[group.title]
    if (selectedOptionId) {
      const selectedSku = group.items.find(item => item.id === selectedOptionId)
      if (selectedSku) {
        // Используем цену со скидкой если есть, иначе обычную цену
        const price = selectedSku.is_discount_enabled && selectedSku.discount_price !== null
            ? selectedSku.discount_price
            : selectedSku.price
        total += price
      }
    } else {
      // Если в группе ничего не выбрано, добавляем цену только для РАЗМЕРА по умолчанию
      if (group.title === 'Размер' && group.items.length > 0) {
        const defaultSku = group.items[0]
        const price = defaultSku.is_discount_enabled && defaultSku.discount_price !== null
            ? defaultSku.discount_price
            : defaultSku.price
        total += price
      }
      // Для остальных групп (Цвет, Матрас) не добавляем цену, если не выбрано
    }
  })

  return total
})

// Функция для выбора опции
const selectOption = (groupId: string, sku: any) => {
  // Если уже выбрана эта же опция - снимаем выбор (кроме группы "Размер")
  if (selectedOptions.value[groupId] === sku.id) {
    if (groupId !== 'Размер') {
      selectedOptions.value[groupId] = null
    }
    return
  }

  // Выбираем новую опцию (заменяем старую в этой группе)
  selectedOptions.value[groupId] = sku.id
}

// Проверка, выбрана ли опция
const isOptionSelected = (groupId: string, sku: any) => {
  // Если в группе есть выбранная опция - проверяем по ID
  if (selectedOptions.value[groupId]) {
    return selectedOptions.value[groupId] === sku.id
  }

  // Если в группе нет выбранной опции, для РАЗМЕРА выбираем первую по умолчанию
  if (groupId === 'Размер' && !selectedOptions.value[groupId]) {
    const sizeGroup = groupedSku.value.find(group => group.title === 'Размер')
    return sizeGroup?.items[0]?.id === sku.id
  }

  // Для всех остальных групп по умолчанию ничего не выбрано
  return false
}

// Оригинальная цена без учета скидок
const originalTotalPrice = computed(() => {
  let total = 0

  groupedSku.value.forEach(group => {
    const selectedOptionId = selectedOptions.value[group.title]
    if (selectedOptionId) {
      const selectedSku = group.items.find(item => item.id === selectedOptionId)
      if (selectedSku) {
        total += selectedSku.price
      }
    } else {
      if (group.title === 'Размер' && group.items.length > 0) {
        total += group.items[0].price
      }
    }
  })

  return total
})

// Проверяем, есть ли скидка на выбранных опциях
const hasDiscountOnSelectedOptions = computed(() => {
  return totalPrice.value < originalTotalPrice.value
})


// Инициализируем выбранные опции при загрузке
watch(groupedSku, (newGroups) => {
  if (newGroups.length > 0) {
    // Устанавливаем первую опцию по умолчанию ТОЛЬКО для группы "Размер"
    newGroups.forEach(group => {
      if (group.title === 'Размер' && group.items.length > 0 && !selectedOptions.value[group.title]) {
        selectedOptions.value[group.title] = group.items[0].id
      }
    })
  }
}, { immediate: true })

const config = useRuntimeConfig()
const canonicalUrl = `${config.public.siteUrl}${route.path}`

const productOpacity = computed(() => {
  const notInStockField = product.value?.fields?.find(
      field => field.field_title === "notInStock"
  );
  return !!notInStockField;
});

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
  // ogImage: 'https://otellica.ru/assets/images/logo.webp',
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
        <h1>{{product?.title}}</h1>
        <UBreadcrumb
            class="mb-8 text-gray-300 flex custom-breadcrumb"
            divider="-"
            :ui="{
                    label: 'text-gray-500 font-light',
                    separator: 'text-gray-300',
                    separatorIcon: 'text-gray-500',
                    list: 'text-gray-500',
                    link: 'text-gray-300'
                }"
            :links="[{ label: 'Главная', to: '/' }, {label: 'Кровати', to: '/krovati'}, { label: cleanText(product?.title) }]"
        />
        <div class="product__wrap">
          <div class="product__wrap-img">
            <a :href="product?.image" data-fancybox="gallery">
              <img :src="product?.image" :alt="product?.preview_content" draggable="false">
            </a>
            <ul v-if="product?.gallery.length > 1" class="product__wrap-gallery">
              <li v-for="image in product?.gallery" :key="image">
                <a :href="image" data-fancybox="gallery">
                  <img :src="image" :alt="image" draggable="false">
                </a>
              </li>
            </ul>
          </div>
          <div class="flex-1">
            <h2>{{product?.title}}</h2>

            <div class="flex items-start gap-24">
              <div class="price-container">
                <strong class="flex items-center gap-2">
                  <!-- Показываем старую цену если есть скидка на выбранных опциях -->
                  <span
                      v-if="hasDiscountOnSelectedOptions"
                      class="text-lg text-gray-500 line-through"
                  >
                    {{ originalTotalPrice }} ₽
                  </span>
                  <span class="text-2xl">{{ totalPrice }} ₽</span>

                </strong>
              </div>
              <div class="product__btns">
                <button class="btn btn-primary" @click.prevent="isOpen = !isOpen">Заказать</button>
              </div>
            </div>

            <div v-if="groupedSku.length" class="sku-groups">
              <div v-for="group in groupedSku" :key="group.title" class="sku-group">
                <strong class="sku-group__title">{{ group.title }}</strong>
                <div class="sku-group__items flex">
                  <button
                      v-for="sku in group.items"
                      :key="sku.id"
                      class="sku-item bg-gray-100"
                      :class="{ 'sku-item--selected': isOptionSelected(group.title, sku) }"
                      @click="selectOption(group.title, sku)"
                      type="button"
                  >
                    <span class="sku-title">{{ sku.title }}</span>
<!--                    <span v-if="sku.price > 0" class="sku-price">+{{ sku.price }} ₽</span>-->
                  </button>
                </div>
              </div>
            </div>

            <div v-if="product?.features.length" class="product__attributes">
              <p v-for="(product, i) in  product?.features" :key="i">{{product?.title}}: {{product?.description}} </p>
            </div>
            <a v-if="product?.video_url" href="#video" class="flex w-fit py-2 px-8 rounded-lg font-semibold bg-[#D0B6A7] text-white">Инструкция по сборке</a>
          </div>
        </div>
      </div>
      <div v-if="product?.content" class="container product__container">
        <div v-html="product?.content"></div>
      </div>
<!--      <ProductDescription/>-->

      <UModal v-model="isOpen"
              :ui="{ container: 'items-start pt-14 bg-white sm:bg-gray-50/50', shadow: 'shadow-none sm:shadow-lg', padding: 'p-0 sm:p-0', rounded: 'rounded-none sm:rounded-lg' }"
              prevent-close
              class="modal">
        <div class="px-6 py-10">
          <UButton
              color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 modal__close"
              @click="isOpen = false"/>
          <TheModalForm :form-id="38" title="Сделать заказ"/>
        </div>
      </UModal>
    </section>
    <section v-if="product?.video_url" id="video" class="video">
      <div class="container max-w-5xl">
        <h3 class="text-center text-3xl mb-6">Видеоинструкция по сборке</h3>
        <p class="mb-0 w-100 position-relative" v-html="product?.video_url"></p>
      </div>
    </section>
    <MainForm/>
  </main>
</template>

<style scoped>
.sku-groups {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 2rem 0;
}

.sku-group__title {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
}

.sku-group__items {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.sku-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid #F3F3F3;
  background-color: #F3F3F3;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 60px;
}

.sku-item:hover {
  border-color: #c5c5c5;
  background: #f9f9f9;
}

.sku-item--selected {
  border-color: #D0B6A7;
  background: #f8f3f0;
}

.sku-title {
  font-size: 14px;
  white-space: nowrap;
}

.sku-price {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  margin-left: 8px;
}

.sku-item--selected .sku-price {
  color: #D0B6A7;
}


.description-box, .bed-info, .dimensions {
  margin-bottom: 20px;
  padding: 35px;
  border-radius: 60px 60px 0 0;
}

.bedroom-img {
  border-radius: 60px;
}

h2, h3 {
  color: #333;
}


.image-section img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 20px;
}

.dimensions p {
  margin: 5px 0;
}
</style>