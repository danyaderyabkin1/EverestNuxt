<script setup lang="ts">
import { vMaska } from "maska/vue"

const token = useCookie('_token')

const isOpen = ref(false)
const isOpenInfo = ref(false)
const {fetchCart, cart} = useCart()
const {fetchEmptyCart} = useEmptyCart()
const {fetchCreateOrder} = useCreateOrder()



const errorMessage = ref(false)
const errorMessageCaptcha = ref(false)
const loading = ref(false)
const checkbox = ref(false)

const createData = ref({
  domain: "b.hoteltex.online",
  token: token.value,
  name: "",
  phone: "",
  email: "",
  deliveryAddress: "Иваново",
  cityId: 3684,
  shippingMethodId: 1,
  paymentMethodId: 2,
  pickupPointId: null,
  isNeedInstall: false,
  installCityId: null
})
const toast = useToast()


const cartTotal = computed(() => {
  return cart?.value?.reduce((acc, item) => (item.sku.actual_price * item.quantity) + acc, 0)
})
const emptyCart = async () => {
  await fetchEmptyCart(token.value)
  isOpenInfo.value = false
  await fetchCart(token.value)
}
const createOrder = async () => {
  await fetchCreateOrder(token.value, createData.value)
  isOpen.value = false
  toast.add({title: 'Заказ оформлен!', color: 'error', ui: {position: 'bottom-left'}})
  await fetchCart(token.value)
}
// Автоматически загружаем корзину при монтировании
onMounted(async () => {
  if (token.value) {
    await fetchCart(token.value);
  }
});

</script>

<template>
<section v-if="cart?.length" class="cart z-50">
  <div class="container cart__container">
    <div v-if="isOpenInfo" class="cart__info">
      <ul class="md:border-b border-b-gray-200 mb-3 py-4 flex flex-col gap-3">
        <li v-for="item in cart" :key="item.id" class="cart__item">
          <p class="text-sm font-medium">{{item.product.title}}</p>
          <TheFooterQuantity :count="item?.quantity" :id="item?.id" @change-count="fetchCart(token)"/>
          <p class="ml-auto">{{item.totalPrice.toFixed(2)}} ₽</p>
<!--          <pre>{{item}}</pre>-->
        </li>
      </ul>
      <div class="flex items-center justify-between mb-4">
        <p class="text-xl sm:text-3xl">Итого:</p>
        <b class="text-xl sm:text-2xl">{{cartTotal.toFixed(2)}} ₽</b>
      </div>
    </div>
    <div class="cart__wrapper">
      <div class="flex justify-around items-center flex-1">
        <b class="text-xs md:text-lg">Товаров: {{cart?.length}}</b>
        <b class="text-md md:text-lg">Сумма: {{cartTotal?.toFixed(0)}} ₽</b>
      </div>
      <div class="flex justify-between items-center flex-1">
        <button @click.prevent="emptyCart" class="btn btn-primary">Очистить</button>
        <button @click.prevent="isOpen = true" class="btn btn-primary">Оформить заявку</button>
        <button @click.prevent="isOpenInfo = !isOpenInfo"class="btn btn-primary flex items-center gap-1"> <UIcon size="22" :name="isOpenInfo ? 'i-lucide-chevron-down' : 'i-lucide-chevron-up'" />  Список товаров</button>
      </div>
    </div>
  </div>
</section>
  <MainModal v-model="isOpen"/>
<!--  <UModal v-model="isOpen"-->
<!--          prevent-close-->
<!--          :ui="{header: 'hidden', content: 'items-start bg-white', overlay: 'shadow-none sm:shadow-lg'}"-->
<!--  >-->

<!--    <template #body>-->
<!--      <UButton-->
<!--          color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 modal__close"-->
<!--          @click="isOpen = false"/>-->
<!--      <div class="modal__container">-->
<!--        <h3 class="font-semibold text-[20px] sm:text-2xl text-black mb-5 text-center ">Оформление заказа</h3>-->
<!--        <form @submit.prevent="createOrder" class="flex flex-col w-full">-->
<!--          <div class="w-full flex flex-wrap gap-3">-->
<!--            <div class="md:flex w-full  md:items-center justify-center">-->
<!--              <div class="w-full">-->
<!--                <input type="hidden" name="form_id"/>-->
<!--                <input-->
<!--                    v-model="createData.name"-->
<!--                    name="user_name[Ваше имя]"-->
<!--                    class="bg-gray-100 appearance-none border-2 border-gray-100 rounded-3xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-200"-->
<!--                    id="inline-full-name"-->
<!--                    type="text"-->
<!--                    placeholder="Имя"-->
<!--                    required>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="md:flex w-full  md:items-center justify-center">-->
<!--              <div class="w-full">-->
<!--                <input-->
<!--                    v-model="createData.email"-->
<!--                    name="email[Эл. почта]"-->
<!--                    class="bg-gray-100 appearance-none border-2 border-gray-100 rounded-3xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-200"-->
<!--                    id="inline-full-name" type="email" placeholder="E-mail" required>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="relative w-full">-->
<!--              <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">-->
<!--                <UIcon name="i-mdi-light-phone" class="size-6 text-gray-400"/>-->
<!--              </div>-->
<!--              <input :class="{'border-red-500': errorMessage}"-->
<!--                     name="whatsapp[Телефон]"-->
<!--                     v-model="createData.phone"-->
<!--                     v-maska="'+7 ### ### ##-##'"-->
<!--                     class="bg-gray-100 ps-10 p-2.5 appearance-none border-2 border-gray-100 rounded-3xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-200"-->
<!--                     id="inline-full-name"-->
<!--                     type="text"-->
<!--                     placeholder="+7"-->
<!--                     required>-->
<!--              <div v-if="errorMessage" class="error absolute text-[12px]">Ошибка: Введите номер полностью!</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <UCheckbox required class="my-3" v-model="checkbox">-->
<!--            <template #label>-->
<!--              <span class="text-gray-600 font-normal cursor-pointer">Я даю согласие на обработку моих персональных данных ООО «Отель Текстиль» (ИНН 3702188415) в целях обработки заявки и обратной связи. <a class="primary&#45;&#45;color" target="_blank" href="/assets/policy.pdf">Политика конфиденциальности</a> </span>-->
<!--            </template>-->
<!--          </UCheckbox>-->
<!--          <div class="md:flex  md:items-center justify-center mb-3">-->
<!--            <div class="w-full relative">-->
<!--              <button :disabled="loading || !checkbox" :class="{'opacity-50': loading}" class="btn btn-primary w-full text-black font-black">Отправить</button>-->
<!--              <div :class="{'z-0': loading}" class="absolute top-0 left-0 w-full h-full flex items-center justify-center -z-10">-->
<!--                <svg v-if="loading"  aria-hidden="true" class="inline w-7 h-7 text-white animate-spin dark:text-gray-600 fill-blue-600 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>-->
<!--                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>-->
<!--                </svg>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div v-if="errorMessageCaptcha" class="error text-[14px] transition-all animate-bounce absolute bottom-3">Ошибка: Введите капчу!</div>-->
<!--        </form>-->
<!--        &lt;!&ndash;    <ClientOnly v-if="phone.length > 3">&ndash;&gt;-->
<!--        &lt;!&ndash;      <YSmartCaptcha v-model="tokenYa"/>&ndash;&gt;-->
<!--        &lt;!&ndash;    </ClientOnly>&ndash;&gt;-->
<!--      </div>-->
<!--    </template>-->
<!--  </UModal>-->
</template>

<style lang="scss" scoped>


</style>