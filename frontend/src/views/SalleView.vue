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

  async created() {
    await this.chargerSalles()
  },

  methods: {
    async chargerSalles() {
      try {
        const response = await fetch('http://localhost:3000/api/salles')

        // Vérification de la réponse HTTP
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`)
        }

        // Conversion et stockage des données
        const data = await response.json()
        this.salles = data

      } catch (e) {
        console.error('Erreur lors du chargement des salles:', e)
        this.error = 'Impossible de charger les salles. Veuillez réessayer plus tard.'
      } finally {
        this.loading = false
      }
    }
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
