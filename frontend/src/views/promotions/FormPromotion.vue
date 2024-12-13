<script setup lang="ts">
import {reactive, defineProps, defineEmits, watch} from 'vue';
import VInput from "@/components/VInput.vue";
import type {Promotion} from "@/composables/usePromotion.ts";

const props = defineProps({
  promotion: Object as () => Promotion | null,
});

const emit = defineEmits(['submit', 'cancel']);

const formState = reactive<Promotion>({
  id: props.promotion?.id || undefined,
  name: props.promotion?.name || '',
  students: props.promotion?.students || '',
});

watch(
  () => props.promotion,
  (newPromotion) => {
    if (newPromotion) {
      formState.id = newPromotion.id;
      formState.name = newPromotion.name;
      formState.students = newPromotion.students;
    } else {
      formState.id = undefined;
      formState.name = '';
      formState.students = '';
    }
  },
  {immediate: true}
);

const handleSubmit = () => {
  emit('submit', formState);
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 flex-1 flex-col flex">
    <VInput input-type="text"
            label="Nom"
            name="name"
            v-model="formState.name"
            placeholder="Nom de la promotion"/>

    <VInput input-type="number"
            label="Nombre d'étudiants"
            name="students"
            v-model="formState.students as string"
            placeholder="Nombre d'étudiants"
    />

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" @click="handleCancel"
              class="text-sm/6 font-semibold text-gray-900">
        Annuler
      </button>
      <button type="submit"
              class="rounded-md bg-secondary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600">
        Sauvegarder
      </button>
    </div>
  </form>
</template>
