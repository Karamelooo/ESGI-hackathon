<script setup lang="ts">
import Layout from "@/layouts/Layout.vue";
import VTable from "@/components/VTable.vue";

const people = [
  {name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Étudient'},
  {name: 'Courtney Henry', title: 'Designer', email: 'courney.henry@gmail.com', role: 'Intervenant'},
  {name: 'Terry Green', title: 'Designer', email: 'terry.green@myges.fr', role: 'Administrateur'},
]

const columns = [
  {label: 'Name', key: 'name'},
  {label: 'Title', key: 'title'},
  {label: 'Email', key: 'email'},
  {label: 'Role', key: 'role'}
]
</script>
<template>
  <Layout>
    <VTable
        title="Utilisateurs"
        :columns="columns"
        :rows="people"
        :show-actions="false"
        :showAddButton="true"
        addButtonLabel="Ajouter un utilisateur"
    />
  </Layout>
</template>
