<script setup lang="ts">
import VLayout from "@/layouts/VLayout.vue";
import VTable from "@/components/VTable.vue";
import {onMounted, reactive} from "vue";
import VDrawer from "@/components/VDrawer.vue";
import type {Subject, SubjectMapping} from "@/composables/useSubject.ts";
import {useSubjectStore} from "@/stores/subjectStore.ts";
import FormSubject from "@/views/subjects/FormSubject.vue";
import {usePromotionStore} from "@/stores/promotionStore.ts";
import {useUserStore} from "@/stores/userStore.ts";
import FormSubjectAssign from "@/views/subjects/FormSubjectAssign.vue";

const state = reactive({
  subject: {} as Subject,
  promotions: [],
  users: [],
  openDrawer: false,
  openDrawerAssign: false
});

const subjectStore = useSubjectStore();
const promotionStore = usePromotionStore();
const userStore = useUserStore();

onMounted(async () => {
  await subjectStore.loadSubjects()
  await promotionStore.loadPromotions()
  await userStore.loadIntervenants()
});

const openAddDrawer = () => {
  state.subject = {} as Subject;
  state.openDrawer = true;
};

const openAssignDrawer = (subject: Subject) => {
  state.subject = {...subject};
  state.promotions = promotionStore.promotions;
  state.users = userStore.intervenants;
  state.openDrawerAssign = true;
};

const openEditDrawer = (subject: Subject) => {
  state.subject = {...subject};
  state.openDrawer = true;
};

const handleUserSubmit = async (subject: Subject) => {
  if (subject.id) {
    await subjectStore.modifySubject(subject);
  } else {
    await subjectStore.createSubject(subject);
  }
  state.openDrawer = false;
};


const handleSubmitAssign = async (subjectMapping: SubjectMapping) => {
  await subjectStore.assignSubject(subjectMapping);
  state.openDrawerAssign = false;
};

const deleteSubject = async (subject: Subject) => {
  if (!subject.id) return;
  await subjectStore.removeSubject(subject.id);
};

</script>
<template>
  <VLayout>
    <VDrawer
        title="Assigner une matière"
        :open="state.openDrawerAssign"
        :setOpen="(open: boolean) => state.openDrawerAssign = open"
    >
      <FormSubjectAssign
          :subject="state.subject"
          :promotions="state.promotions"
          :intervenants="state.users"
          @submit="handleSubmitAssign"
          @cancel="() => state.openDrawer = false"
      />
    </VDrawer>

    <VDrawer
        :title="state.subject?.id ? 'Modifier une matière' : 'Ajouter une matière'"
        :open="state.openDrawer"
        :setOpen="(open: boolean) => state.openDrawer = open"
    >
      <FormSubject
          :subject="state.subject"
          @submit="handleUserSubmit"
          @cancel="() => state.openDrawerAssign = false"
      />
    </VDrawer>
    <VTable
        title="Subjects"
        :columns="subjectStore.columns"
        :rows="subjectStore.subjects"
        :show-actions="true"
        :showAddButton="true"
        :show-assign-button="true"
        addButtonLabel="Ajouter une matière"
        :onAdd="openAddDrawer"
        :onEdit="openEditDrawer"
        :onDelete="deleteSubject"
        :onAssign="openAssignDrawer"
    />
  </VLayout>
</template>
