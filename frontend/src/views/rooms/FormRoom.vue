<script setup lang="ts">
import {reactive, defineProps, defineEmits, watch} from 'vue';
import VInput from "@/components/VInput.vue";
import type {Room} from "@/composables/useRoom.ts";

const props = defineProps({
  room: Object as () => Room | null,
});

const emit = defineEmits(['submit', 'cancel']);

const formState = reactive<Room>({
  id: props.room?.id || undefined,
  name: props.room?.name || '',
  capacite: props.room?.capacite || '',
});

watch(
    () => props.room,
    (newRoom) => {
      if (newRoom) {
        formState.id = newRoom.id;
        formState.name = newRoom.name;
        formState.capacite = newRoom.capacite;
      } else {
        formState.id = undefined;
        formState.name = '';
        formState.capacite = '';
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
            placeholder="Nom de la salle"/>

    <VInput input-type="number"
            label="Capacité"
            name="capacite"
            v-model="formState.capacite"
            placeholder="Capacité de la salle"
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
