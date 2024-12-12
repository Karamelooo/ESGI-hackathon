<template>
  <div>
    <h1>Gestion des Matériels</h1>

    <div class="form-container">
      <h2>{{ materiel.id ? 'Modifier' : 'Ajouter' }} un matériel</h2>
      <form @submit.prevent="soumettreFormulaire">
        <input v-model="materiel.description" placeholder="Description du matériel" required>
        <select v-model="materiel.assignedBool">
          <option :value="false">Non assigné</option>
          <option :value="true">Assigné</option>
        </select>
        <select v-if="materiel.assignedBool" v-model="selectedSalleId">
          <option value="">Sélectionner une salle</option>
          <option v-for="salle in salles" :key="salle.id" :value="salle.id">
            {{ salle.name }}
          </option>
        </select>
        <button type="submit">{{ materiel.id ? 'Modifier' : 'Ajouter' }}</button>
        <button type="button" v-if="materiel.id" @click="reinitialiserFormulaire">Annuler</button>
      </form>
    </div>

    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <ul v-if="materiels.length > 0">
        <li v-for="item in materiels" :key="item.id">
          {{ item.description }} - Statut: {{ item.assignedBool ? 'Assigné' : 'Non assigné' }}
          <div class="actions">
            <button @click="modifierMateriel(item)">Modifier</button>
            <button @click="supprimerMateriel(item.id)">Supprimer</button>
          </div>
        </li>
      </ul>
      <p v-else>Aucun matériel disponible</p>
    </div>
  </div>
</template>

<script>
import "toastify-js/src/toastify.css";
import Toastify from 'toastify-js';
export default {
  name: 'MaterielView',
  data() {
    return {
      materiels: [],
      salles: [],
      selectedSalleId: '',
      materiel: {
        description: '',
        assignedBool: false
      },
      loading: true,
      error: null
    }
  },

  methods: {
    validateForm() {
      if (!this.materiel.description) {
        Toastify({
          text: "Veuillez saisir une description !",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
        return false;
      }

      if (this.materiel.assignedBool && !this.selectedSalleId) {
        Toastify({
          text: "Veuillez sélectionner une salle !",
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

    async chargerMateriels() {
      try {
        const response = await fetch('http://localhost:4000/materiels');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        this.materiels = await response.json();
      } catch (e) {
        console.error('Erreur:', e);
        this.error = 'Impossible de charger les matériels.';
      } finally {
        this.loading = false;
      }
    },

    async chargerSalles() {
      try {
        const response = await fetch('http://localhost:4000/salles');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        this.salles = await response.json();
      } catch (e) {
        console.error('Erreur:', e);
        Toastify({
          text: "Erreur lors du chargement des salles",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
      }
    },

    async ajouterMateriel() {
      try {
        if (!this.validateForm()) return;

        const materielData = {
          ...this.materiel
        };

        if (this.materiel.assignedBool && this.selectedSalleId) {
          materielData.mapping = {
            create: {
              type: 'SALLE',
              salleId: this.selectedSalleId
            }
          };
        }

        const response = await fetch('http://localhost:4000/materiels', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(materielData)
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Erreur lors de l\'ajout du matériel');
        }

        await this.chargerMateriels();
        this.reinitialiserFormulaire();

        Toastify({
          text: "Le matériel a été ajouté avec succès !",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
      } catch (e) {
        Toastify({
          text: e.message || "Erreur lors de l'ajout du matériel.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
      }
    },

    async mettreAJourMateriel() {
      try {
        if (!this.validateForm()) return;

        const materielExistant = this.materiels.find(m =>
          m.description.toLowerCase() === this.materiel.description.toLowerCase() &&
          m.id !== this.materiel.id
        );

        if (materielExistant) {
          Toastify({
            text: "Un matériel avec cette description existe déjà !",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          }).showToast();
          return;
        }

        const response = await fetch(`http://localhost:4000/materiels/${this.materiel.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.materiel)
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Erreur lors de la modification du matériel');
        }

        await this.chargerMateriels();
        this.reinitialiserFormulaire();

        Toastify({
          text: "Le matériel a été modifié avec succès !",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
      } catch (e) {
        Toastify({
          text: e.message || "Erreur lors de la modification du matériel.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
      }
    },

    async supprimerMateriel(id) {
      try {
        const response = await fetch(`http://localhost:4000/materiels/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Erreur lors de la suppression du matériel');
        }

        await this.chargerMateriels();

        Toastify({
          text: "Le matériel a été supprimé avec succès !",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
      } catch (e) {
        Toastify({
          text: e.message || "Erreur lors de la suppression du matériel.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
      }
    },

    modifierMateriel(materiel) {
      this.materiel = { ...materiel };
    },

    reinitialiserFormulaire() {
      this.materiel = {
        description: '',
        assignedBool: false
      };
      this.selectedSalleId = '';
    },

    async soumettreFormulaire() {
      if (this.materiel.id) {
        await this.mettreAJourMateriel();
      } else {
        await this.ajouterMateriel();
      }
    }
  },

  async created() {
    await Promise.all([
      this.chargerMateriels(),
      this.chargerSalles()
    ]);
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

input, select {
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

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 150px;
}
</style>
