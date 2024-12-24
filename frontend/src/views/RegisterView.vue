<template>
  <div>
    <h2>Inscription</h2>
    <form @submit.prevent="register">
      <input v-model="firstname" type="text" placeholder="Prénom" required />
      <input v-model="lastname" type="text" placeholder="Nom" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirmer le mot de passe" required />
      <button type="submit">S'inscrire</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Les mots de passe ne correspondent pas';
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/api/users/register', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        });
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = 'Une erreur est survenue lors de l\'inscription';
      }
    },
  },
};
</script>
