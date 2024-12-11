<template>
  <div>
    <h1>Gestion des Salles</h1>

    <!-- Formulaire d'ajout/modification -->
    <div class="form-container">
      <h2>{{ salle.id ? 'Modifier' : 'Ajouter' }} une salle</h2>
      <form @submit.prevent="soumettreFormulaire">
        <input v-model="salle.name" placeholder="Nom de la salle" required>
        <input v-model.number="salle.capacite" type="number" placeholder="Capacité" required>
        <button type="submit">{{ salle.id ? 'Modifier' : 'Ajouter' }}</button>
        <button type="button" v-if="salle.id" @click="reinitialiserFormulaire">Annuler</button>
      </form>
    </div>

    <!-- Liste des salles -->
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <ul v-if="salles.length > 0">
        <li v-for="item in salles" :key="item.id">
          {{ item.name }} - Capacité: {{ item.capacite }}
          <div class="actions">
            <button @click="modifierSalle(item)">Modifier</button>
            <button @click="supprimerSalle(item.id)">Supprimer</button>
          </div>
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
      salle: { name: '', capacite: null },
      loading: true,
      error: null
    }
  },

  methods: {
    // Lecture (Read)
    async chargerSalles() {
      try {
        const response = await fetch('http://localhost:4000/salles');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        this.salles = await response.json();
      } catch (e) {
        console.error('Erreur:', e);
        this.error = 'Impossible de charger les salles.';
      } finally {
        this.loading = false;
      }
    },

    // Création (Create)
    async ajouterSalle() {
      try {
        const response = await fetch('http://localhost:4000/salles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.salle)
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        await this.chargerSalles();
        this.reinitialiserFormulaire();
      } catch (e) {
        this.error = 'Erreur lors de l\'ajout de la salle.';
      }
    },

    // Mise à jour (Update)
    async mettreAJourSalle() {
      try {
        const response = await fetch(`http://localhost:4000/salles/${this.salle.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.salle)
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        await this.chargerSalles();
        this.reinitialiserFormulaire();
      } catch (e) {
        this.error = 'Erreur lors de la modification de la salle.';
      }
    },

    // Suppression (Delete)
    async supprimerSalle(id) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cette salle ?')) return;

      try {
        const response = await fetch(`http://localhost:4000/salles/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        await this.chargerSalles();
      } catch (e) {
        this.error = 'Erreur lors de la suppression de la salle.';
      }
    },

    // Méthodes utilitaires
    modifierSalle(salle) {
      this.salle = { ...salle };
    },

    reinitialiserFormulaire() {
      this.salle = { name: '', capacite: null };
    },

    async soumettreFormulaire() {
      if (this.salle.id) {
        await this.mettreAJourSalle();
      } else {
        await this.ajouterSalle();
      }
    }
  },

  async created() {
    await this.chargerSalles();
  }
}
</script>

<style scoped>
.form-container {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

form {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.actions {
  display: inline-flex;
  gap: 10px;
  margin-left: 10px;
}

.actions button {
  padding: 4px 8px;
  font-size: 0.9em;
}

.actions button:last-child {
  background-color: #f44336;
}

.loading, .error {
  margin: 20px 0;
  padding: 10px;
  text-align: center;
}

.error {
  color: red;
  border: 1px solid red;
}
</style>
