<script setup lang="ts">
import {reactive, defineProps, defineEmits, watch} from 'vue';
import VInput from "@/components/VInput.vue";
import type {Subject} from "@/composables/useSubject.ts";

const props = defineProps({
  subject: Object as () => Subject | null,
});

const emit = defineEmits(['submit', 'cancel']);

const formState = reactive<Subject>({
  id: props.subject?.id || undefined,
  name: props.subject?.name || '',
  semester: props.subject?.semester || '',
  color: props.subject?.color || '',
});

watch(
  () => props.subject,
  (newSubject) => {
    if (newSubject) {
      formState.id = newSubject.id;
      formState.name = newSubject.name;
      formState.semester = newSubject.semester;
      formState.color = newSubject.color;
    } else {
      formState.id = undefined;
      formState.name = '';
      formState.semester = '';
      formState.color = '';
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
            placeholder="Nom de la matière"
            required
    />

    <VInput input-type="number"
            label="Semestre"
            name="semester"
            v-model="formState.semester as string"
            placeholder="Semestre"
    />

    <VInput input-type="color"
            label="Couleur"
            name="color"
            v-model="formState.color"
            placeholder="Couleur"
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
