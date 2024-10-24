<template>
    <div>
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:5000/api/users/login', {
            email: this.email,
            password: this.password,
          });
          localStorage.setItem('token', response.data.token);  // Stocke le token JWT
          this.$router.push('/');  // Redirige après la connexion
        } catch (error) {
          this.errorMessage = 'Email ou mot de passe incorrect';
        }
      },
    },
  };
  </script>
  