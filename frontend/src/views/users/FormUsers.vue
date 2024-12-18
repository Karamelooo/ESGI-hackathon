<script setup lang="ts">
import {reactive, defineProps, defineEmits, watch} from 'vue';
import type {User} from '@/composables/useUser';
import VInput from "@/components/VInput.vue";
import VSelect from "@/components/VSelect.vue";

const props = defineProps({
  user: Object as () => User | null,
});

const emit = defineEmits(['submit', 'cancel']);

const formState = reactive<User>({
  id: props.user?.id || undefined,
  name: props.user?.name || '',
  firstname: props.user?.firstname || '',
  email: props.user?.email || '',
  role: props.user?.role || 'STUDENT',
  password: props.user?.password || '',
});

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      formState.id = newUser.id;
      formState.name = newUser.name;
      formState.firstname = newUser.firstname;
      formState.email = newUser.email;
      formState.role = newUser.role;
      formState.password = newUser.password;
    } else {
      formState.id = undefined;
      formState.name = '';
      formState.firstname = '';
      formState.email = '';
      formState.role = 'STUDENT';
      formState.password = '';
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
            placeholder="Nom de l'utilisateur"/>

    <VInput input-type="text" label="firstname" name="firstname" v-model="formState.firstname"
            placeholder="Prénom de l'utilisateur"/>

    <VInput input-type="email" label="Email" name="email" v-model="formState.email"
            placeholder="Email de l'utilisateur"/>

    <VInput input-type="password" label="Password" name="password" v-model="formState.password"
            placeholder="Mot de passe de l'utilisateur"/>

    <VSelect
      v-model="formState.role"
      label="Role" name="role"
      :options="[
               {value: 'SUPERADMIN', label: 'Administrateur'},
               {value: 'INTERVENANT', label: 'Intervenant'},
               {value: 'STUDENT', label: 'Étudiant'},
      ]"
      placeholder="Choisir un role"/>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" @click="handleCancel"
              class="text-sm/6 font-semibold text-gray-900">Cancel
      </button>
      <button type="submit"
              class="rounded-md bg-secondary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600">
        Save
      </button>
    </div>
  </form>
</template>
