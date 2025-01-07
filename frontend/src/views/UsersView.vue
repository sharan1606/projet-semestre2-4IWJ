<template>
    <div class="users-view">
      <h1>Liste des Utilisateurs</h1>
  
      <div v-if="loading" class="loading">Chargement des utilisateurs...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Adresse</th>
              <th>Date d'inscription</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.idUser">
              <td>{{ user.firstname }} {{ user.lastname }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.telephone }}</td>
              <td>{{ user.address }}</td>
              <td>{{ new Date(user.date_inscription).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        users: [],
        loading: true,
        error: null,
      };
    },
    async created() {
      try {
        // Appel de l'API pour récupérer les utilisateurs
        const response = await axios.get("/api/users");
        this.users = response.data;
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        this.error = "Impossible de charger la liste des utilisateurs.";
      } finally {
        this.loading = false;
      }
    },
  };
  </script>
  
  <style>
  .users-view {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  h1 {
    text-align: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }
  th {
    background-color: #f4f4f4;
  }
  .loading, .error {
    text-align: center;
    margin-top: 20px;
    font-size: 1.2rem;
  }
  .error {
    color: red;
  }
  </style>
  