<template>
  <div>
    <h1>Liste des Salles</h1>

    <!-- État de chargement -->
    <div v-if="loading" class="loading">
      Chargement des salles...
    </div>

    <!-- Message d'erreur -->
    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <!-- Liste des salles -->
    <div v-else>
      <ul v-if="salles.length > 0">
        <li v-for="salle in salles" :key="salle.id">
          {{ salle.name }} - Capacité: {{ salle.capacite }}
        </li>
      </ul>
      <p v-else>Aucune salle disponible</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const salles = ref([]);
const loading = ref(true);
const error = ref(null);

const chargerSalles = async () => {
  try {
    const response = await fetch('http://localhost:4000/salles');
    const data = await response.json();
    salles.value = data;
  } catch (e) {
    error.value = 'Impossible de charger les salles. Veuillez réessayer plus tard.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  chargerSalles();
});

</script>


<style scoped>
.loading {
  color: #666;
  text-align: center;
  padding: 1rem;
}

.error {
  color: red;
  padding: 1rem;
  border: 1px solid red;
  border-radius: 4px;
  margin: 1rem 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

li:last-child {
  border-bottom: none;
}
</style>
