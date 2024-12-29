<script setup>
import logo from './assets/sparq.png';
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <img alt="Sparq logo" :src="logo" width="80" height="80" />
      </div>
      <nav class="main-menu">
        <ul>
          <li><a href="/">Accueil</a></li>
          <li>
            <a href="#">Produits</a>
            <ul class="submenu">
              <li><a href="/categorie1">Catégorie 1</a></li>
              <li><a href="/categorie2">Catégorie 2</a></li>
              <li><a href="/categorie3">Catégorie 3</a></li>
              <li><a href="/produit-details">Détails du Produit</a></li>
            </ul>
          </li>
          <li><a href="/panier">Panier</a></li>
          <li>
            <a href="#">Mon Compte</a>
            <ul class="submenu">
              <li><a href="/mes-commandes">Mes Commandes</a></li>
              <li><a href="/mes-informations">Mes Informations</a></li>
              <li><a href="/reinitialiser-mot-de-passe">Réinitialiser Mot de Passe</a></li>
            </ul>
          </li>
          <li>
            <a href="#">Administration</a>
            <ul class="submenu">
              <li><a href="/admin/utilisateurs">Gestion des Utilisateurs</a></li>
              <li><a href="/admin/commandes">Gestion des Commandes</a></li>
              <li><a href="/admin/statistiques">Statistiques</a></li>
              <li><a href="/admin/produits">Gestion des Produits</a></li>
            </ul>
          </li>
          <li>
            <a href="#">Aide</a>
            <ul class="submenu">
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </li>
          <li><a href="/login">Connexion</a></li>
          <li><a href="/register">Inscription</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <p>&copy; 2024 Sparq</p>
  </footer>
</template>

<style scoped>
/* Header global */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

/* Logo */
.header-content .logo img {
  display: block;
}

/* Menu principal */
.main-menu ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.main-menu li {
  position: relative; /* Pour positionner les sous-menus */
  margin-right: 1rem;
}

.main-menu a {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  display: block;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.main-menu a:hover {
  background-color: #f0f0f0;
  color: #000;
  border-radius: 4px;
}

/* Sous-menus */
.submenu {
  display: none; /* Caché par défaut */
  position: absolute;
  top: 100%; /* En dessous du parent */
  left: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1000;
  list-style: none;
  padding: 0.5rem 0;
  min-width: 200px;
}

.submenu li {
  margin: 0;
}

.submenu a {
  padding: 0.5rem 1rem;
  white-space: nowrap; /* Empêche le retour à la ligne */
}

.main-menu li:hover > .submenu {
  display: block; /* Affiche le sous-menu lors du survol */
}
</style>
