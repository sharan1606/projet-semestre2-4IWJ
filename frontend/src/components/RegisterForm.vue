<template>
    <form @submit.prevent="submitForm" aria-labelledby="registerForm">
      <h2 id="registerForm">Register</h2>
  
      <!-- Champ Nom -->
      <TextInput
        label="Nom"
        id="firstName"
        type="text"
        placeholder="Enter your last name"
        v-model="firstName"
        :error="firstNameError"
        aria-describedby="firstNameError"
      />
  
      <!-- Champ Prénom -->
      <TextInput
        label="Prénom"
        id="lastName"
        type="text"
        placeholder="Enter your first name"
        v-model="lastName"
        :error="lastNameError"
        aria-describedby="lastNameError"
      />
  
      <!-- Date de naissance avec vérification d'âge -->
      <TextInput
        label="Date de naissance"
        id="dob"
        type="date"
        v-model="dob"
        :error="dobError"
        aria-describedby="dobError"
      />
  
      <!-- Champ Téléphone -->
      <TextInput
        label="Téléphone"
        id="phone"
        type="tel"
        placeholder="Enter your phone number"
        v-model="phone"
        :error="phoneError"
        aria-describedby="phoneError"
      />
  
      <!-- Champ Email -->
      <TextInput
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email"
        v-model="email"
        :error="emailError"
        aria-describedby="emailError"
      />
  
      <!-- Champs Mot de passe et Confirmation côte à côte -->
      <div class="password-container">
        <TextInput
          label="Mot de passe"
          id="password"
          type="password"
          placeholder="Enter your password"
          v-model="password"
          :error="passwordError"
          aria-describedby="passwordError"
        />
  
        <TextInput
          label="Confirmez le mot de passe"
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          v-model="confirmPassword"
          :error="confirmPasswordError"
          aria-describedby="confirmPasswordError"
        />
      </div>
  
      <SubmitButton :label="'Register'" :disabled="!isFormValid" />
  
      <div v-if="registerError" class="error-message">{{ registerError }}</div>
    </form>
  </template>
  
  <script>
  import TextInput from "./TextInput.vue";
  import SubmitButton from "./SubmitButton.vue";
  
  export default {
    name: "RegisterForm",
    components: {
      TextInput,
      SubmitButton,
    },
    data() {
      return {
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstNameError: "",
        lastNameError: "",
        dobError: "",
        phoneError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
        registerError: "",
      };
    },
    computed: {
      isFormValid() {
        return (
          this.firstName &&
          this.lastName &&
          this.dob &&
          this.phone &&
          this.email &&
          this.password &&
          this.confirmPassword &&
          !this.firstNameError &&
          !this.lastNameError &&
          !this.dobError &&
          !this.phoneError &&
          !this.emailError &&
          !this.passwordError &&
          !this.confirmPasswordError
        );
      },
    },
    watch: {
      email(value) {
        this.emailError = value.includes("@") ? "" : "Veuillez saisir une adresse e-mail valide.";
      },
      password(value) {
        this.passwordError = value.length >= 6 ? "" : "Le mot de passe doit comporter au moins 6 caractères.";
      },
      confirmPassword(value) {
        this.confirmPasswordError = value === this.password ? "" : "Les mots de passe ne correspondent pas.";
      },
      dob(value) {
        const age = this.calculateAge(value);
        this.dobError = age < 18 ? "Vous devez avoir au moins 18 ans." : "";
      },
      phone(value) {
        this.phoneError = value.length >= 10 ? "" : "Veuillez entrer un numéro de téléphone valide.";
      },
    },
    methods: {
      submitForm() {
        if (this.isFormValid) {
          this.registerError = "";
          this.registerUser(this.firstName, this.lastName, this.dob, this.phone, this.email, this.password);
        }
      },
      registerUser(firstName, lastName, dob, phone, email, password) {
        console.log("Utilisateur enregistré avec :", { firstName, lastName, dob, phone, email, password });
        alert("Inscription réussie !");
      },
      calculateAge(dob) {
        const birthDate = new Date(dob);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        const m = new Date().getMonth() - birthDate.getMonth();
        return m < 0 || (m === 0 && new Date().getDate() < birthDate.getDate()) ? age - 1 : age;
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    max-width: 600px;
    margin: 1rem auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  h2 {
    text-align: center;
    color: #333;
    font-weight: 600;
    font-size: 1.5rem;
  }
  
  .error-message {
    color: #e74c3c;
    font-size: 0.9rem;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  button {
    background-color: #3498db;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  /* Styles pour les champs Mot de passe et Confirmation côte à côte */
  .password-container {
    display: flex;
    gap: 1rem;
  }
  
  .password-container > * {
    flex: 1;
  }
  </style>
  