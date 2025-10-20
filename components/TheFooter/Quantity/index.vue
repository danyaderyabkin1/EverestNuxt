<script setup lang="ts">
const props = defineProps({
  count : {
    type: Number,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
})

const token = useCookie('_token')
const defaultProductCount = ref(props?.count);
const timer = ref();
const url = useRequestURL();
const emit = defineEmits(['changeCount'])
const {fetchUpdateQuantity} = useUpdateQuantity();
const dataForUpdate = computed(() => {
  return {
    itemId: props.id,
    quantity: defaultProductCount.value,
  }
})

const updateCartQuantity =  async () => {
  await fetchUpdateQuantity(token.value, dataForUpdate.value);
  emit('changeCount', defaultProductCount.value)
};

watch(() => defaultProductCount.value, () => {
  clearTimeout(timer.value);
  timer.value = setTimeout(updateCartQuantity, 200);
})
</script>

<template>
  <div class="flex items-center justify-content-center order-3 md:order-none">
    <button type="button" @click.prevent="defaultProductCount !== 1 ? defaultProductCount-- : ''" class="px-3 md:px-4 lg:text-2xl">-</button>
    <UInput class="custom-input-number" v-model="defaultProductCount" type="text" disabled size="sm"/>
    <button type="button" @click.prevent="defaultProductCount++" class="px-3 md:px-4 lg:text-2xl">+</button>
  </div>
</template>

<style scoped>

</style>