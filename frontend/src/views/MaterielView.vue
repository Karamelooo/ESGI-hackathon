<template>
  <div>
    <h1>Gestion des Matériels</h1>

    <div class="form-container">
      <h2>{{ materiel.id ? 'Modifier' : 'Ajouter' }} un matériel</h2>
      <form @submit.prevent="soumettreFormulaire">
        <input v-model="materiel.name" placeholder="Description du matériel" required>

        <!-- Sélecteur principal -->
        <select v-model="typeAssignation" required>
          <option value="">Sélectionner le type d'assignation</option>
          <option value="CLASSE">Assigné à une classe</option>
          <option value="USER">Assigné à un utilisateur</option>
          <option value="NONE">Non assigné</option>
        </select>

        <!-- Sélecteur de classes -->
        <select v-if="typeAssignation === 'CLASSE'" v-model="selectedId" required>
          <option value="">Sélectionner une classe</option>
          <option v-for="salle in salles" :key="salle.id" :value="salle.id">
            {{ salle.name }}
          </option>
        </select>

        <!-- Sélecteur d'utilisateurs -->
        <select v-if="typeAssignation === 'USER'" v-model="selectedId" required>
          <option value="">Sélectionner un utilisateur</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
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
          {{ item.name }} - Statut: {{ item.assignedBool ? 'Assigné' : 'Non assigné' }}
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
      users: [],
      typeAssignation: '', // CLASSE, USER ou NONE
      selectedId: '',
      materiel: {
        name: '',
        assignedBool: false
      },
      loading: true,
      error: null
    }
  },

  watch: {
    // Réinitialiser selectedId quand le type d'assignation change
    typeAssignation(newValue) {
      this.selectedId = '';
      this.materiel.assignedBool = newValue !== 'NONE';
    }
  },

  methods: {
    validateForm() {
      if (!this.materiel.name) {
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

      if (this.typeAssignation !== 'NONE' && !this.selectedId) {
        Toastify({
          text: `Veuillez sélectionner ${this.typeAssignation === 'CLASSE' ? 'une classe' : 'un utilisateur'} !`,
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
        this.error = 'Impossible de charger les salles.';
      }
    },

    async chargerUsers() {
      try {
        const response = await fetch('http://localhost:4000/users');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        this.users = await response.json();
      } catch (e) {
        console.error('Erreur:', e);
        this.error = 'Impossible de charger les utilisateurs.';
      }
    },

    async ajouterMateriel() {
      try {
        if (this.typeAssignation !== 'NONE' && !this.selectedId) {
          Toastify({
            text: `Veuillez sélectionner ${this.typeAssignation === 'CLASSE' ? 'une classe' : 'un utilisateur'} !`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          }).showToast();
          return;
        }

        const materielData = {
          name: this.materiel.name,
          assignedBool: this.typeAssignation !== 'NONE',
          selectedId: this.selectedId,
          type: this.typeAssignation
        };

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
        if (this.typeAssignation !== 'NONE' && !this.selectedId) {
          Toastify({
            text: `Veuillez sélectionner ${this.typeAssignation === 'CLASSE' ? 'une classe' : 'un utilisateur'} !`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          }).showToast();
          return;
        }

        const materielData = {
          name: this.materiel.name,
          assignedBool: this.typeAssignation !== 'NONE',
          selectedId: this.selectedId,
          type: this.typeAssignation
        };

        const response = await fetch(`http://localhost:4000/materiels/${this.materiel.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(materielData)
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
      if (materiel.mapping) {
        this.typeAssignation = materiel.mapping.type;
        this.selectedId = materiel.mapping.idType;
      } else {
        this.typeAssignation = 'NONE';
        this.selectedId = '';
      }
    },

    reinitialiserFormulaire() {
      this.materiel = {
        name: '',
        assignedBool: false
      };
      this.typeAssignation = '';
      this.selectedId = '';
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
      this.chargerSalles(),
      this.chargerUsers()
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
