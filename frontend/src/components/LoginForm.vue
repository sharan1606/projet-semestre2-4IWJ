<template>
  <form @submit.prevent="submitForm" class="login-form">
    <h2>Connexion</h2>
    <TextInput
      label="Email"
      id="email"
      type="email"
      placeholder="Entrez votre email"
      v-model="email"
      :error="emailError"
    />
    <TextInput
      label="Mot de passe"
      id="password"
      type="password"
      placeholder="Entrez votre mot de passe"
      v-model="password"
      :error="passwordError"
    />
    <SubmitButton :label="'Se connecter'" :disabled="!isFormValid" />
    <a @click.prevent="goToForgotPassword" class="forgot-password-link">Mot de passe oublié ?</a>
  </form>
</template>

<script>
import TextInput from "./TextInput.vue";
import SubmitButton from "./SubmitButton.vue";

export default {
  name: "LoginForm",
  components: {
    TextInput,
    SubmitButton,
  },
  data() {
    return {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      loginError: "",
    };
  },
  computed: {
    isFormValid() {
      return this.email && this.password && !this.emailError && !this.passwordError;
    },
  },
  watch: {
    email(value) {
      this.emailError = value.includes("@") ? "" : "Veuillez entrer une adresse email valide.";
    },
    password(value) {
      this.passwordError = value.length >= 6 ? "" : "Le mot de passe doit comporter au moins 6 caractères.";
    },
  },
  methods: {
    async submitForm() {
      if (!this.isFormValid) return;

      try {
        // Requête POST au backend
        const response = await fetch("http://152.42.132.157:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Connexion réussie
          this.$router.push("/");
          alert(`Connexion réussie. Bienvenue ${data.firstname} !`);
          localStorage.setItem("token", data.token); // Stocke le token JWT
        } else {
          // Gestion des erreurs
          this.loginError = data.message || "Erreur lors de la connexion.";
        }
      } catch (error) {
        this.loginError = "Erreur serveur. Veuillez réessayer plus tard.";
      }
    },
    goToForgotPassword() {
      this.$emit("forgot-password");
    },
  },
};
</script>


<style scoped>
.login-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  font-family: 'Helvetica', sans-serif;
}

h2 {
  font-size: 1.6rem;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.forgot-password-link {
  color: #066f50;
  text-align: center;
  margin-top: 1rem;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1rem;
}

.forgot-password-link:hover {
  color: #00bd7e;
}
</style>
