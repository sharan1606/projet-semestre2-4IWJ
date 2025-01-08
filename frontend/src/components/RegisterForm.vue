<template>
  <form @submit.prevent="submitForm" aria-labelledby="registerForm">
    <h2 id="registerForm">Inscription</h2>

    <!-- Champ Nom -->
    <TextInput
      label="Nom"
      id="lastName"
      type="text"
      placeholder="Entrez votre nom"
      v-model="lastName"
      :error="lastNameError"
      aria-describedby="lastNameError"
    />

    <!-- Champ Prénom -->
    <TextInput
      label="Prénom"
      id="firstName"
      type="text"
      placeholder="Entrez votre prénom"
      v-model="firstName"
      :error="firstNameError"
      aria-describedby="firstNameError"
    />

    <!-- Champ Adresse -->
    <TextInput
      label="Adresse"
      id="address"
      type="text"
      placeholder="Entrez votre adresse"
      v-model="address"
      :error="addressError"
      aria-describedby="addressError"
    />

    <!-- Champ Téléphone -->
    <TextInput
      label="Téléphone"
      id="phone"
      type="tel"
      placeholder="Entrez votre numéro de téléphone"
      v-model="telephone"
      :error="phoneError"
      aria-describedby="phoneError"
    />

    <!-- Champ Email -->
    <TextInput
      label="Email"
      id="email"
      type="email"
      placeholder="Entrez votre email"
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
        placeholder="Entrez votre mot de passe"
        v-model="password"
        :error="passwordError"
        aria-describedby="passwordError"
      />

      <TextInput
        label="Confirmez le mot de passe"
        id="confirmPassword"
        type="password"
        placeholder="Confirmez votre mot de passe"
        v-model="confirmPassword"
        :error="confirmPasswordError"
        aria-describedby="confirmPasswordError"
      />
    </div>

    <SubmitButton :label="'Inscription'" :disabled="!isFormValid" />

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
      lastName: "",
      firstName: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      lastNameError: "",
      firstNameError: "",
      addressError: "",
      phoneError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      addressError: "",
      registerError: "",
    };
  },
  computed: {
    isFormValid() {
      return (
        this.lastName &&
        this.firstName &&
        this.address &&
        this.phone &&
        this.email &&
        this.password &&
        this.confirmPassword &&
        !this.lastNameError &&
        !this.firstNameError &&
        !this.addressError &&
        !this.phoneError &&
        !this.emailError &&
        !this.passwordError &&
        !this.confirmPasswordError &&
        !this.addressError
      );
    }
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
    phone(value) {
      this.phoneError = value.length >= 10 ? "" : "Veuillez entrer un numéro de téléphone valide.";
    },
  },
  methods: {
    async submitForm() {
      if (this.isFormValid) {
        this.registerError = "";
        // Envoi des données à l'API
        fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lastname: lastName,
            firstname: firstName,
            address,
            telephone: phone,
            email,
            password,
          }),
        });

        if (response.ok) {
          alert("Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.");
        } else {
          const error = await response.json();
          this.registerError = error.message || "Erreur lors de l'inscription.";
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
        this.registerError = "Erreur réseau. Veuillez réessayer plus tard.";
      }
    },
  },
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 1rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Helvetica', sans-serif;
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

.password-container {
  display: flex;
  gap: 1rem;
}

.password-container > * {
  flex: 1;
}
</style>
