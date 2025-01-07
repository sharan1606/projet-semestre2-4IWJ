<template>
    <div class="forgot-password-view">
      <h2>Réinitialiser le mot de passe</h2>
      <form @submit.prevent="sendResetEmail">
        <TextInput
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
          v-model="email"
          :error="emailError"
        />
        <SubmitButton :label="'Envoyer un email de réinitialisation'" :disabled="!isEmailValid" />
      </form>
    </div>
  </template>
  
  <script>
  import TextInput from "../components/TextInput.vue";
  import SubmitButton from "../components/SubmitButton.vue";
  
  export default {
    components: {
      TextInput,
      SubmitButton,
    },
    data() {
      return {
        email: "",
        emailError: "",
      };
    },
    computed: {
      isEmailValid() {
        return this.email && !this.emailError;
      },
    },
    watch: {
      email(value) {
        this.emailError = value.includes("@") ? "" : "Veuillez entrer une adresse e-mail valide.";
      },
    },
    methods: {
      sendResetEmail() {
        if (this.isEmailValid) {
          // Envoyer l'email de réinitialisation ici
          alert("Email de réinitialisation envoyé !");
        }
      },
    },
  };
  </script>
  
  <style >
  .forgot-password-view {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 10px;
  }
  </style>
  