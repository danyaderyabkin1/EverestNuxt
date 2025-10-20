<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const emit = defineEmits(['refresh', 'openFilter'])
const sortQuery = ref([
  {
    name: 'price',
    label: 'Цена'
  },
  {
    name: 'popularity',
    label: 'Популярные'
  },
  {
    name: 'latest',
    label: 'Новинки'
  },
])

const sortDir = ref(route.query.sortDir || 'desc')
const sortBy = ref(route.query.sortBy || '')

// Функция для обновления URL с параметрами сортировки
const updateUrlWithSorting = () => {
  if (sortBy.value) {
    router.push({
      query: {
        ...route.query,
        sortBy: sortBy.value,
        sortDir: sortDir.value
      }
    })
  } else {
    // Удаляем параметры сортировки если они не выбраны
    const { sortBy: sb, sortDir: sd, ...query } = route.query
    router.push({ query })
  }
}

const sorting = (sortB) => {
  if (sortBy.value === sortB) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = sortB
    sortDir.value = 'desc'
  }
  updateUrlWithSorting()
  emit('refresh', sortBy.value, sortDir.value)
}

// Инициализация из query параметров при загрузке
onMounted(() => {
  if (route.query.sortBy) {
    sortBy.value = route.query.sortBy as string
  }
  if (route.query.sortDir) {
    sortDir.value = route.query.sortDir as string
  }
})

// Следим за изменениями route.query
watch(() => route.query, (newQuery) => {
  if (newQuery.sortBy !== sortBy.value || newQuery.sortDir !== sortDir.value) {
    sortBy.value = newQuery.sortBy as string || ''
    sortDir.value = newQuery.sortDir as string || 'desc'
    emit('refresh', sortBy.value, sortDir.value)
  }
})
</script>

<template>
  <div class="category__filter">
    <button @click="emit('openFilter')" class="btn btn-primary">Фильтр</button>
    <button
        :class="{active: sortBy === sort.name}"
        v-for="(sort, i) in sortQuery"
        :key="i"
        @click.prevent="sorting(sort.name)"
        class="p-0 btn btn-white font-semibold my-radio__label gray-text"
    >
      {{sort.label}}
      <span v-if="sortBy === sort.name">{{sortDir === 'asc' ? '▲' : '▼'}}</span>
    </button>
  </div>
</template>
<style scoped>
.btn-white {
  color: #000;
  border-radius: 15px;
}

@media (any-hover: hover) {
  .btn-white:hover  {
    box-shadow: none;
    background-color: #f7f7f7;
  }
}
</style>