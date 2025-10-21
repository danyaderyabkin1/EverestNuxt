<script setup lang="ts">
const isOpen = ref(false)
const {fetchProduct} = useProduct()
const route = useRoute()
const cleanPath = route.path.startsWith('/') ? route.path.slice(1) : route.path

const {data: product} = await useAsyncData(() => fetchProduct(cleanPath))

// Выбранные опции - теперь храним объект с groupId и выбранным sku.id
const selectedOptions = ref<Record<string, number>>({})


// Реактивная переменная для управления показом всех характеристик
const showAllFeatures = ref(false)


const activeTab = ref('description') // 'description' или 'features'

// Проверяем наличие контента для табов
const hasDescription = computed(() => product.value?.content)
const hasFeatures = computed(() => product.value?.features?.length)



// Функция для переключения отображения
const toggleFeatures = () => {
  showAllFeatures.value = !showAllFeatures.value
}

// Вычисляемое свойство для отображаемых характеристик
const displayedFeatures = computed(() => {
  if (!product.value?.features) return []

  if (showAllFeatures.value) {
    return product.value.features // Показываем все
  } else {
    return product.value.features.slice(0, 8) // Показываем только первые 8
  }
})

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

// Устанавливаем активный таб по умолчанию
onMounted(() => {
  if (!hasDescription.value && hasFeatures.value) {
    activeTab.value = 'features'
  }
})
const cleanText = (html:string) => html.replace(/<[^>]*>/g, '')
</script>

<template>
  <main class="main">
    <section class="product">
      <div class="container product__container">
        <UBreadcrumb
            class=" text-gray-300 flex custom-breadcrumb"
            divider="-"
            :ui="{
                    label: 'text-gray-500 font-light',
                    separator: 'text-gray-300',
                    separatorIcon: 'text-gray-500',
                    list: 'text-gray-500',
                    link: 'text-gray-300'
                }"
            :links="[{ label: 'Comfy', to: '/' }, {label: 'Кровати', to: '/krovati'}, { label: cleanText(product?.title) }]"
        />
        <h1>{{product?.title}}</h1>
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
            <div class="product__wrapper">
              <div
                  v-if="displayedFeatures.length"
                  :class="{'eight': !showAllFeatures && product?.features.length > 8}"
                  class="product__attributes"
              >
                <p v-for="(feature, i) in displayedFeatures" :key="i">
                  {{ feature?.title }}: {{ feature?.description }}
                </p>
              </div>

              <button
                  v-if="product?.features.length > 8"
                  class="btn btn-white mx-auto underline"
                  @click="toggleFeatures"
              >
                {{ showAllFeatures ? 'Скрыть' : 'Все характеристики' }}
              </button>
            </div>

            <div class="flex flex-col flex-wrap lg:flex-row  gap-0 lg:gap-24 mb-5 lg:mb-0">
              <div class="price-container">
                <strong class="flex items-center gap-2">
                  <!-- Показываем старую цену если есть скидка на выбранных опциях -->
                  Цена:
                  <span
                      v-if="hasDiscountOnSelectedOptions"
                      class="text-lg line-through"
                  >
                   {{ originalTotalPrice }} ₽
                  </span>
                  <span class="text-2xl"> {{ totalPrice }} ₽</span>

                </strong>
              </div>

              <div v-if="!productOpacity" class="product__btns">
                <button class="btn btn-primary" @click.prevent="isOpen = !isOpen">Оставить заявку</button>
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
            </div>
            <div class="flex flex-col flex-wrap lg:flex-row  gap-5 lg:gap-24 mb-5 lg:mb-0">
              <TheProductDelivery/>
              <TheProductPay/>
            </div>

<!--            <div v-if="groupedSku.length" class="sku-groups">-->
<!--              <div v-for="group in groupedSku" :key="group.title" class="sku-group">-->
<!--                <strong class="sku-group__title">{{ group.title }}</strong>-->
<!--                <div class="sku-group__items flex">-->
<!--                  <button-->
<!--                      v-for="sku in group.items"-->
<!--                      :key="sku.id"-->
<!--                      class="sku-item bg-gray-100"-->
<!--                      :class="{ 'sku-item&#45;&#45;selected': isOptionSelected(group.title, sku) }"-->
<!--                      @click="selectOption(group.title, sku)"-->
<!--                      type="button"-->
<!--                  >-->
<!--                    <span class="sku-title">{{ sku.title }}</span>-->
<!--                    &lt;!&ndash;                    <span v-if="sku.price > 0" class="sku-price">+{{ sku.price }} ₽</span>&ndash;&gt;-->
<!--                  </button>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->


          </div>
        </div>
      </div>
      <div v-if="hasDescription || hasFeatures" class="container product__container">
        <!-- Табы -->
        <div class="product-tabs">
          <button
              v-if="hasDescription"
              class="product-tab"
              :class="{ 'product-tab--active': activeTab === 'description' }"
              @click="activeTab = 'description'"
          >
            Описание
          </button>

          <button
              v-if="hasFeatures"
              class="product-tab"
              :class="{ 'product-tab--active': activeTab === 'features' }"
              @click="activeTab = 'features'"
          >
            Характеристики
          </button>
        </div>

        <!-- Контент табов -->
        <div class="product-tab-content">
          <!-- Описание -->
          <div
              v-if="hasDescription && activeTab === 'description'"
              class="product-tab-panel"
          >
            <div v-html="product?.content"></div>
          </div>

          <!-- Характеристики -->
          <div
              v-if="hasFeatures && activeTab === 'features'"
              class="product-tab-panel"
          >
            <div class="max-w-4xl">
              <div class="product__wrapper">
                <div class="product__attributes">
                  <p
                      v-for="(feature, i) in product?.features"
                      :key="i"
                      class="feature-item"
                  >
                    <span class="feature-title">{{ feature?.title }}:</span>
                    <span class="feature-description">{{ feature?.description }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
          <TheModalForm :form-id="38" title="Оставить заявку"/>
        </div>
      </UModal>
    </section>
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