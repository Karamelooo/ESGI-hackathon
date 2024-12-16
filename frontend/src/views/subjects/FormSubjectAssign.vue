<script setup lang="ts">
import {reactive, defineProps, defineEmits, watch} from 'vue';
import VInput from "@/components/VInput.vue";
import type {Subject, SubjectMapping} from "@/composables/useSubject.ts";
import VSelect from "@/components/VSelect.vue";
import type {Promotion} from "@/composables/usePromotion.ts";
import type {User} from "@/composables/useUser.ts";

const props = defineProps({
  subjectMapping: Object as () => SubjectMapping | null,
  subject: Object as () => Subject,
  promotions: Array as () => Promotion[],
  intervenants: Array as () => User[],
});

const emit = defineEmits(['submit', 'cancel']);

const formState = reactive<SubjectMapping>({
  id: props.subjectMapping?.id || undefined,
  intervenantId: props.subjectMapping?.intervenantId || '',
  promotionId: props.subjectMapping?.promotionId || '',
  matiereId: props.subject?.id,
  volumeHeure: props.subjectMapping?.volumeHeure || 0,
});

watch(
  () => props.subjectMapping,
  (newSubject) => {
    if (newSubject) {
      formState.id = newSubject.id;
      formState.intervenantId = newSubject.intervenantId;
      formState.promotionId = newSubject.promotionId;
      formState.matiereId = props.subject?.id;
      formState.volumeHeure = newSubject.volumeHeure;
    } else {
      formState.id = undefined;
      formState.intervenantId = '';
      formState.promotionId = '';
      formState.matiereId = props.subject?.id;
      formState.volumeHeure = 0;
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

    <VInput input-type="number"
            label="Volume horaire"
            name="volumeHeure"
            v-model="formState.volumeHeure as string"
            placeholder="Volume horaire"
    />

    <VSelect label="Intervenant"
             name="intervenantId"
             v-model="formState.intervenantId"
             :options="
                props.intervenants.map((intervenant) => ({
                  value: intervenant.id,
                  label: intervenant.name + ' ' + intervenant.firstname,
                }))
              "
             required />

    <VSelect label="Promotion"
              name="promotionId"
              v-model="formState.promotionId"
              :options="
                props.promotions.map((promotion : Promotion) => ({
                  value: promotion.id,
                  label: promotion.name,
                }))
              "
              required />


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
