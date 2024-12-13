<script setup lang="ts">
import VLayout from "@/layouts/VLayout.vue";
import VTable from "@/components/VTable.vue";
import {onMounted, reactive} from "vue";
import VDrawer from "@/components/VDrawer.vue";
import type {Subject} from "@/composables/useSubject.ts";
import {useSubjectStore} from "@/stores/subjectStore.ts";
import FormSubject from "@/views/subjects/FormSubject.vue";

const state = reactive({
  subject: {} as Subject,
  openDrawer: false
});

const subjectStore = useSubjectStore();
onMounted(async () => {
  await subjectStore.loadSubjects()
});

const openAddDrawer = () => {
  state.subject = {} as Subject;
  state.openDrawer = true;
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

const deleteSubject = async (subject: Subject) => {
  if (!subject.id) return;
  await subjectStore.removeSubject(subject.id);
};

</script>
<template>
  <VLayout>
    <VDrawer
        :title="state.subject?.id ? 'Modifier une matière' : 'Ajouter une matière'"
        :open="state.openDrawer"
        :setOpen="(open: boolean) => state.openDrawer = open"
    >
      <FormSubject
          :subject="state.subject"
          @submit="handleUserSubmit"
          @cancel="() => state.openDrawer = false"
      />
    </VDrawer>
    <VTable
        title="Subjects"
        :columns="subjectStore.columns"
        :rows="subjectStore.subjects"
        :show-actions="true"
        :showAddButton="true"
        addButtonLabel="Ajouter une matière"
        :onAdd="openAddDrawer"
        :onEdit="openEditDrawer"
        :onDelete="deleteSubject"
    />
  </VLayout>
</template>
