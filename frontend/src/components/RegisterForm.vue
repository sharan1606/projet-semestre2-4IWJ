<template>
  <form @submit.prevent="submitForm" aria-labelledby="registerForm">
    <h2 id="registerForm">Inscription</h2>

    <!-- Champ Nom -->
    <TextInput
      label="Nom"
      id="firstName"
      type="text"
      placeholder="Entrez votre nom"
      v-model="firstName"
      :error="firstNameError"
      aria-describedby="firstNameError"
    />

    <!-- Champ Prénom -->
    <TextInput
      label="Prénom"
      id="lastName"
      type="text"
      placeholder="Entrez votre prénom"
      v-model="lastName"
      :error="lastNameError"
      aria-describedby="lastNameError"
    />

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
      firstName: "",
      lastName: "",
      telephone: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      firstNameError: "",
      lastNameError: "",
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
        this.firstName &&
        this.lastName &&
        this.telephone &&
        this.email &&
        this.password &&
        this.confirmPassword &&
        this.address &&
        !this.firstNameError &&
        !this.lastNameError &&
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
    address(value) {
    this.addressError = value.length > 5 ? "" : "L'adresse doit contenir au moins 5 caractères.";
    },
    phone(value) {
      this.phoneError = value.length >= 10 ? "" : "Veuillez entrer un numéro de téléphone valide.";
    },
  },
  methods: {
    submitForm() {
      if (this.isFormValid) {
        this.registerError = "";
        // Envoi des données à l'API
        fetch("http://152.42.132.157:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: this.firstName,
            lastname: this.lastName,
            telephone: this.telephone,
            email: this.email,
            password: this.password,
            address: this.address,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message) {
              alert("Inscription réussie !");
              this.$router.push("/login");
            } else {
              this.registerError = data.error || "Une erreur est survenue.";
            }
          })
          .catch((error) => {
            console.error("Erreur lors de l'inscription :", error);
            this.registerError = "Erreur serveur. Veuillez réessayer plus tard.";
          });
      }
    },
    registerUser(firstName, lastName, telephone, email, password, address) {
      console.log("Utilisateur enregistré avec :", { firstName, lastName, telephone, email, password, address });
      alert("Inscription réussie !");
    }
  },
};
</script>

<style >
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

/* Styles pour les champs Mot de passe et Confirmation côte à côte */
.password-container {
  display: flex;
  gap: 1rem;
}

.password-container > * {
  flex: 1;
}
</style>
