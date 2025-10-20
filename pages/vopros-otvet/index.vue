<script setup lang="ts">
const faqItems = ref([
  {
    id: 1,
    question: 'Какой срок доставки?',
    answer: 'Оставьте заявку через любую из форм на сайте, либо свяжитесь с нами по контактному телефону. Мы вас проконсультируем и ответим на все вопросы.'
  },
  {
    id: 2,
    question: 'Как правильно выбрать размер спального места?',
    answer: '✔ Размер кровати и размер спального места – разные понятия. Размер спального места равен размеру матраса. При этом сама кровать может иметь гораздо большие размеры;\n' +
        '✔ Кровать должна подходить ребенку в соответствии с его физическими особенностями;\n' +
        '✔ Кровать не должна «съедать» все полезное пространство детской комнаты. Кроватка подбирается в соответствии с ростом, возрастом малыша, что позволяет не загромождать комнату изделием «на вырост», заменяя ее по мере необходимости.\n' +
        '✔ Важен текущий возраст ребенка и срок, в течение которого будет использоваться кровать. Измерьте рост ребенка, добавьте 20-40 см – получится оптимальный размер спального места, если кровать приобретается на 2-3 года; добавьте 30-70 см, если использовать кровать планируется в течение 4-5 и более лет.\n' +
        'Размер 160х80 подходит детям ростом до 140 см\n' +
        'Размер 180х90 подходит детям ростом до 160 см'
  },
  {
    id: 3,
    question: 'Есть гарантийный период?',
    answer: 'Гарантийный срок эксплуатации 1 год со дня продажи.Гарантия не распространяется на мебель, имеющую механические повреждения (царапины, сколы и др), возникшие при транспортировке или в процессе неправильной эксплуатации, утолщение деталей от попадания на них влаги (разбухание), возникшее от неправильного ухода за мебелью.'
  }
])

const openItems = ref<number[]>([])

const toggleAccordion = (id: number) => {
  if (openItems.value.includes(id)) {
    openItems.value = openItems.value.filter(itemId => itemId !== id)
  } else {
    openItems.value.push(id)
  }
}

const isOpen = (id: number) => {
  return openItems.value.includes(id)
}

// Функция для форматирования текста с переносами
const formatAnswer = (text: string) => {
  return text.split('\n').map(line => line.trim()).filter(line => line.length > 0)
}
</script>

<template>
  <main class="main">
    <section class="description">
      <h1 class="page-title mb-4">Вопрос - ответ</h1>
      <UBreadcrumb
          class="mb-8 font-light text-gray-300 flex justify-center custom-breadcrumb"
          divider="-"
          :ui="{
        label: 'text-gray-500 font-light',
        separator: 'text-gray-300',
        separatorIcon: 'text-gray-500',
        list: 'text-gray-500',
        link: 'text-gray-300'
    }"
          :links="[{ label: 'Главная', to: '/' }, {label: 'Вопрос и ответ'}]"
      />

      <UContainer>
        <div class="faq-accordion max-w-4xl mx-auto">
          <div
              v-for="item in faqItems"
              :key="item.id"
              class="accordion-item"
          >
            <button
                class="accordion-button w-full py-2 px-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none"
                @click="toggleAccordion(item.id)"
            >
              <span class="text-2xl font-medium text-gray-900">{{ item.question }}</span>
              <span
                  class="accordion-icon w-5 h-5 flex items-center justify-center transition-transform duration-300"
                  :class="{'rotate-180': isOpen(item.id)}"
              >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            </button>
            <div
                v-show="isOpen(item.id)"
                class="accordion-content overflow-hidden transition-all px-6 duration-300 ease-in-out"
                :class="{'max-h-0': !isOpen(item.id), 'max-h-[2000px] pb-6': isOpen(item.id)}"
            >
              <div class="text-gray-500 bg-gray-100 p-4 leading-relaxed whitespace-pre-line">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>
    <MainForm/>
  </main>



</template>

<style scoped>
.leading-relaxed {
  border-radius: 0 0 15px 15px;
}

.faq-accordion {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.accordion-content {
  transition: max-height 0.3s ease-in-out;
}

.rotate-180 {
  transform: rotate(180deg);
}

.accordion-button {
  border-radius: 10px;
  background: linear-gradient(90deg, #F8F7F5 0%, #E8E4E1 100%);
}

/* Сохраняем переносы строк */
.whitespace-pre-line {
  white-space: pre-line;
}
</style>