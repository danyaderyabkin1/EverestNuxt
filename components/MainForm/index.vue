<script setup>
import {useYandexMetrika} from "#imports";
import {ref} from 'vue';
import { vMaska } from "maska/vue"


const tokenYa = ref();
const route = useRoute()
const {reachGoal} = useYandexMetrika();

const errorMessage = ref(false)
const errorMessageCaptcha = ref(false)

const phone = ref('')
const name = ref('')
const loading = ref(false)
const checkbox = ref(false)


const routeQueryToArray = computed(() => {
  if (route.query) {
    const obj = route.query;
    return Object.entries(obj).map(([key, value]) => ({
      name: key,
      value: value
    }))
  }
})

const sendForm = async (e) => {
  loading.value = true
  const formData = new FormData(e.target)
  routeQueryToArray?.value?.forEach((el, i) => {
    formData.append(`tags[${i}]`, `${el.name}-${el.value}`)
  })
  if (tokenYa.value && phone.value.length === 16) {
    await useFetch('/api/sendForm', {method: "POST", body: formData})
    loading.value = false
    errorMessage.value = false
    errorMessageCaptcha.value = false
    phone.value = ''
    reachGoal('formSend')
    await navigateTo('/thanks')
  } else if (!phone.value || phone.value.length < 16) {
    errorMessageCaptcha.value = false
    errorMessage.value = true
    loading.value = false
  } else if (!tokenYa.value) {
    errorMessage.value = false
    errorMessageCaptcha.value = true
    loading.value = false
  }
}

</script>
<template>
  <section class="feedback">
    <div class="container feedback__container max-w-7xl">
      <img src="/assets/images/banners/Airbrush-BG-CHANGER-1760706496478%201.png" alt="">
      <div class="feedback__wrap">
        <div class="feedback__header">
          <h3>У Вас имеется вопрос?</h3>
<!--          <a-->
<!--              class="what"-->
<!--              href="https://api.whatsapp.com/send/?phone=79158120572&text&type=phone_number&app_absent=0"-->
<!--              target="_blank">-->
<!--            <UIcon name="ic:baseline-whatsapp" class="size-9"/>-->
<!--          </a>-->
<!--          <a-->
<!--              class="tg"-->
<!--              href="https://t.me/+79158120572"-->
<!--              target="_blank">-->
<!--            <UIcon name="mdi:telegram" class="size-9"/>-->
<!--          </a>-->

        </div>
        <p>Укажите ваш контакт в мессенджере, и наш специалист свяжется в нем с вами в ближайшее время!</p>
<!--        <div v-html="data"/>-->
        <form @submit.prevent="sendForm" class="feedback__form w-full flex pb-6">
          <input type="hidden" name="form_id" value="20"/>
<!--          <div class="absolute z-10 top-2 start-0 flex items-center ps-3.5 pointer-events-none">-->
<!--            <UIcon name="i-mdi-light-phone" class="size-6 text-gray-400"/>-->
<!--          </div>-->
          <div class="flex w-2/3 flex-col gap-2">
            <input :class="{'border-red-500': errorMessage}"
                   name="whatsapp[Укажите Ваш номер]"
                   v-model="name"
                   class="p-2.5 appearance-none border-2 border-gray-100 rounded-3xl py-2 px-4 text-gray-700 leading-tight bg-[#F3F3F3] focus:outline-none focus:bg-white focus:border-gray-300"
                   type="text"
                   placeholder="Ваше имя"
                   required>
            <input :class="{'border-red-500': errorMessage}"
                   name="whatsapp[Укажите Ваш номер]"
                   v-model="phone"
                   v-maska="'+7 ### ### ##-##'"
                   class="feedback__input p-2.5 appearance-none border-2 border-gray-100 rounded-3xl py-2 px-4 text-gray-700 leading-tight bg-[#F3F3F3] focus:outline-none focus:bg-white focus:border-gray-300"
                   type="text"
                   placeholder="Ваш телефон"
                   required>
            <button :disabled="loading || !checkbox" :class="{'opacity-50': loading}" class="btn btn-primary self-start">Отправить</button>

          </div>
          <svg v-if="loading"  aria-hidden="true" class="absolute top-2 right-12 inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <div v-if="errorMessage" class="error absolute text-[12px] bottom-1">Ошибка: Введите номер полностью!</div>
        </form>
        <div class="md:max-w-96">
          <UCheckbox color="gray" v-model="checkbox">
            <template #label>
              <span class="text-gray-600">Я даю согласие на обработку моих персональных данных ООО «Эверест» (ИНН ) в целях обработки заявки в мессенджерах whatsapp и telegram. <router-link class="text-gray-500" target="_blank" to="/assets/policyO.pdf">Политика конфиденциальности</router-link> </span>
            </template>
          </UCheckbox>
        </div>
        <ClientOnly v-if="phone.length > 3">
          <YSmartCaptcha v-model="tokenYa" />
        </ClientOnly>
        <div v-if="errorMessageCaptcha" class="error mt-2 transition-all animate-bounce">Ошибка: Введите капчу!</div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>