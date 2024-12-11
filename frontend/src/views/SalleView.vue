<template>
  <div>
    <h1>Gestion des Salles</h1>

    <div class="form-container">
      <h2>{{ salle.id ? 'Modifier' : 'Ajouter' }} une salle</h2>
      <form @submit.prevent="soumettreFormulaire">
        <input v-model="salle.name" placeholder="Nom de la salle" required>
        <input v-model.number="salle.capacite" type="number" placeholder="Capacité" required>
        <button type="submit">{{ salle.id ? 'Modifier' : 'Ajouter' }}</button>
        <button type="button" v-if="salle.id" @click="reinitialiserFormulaire">Annuler</button>
      </form>
    </div>

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
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

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

    validateForm() {
      if (!this.salle.name || !this.salle.capacite) {
        Toastify({
          text: "Veuillez remplir tous les champs !",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
        return false;
      }

      if (!Number.isInteger(this.salle.capacite)) {
        Toastify({
          text: "La capacité doit être un nombre entier !",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
        return false;
      }

      if (this.salle.capacite <= 0) {
        Toastify({
          text: "La capacité ne peut pas être négative ou égale à 0 !",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
        return false;
      }

      return true;
    },

    async ajouterSalle() {
      try {
        if (!this.validateForm()) return;

        const salleExistante = this.salles.find(s =>
          s.name.toLowerCase() === this.salle.name.toLowerCase()
        );

        if (salleExistante) {
          Toastify({
            text: "Une salle avec ce nom existe déjà !",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          }).showToast();
          return;
        }

        const response = await fetch('http://localhost:4000/salles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.salle)
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Erreur lors de l\'ajout de la salle');
        }

        await this.chargerSalles();
        this.reinitialiserFormulaire();

        Toastify({
          text: "La salle a été ajoutée avec succès !",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
      } catch (e) {
        Toastify({
          text: e.message || "Erreur lors de l'ajout de la salle.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
      }
    },

    async mettreAJourSalle() {
      try {
        if (!this.validateForm()) return;

        const salleExistante = this.salles.find(s =>
          s.name.toLowerCase() === this.salle.name.toLowerCase() &&
          s.id !== this.salle.id
        );

        if (salleExistante) {
          Toastify({
            text: "Une salle avec ce nom existe déjà !",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          }).showToast();
          return;
        }

        const response = await fetch(`http://localhost:4000/salles/${this.salle.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.salle)
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Erreur lors de la modification de la salle');
        }

        await this.chargerSalles();
        this.reinitialiserFormulaire();

        Toastify({
          text: "La salle a été modifiée avec succès !",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
      } catch (e) {
        Toastify({
          text: e.message || "Erreur lors de la modification de la salle.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
      }
    },

    async supprimerSalle(id) {
      try {
        const response = await fetch(`http://localhost:4000/salles/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Erreur lors de la suppression de la salle');
        }

        await this.chargerSalles();

        Toastify({
          text: "La salle a été supprimée avec succès !",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
      } catch (e) {
        Toastify({
          text: e.message || "Erreur lors de la suppression de la salle.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
      }
    },

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
