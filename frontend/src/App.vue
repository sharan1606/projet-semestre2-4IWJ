<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import logo from './assets/logo.svg'
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <img alt="Sparq logo" :src="logo" />
      </div>
    </div>
    
    <nav class="main-menu">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </nav>
  </header>
  <body>
    <router-view />
  </body>
  <footer>
    <p>&copy; 2024 Sparq</p>
  </footer>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.header-content {
  display: flex;
  align-items: center;
}

.logo {
  margin-right: 1rem;
}

.main-menu {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem;
}

.main-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.main-menu li {
  margin: 0 1rem;
}

.main-menu a {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 0.5rem;
}

.main-menu a:hover {
  background-color: #eee;
}

.submenu {
  margin-left: 1rem;
  list-style-type: disc;
}
</style>
