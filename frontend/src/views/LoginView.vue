<template>
  <div>
    <h2>Login</h2>
    <LoginForm /> <!-- Composant LoginForm -->
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  components: {
    LoginForm
  }
};
</script>
