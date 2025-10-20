<script setup lang="ts">
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <UModal v-model="props.modelValue"
          :ui="{ container: 'items-start pt-14 bg-white sm:bg-gray-50/50', shadow: 'shadow-none sm:shadow-lg', padding: 'p-0 sm:p-0', rounded: 'rounded-none sm:rounded-lg' }"
          prevent-close
          class="modal">
    <div class="px-6 py-10">
      <UButton
          color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 modal__close"
          @click="emit('update:modelValue', false)"/>
      <TheModalForm :form-id="37" title="Хотите получить выгодное коммерческое предложение?"/>
    </div>
  </UModal>
</template>

<style scoped>

</style>