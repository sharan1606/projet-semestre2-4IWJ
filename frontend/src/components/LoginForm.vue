<template>
    <form @submit.prevent="submitForm" class="login-form">
      <h2>Login</h2>
      <TextInput
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email"
        v-model="email"
        :error="emailError"
      />
      <TextInput
        label="Password"
        id="password"
        type="password"
        placeholder="Enter your password"
        v-model="password"
        :error="passwordError"
      />
      <SubmitButton :label="'Login'" :disabled="!isFormValid" />
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
      };
    },
    computed: {
      isFormValid() {
        return this.email && this.password && !this.emailError && !this.passwordError;
      },
    },
    watch: {
      email(value) {
        this.emailError = value.includes("@") ? "" : "Please enter a valid email address.";
      },
      password(value) {
        this.passwordError = value.length >= 6 ? "" : "Password must be at least 6 characters long.";
      },
    },
    methods: {
      submitForm() {
        if (this.isFormValid) {
          alert("Form submitted successfully!");
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
  
  .forgot-password-link {
    color: #3498db;
    text-align: center;
    margin-top: 1rem;
    cursor: pointer;
    text-decoration: underline;
  }
  </style>
  