<template>
    <form @submit.prevent="submitForgotPasswordForm" class="forgot-password-form">
      <h2>Forgot Password</h2>
      <TextInput
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email to reset password"
        v-model="email"
        :error="emailError"
      />
      <SubmitButton :label="'Send Reset Link'" :disabled="!email" />
      <div v-if="confirmationMessage" class="confirmation-message">{{ confirmationMessage }}</div>
    </form>
  </template>
  
  <script>
  import TextInput from "./TextInput.vue";
  import SubmitButton from "./SubmitButton.vue";
  
  export default {
    name: "ForgotPasswordForm",
    components: {
      TextInput,
      SubmitButton,
    },
    data() {
      return {
        email: "",
        emailError: "",
        confirmationMessage: "",
      };
    },
    watch: {
      email(value) {
        this.emailError = value.includes("@") ? "" : "Please enter a valid email address.";
      },
    },
    methods: {
      submitForgotPasswordForm() {
        if (!this.emailError && this.email) {
          // Code d'envoi du lien de réinitialisation
          this.confirmationMessage = "A reset link has been sent to your email address.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .forgot-password-form {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }
  
  h2 {
    font-size: 1.5rem;
    color: #333;
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
  
  .confirmation-message {
    color: #27ae60;
    font-size: 0.9rem;
    text-align: center;
    margin-top: 1rem;
  }
  </style>
  