<template>
  <div>
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "", // Pour afficher les messages d'erreur
    };
  },
  methods: {
    async login() {
      try {
       
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email: this.email,
          password: this.password,
        });

        console.log("Réponse de l'API :", response.data);

        // Stockage du token JWT
        localStorage.setItem("token", response.data.token);

        // Configuration globale d'Axios pour inclure le token
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

        // Redirection après connexion
        this.$router.push("/");
      } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de la connexion :", error.response || error);
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message; // Message retourné par le backend
        } else if (error.response) {
          this.errorMessage = `Erreur ${error.response.status}: ${error.response.statusText}`;
        } else {
          this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
        }
      }
    },
  },
};
</script>

<style>
.error {
  color: red;
  font-weight: bold;
}
</style>
