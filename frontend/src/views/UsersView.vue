<script setup lang="ts">
import VLayout from "@/layouts/VLayout.vue";
import VTable from "@/components/VTable.vue";
import {useUserStore} from '@/stores/userStore';
import {onMounted, reactive} from "vue";
import VDrawer from "@/components/VDrawer.vue";
import type {User} from "@/composables/useUser.ts";
import FormUser from "@/views/users/FormUsers.vue";
import {showToast} from "@/utils/taost.ts";
import {onUnmounted} from "@vue/runtime-dom";

const state = reactive({
  User: {} as User,
  openDrawer: false
});

const userStore = useUserStore();
onMounted(async () => {
  await userStore.loadUsers();
});

const openAddDrawer = () => {
  state.User = {} as User;
  state.openDrawer = true;
};

const openEditDrawer = (user: User) => {
  state.User = {...user};
  state.openDrawer = true;
};

const handleUserSubmit = async (user: User) => {
  if (user.id) {
    await userStore.modifyUser(user);
  } else {
    await userStore.createUser(user);
  }
  state.openDrawer = false;
};

const deleteUser = async (user: User) => {
  if (!user.id) return;
  await userStore.removeUser(user?.id);
};

</script>
<template>
  <VLayout>
    <VDrawer
        :title="state.User?.id ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'"
        :description="state.User?.id ? 'Modifiez les informations de l\'utilisateur' : 'Ajoutez un nouvel utilisateur'"
        :open="state.openDrawer"
        :setOpen="(open: boolean) => state.openDrawer = open"
    >
      <FormUser
          :user="state.User"
          @submit="handleUserSubmit"
          @cancel="() => state.openDrawer = false"
      />
    </VDrawer>
    <VTable
        title="Utilisateurs"
        :columns="userStore.columns"
        :rows="userStore.users"
        :show-actions="true"
        :showAddButton="true"
        addButtonLabel="Ajouter un utilisateur"
        :onAdd="openAddDrawer"
        :onEdit="openEditDrawer"
        :onDelete="deleteUser"
    />
  </VLayout>
</template>
