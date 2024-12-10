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

<script>
export default {
  data() {
    return {
      salles: [],
      loading: true,
      error: null
    }
  },

  methods: {
    async chargerSalles() {
      try {
        console.log('Début de la requête');
        const response = await fetch('http://localhost:4000/salles', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        console.log('Status:', response.status);
        console.log('Headers:', response.headers);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Récupérer d'abord le texte brut pour le déboguer
        const texte = await response.text();
        console.log('Réponse brute:', texte);

        // Tenter de parser le JSON
        this.salles = JSON.parse(texte);

      } catch (e) {
        console.error('Erreur détaillée:', e);
        this.error = 'Impossible de charger les salles. Veuillez réessayer plus tard.';
      } finally {
        this.loading = false;
      }
    }
  },

  async created() {
    await this.chargerSalles();
  }
}
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
