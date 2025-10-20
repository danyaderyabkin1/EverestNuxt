<script setup lang="ts">
const token = useCookie('_token')
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['openModal', 'addToCart'])

const cleanText = (html:string) => html.replace(/<[^>]*>/g, '')

// Функция для получения минимальной цены со скидкой
const getMinPrice = computed(() => {
  if (!props.product?.sku?.length) return null

  // Фильтруем SKU с включенной скидкой и доступной ценой со скидкой
  const discountedSkus = props.product.sku.filter(sku =>
      sku.is_discount_enabled && sku.discount_price !== null && sku.quantity > 0
  )

  // Если есть SKU со скидкой, берем минимальную цену со скидкой
  if (discountedSkus.length > 0) {
    const minDiscountedPrice = Math.min(...discountedSkus.map(sku => sku.discount_price))
    return minDiscountedPrice
  }

  // Если нет скидок, берем минимальную обычную цену
  const availableSkus = props.product.sku.filter(sku => sku.quantity > 0)
  if (availableSkus.length > 0) {
    return Math.min(...availableSkus.map(sku => sku.price))
  }

  return null
})

// Функция для получения исходной цены (без скидки)
const getOriginalPrice = computed(() => {
  if (!props.product?.sku?.length) return null

  // Находим SKU с минимальной ценой для отображения исходной цены
  const availableSkus = props.product.sku.filter(sku => sku.quantity > 0)
  if (availableSkus.length > 0) {
    const minPriceSku = availableSkus.reduce((min, sku) => sku.price < min.price ? sku : min)
    return minPriceSku.price
  }

  return null
})

// Проверяем, есть ли у товара активные скидки
const hasActiveDiscount = computed(() => {
  return props.product?.sku?.some(sku =>
      sku.is_discount_enabled && sku.discount_price !== null && sku.quantity > 0
  )
})

const sendToCart = ref({
  items: [{
    domain: 'b.hoteltex.online',
    productId: props.product?.id,
    skuId: props.product?.sku[0]?.id,
    quantity: 1
  }]
})
const {fetchCart} = useCart()
const {fetchAddToCart} = useAddToCart()
const addToCart = async () => {
  if (!token.value) {
    // Обработка случая, когда пользователь не авторизован
    return;
  }

  try {
    await fetchAddToCart(token.value, sendToCart.value);
    emit('addToCart', 'Товар добавлен в заказ!', 'neutral');
    // Не нужно повторно вызывать fetchCart, так как он уже вызывается в fetchAddToCart
  } catch (error) {
    console.error('Failed to add to cart:', error);
    emit('addToCart', 'Произошла ошибка!', 'warning');
  }
};
</script>

<template>
  <li itemscope itemprop="itemListElement" itemtype="http://schema.org/Product">
    <NuxtLink v-if="product?.preview_image" :title="cleanText(product?.title)" :to="`${product?.url}`">
      <img :src="product?.preview_image" loading="lazy" alt="product-image" itemprop="image">
    </NuxtLink>
    <NuxtLink v-else :title="cleanText(product?.title)" :to="`${product?.url}`">
      <img src="/assets/images/nophoto.jpg" alt="product-image">
    </NuxtLink>
    <NuxtLink :title="cleanText(product?.title)" class="products__link" :to="`${product?.url}`" itemprop="url">
      <span itemprop="name">{{ cleanText(product?.title) }}</span>
    </NuxtLink>

    <div class="mt-auto mb-2 flex gap-2 justify-between">
      <div v-if="getMinPrice" class="price-container">
        <!-- Если есть активная скидка -->
        <button v-if="hasActiveDiscount" class="btn btn-gray discount-price">
          <span class="original-price">от {{ getOriginalPrice }} ₽</span>
          <span class="current-price">от {{ getMinPrice }} ₽</span>
        </button>
        <!-- Если нет скидки -->
        <button v-else class="btn btn-gray">от {{ getMinPrice }} ₽</button>
      </div>
      <button class="btn btn-primary">Подробнее</button>
    </div>

  </li>
</template>

<style scoped>

.discount-price {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0 7px;
  position: relative;
}

.price-container {
  padding: 0;
}

.original-price {
  font-size: 12px;
  position: relative;
  display: inline-block;
}
.original-price::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff4444, #ff6666);
  transform: translateY(-50%);
  border-radius: 1px;
}

</style>