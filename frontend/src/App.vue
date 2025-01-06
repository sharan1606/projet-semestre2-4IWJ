<script setup>
import logo from './assets/sparq.png';
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <img alt="Sparq logo" :src="logo" width="80" height="80"/>
      </div>
      <nav class="main-menu">
        <ul>
          <li><a href="/">Accueil</a></li>
          <li>
            <a href="produits">Produits</a>
            <!-- <ul class="submenu">
              <li><a href="/categorie1">Catégorie 1</a></li>
              <li><a href="/categorie2">Catégorie 2</a></li>
              <li><a href="/categorie3">Catégorie 3</a></li>
              <li><a href="/produits/:id">Détails du Produit</a></li>
            </ul> -->
          </li>
          <li><a href="/panier">Panier</a></li>
          <li>
            <a href="/account">Mon Compte</a>
            <!-- <ul class="submenu">
              <li><a href="/mes-commandes">Mes Commandes</a></li>
              <li><a href="/mes-informations">Mes Informations</a></li>
              <li><a href="/reinitialiser-mot-de-passe">Réinitialiser Mot de Passe</a></li>
            </ul> -->
          </li>
          <li>
            <a href="/administrate">Administration</a>
            <!-- <ul class="submenu">
              <li><a href="/admin/users">Gestion des Utilisateurs</a></li>
              <li><a href="/admin/commandes">Gestion des Commandes</a></li>
              <li><a href="/admin/statistiques">Statistiques</a></li>
              <li><a href="/admin/produits">Gestion des Produits</a></li>
            </ul> -->
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
  <footer class="footer">
    <div class="footer-sections">
      <div class="footer-section">
        <img alt="Sparq logo" :src="logo" width="125" height="125" />
        <p>&copy; 2024 Sparq. Tous droits réservés.</p>
      </div>
      <div class="footer-section">
        <h4>Informations</h4>
        <ul>
          <li><a href="/mentions-legales">Mentions Légales</a></li>
          <li><a href="/privacy-policy">Politique de Confidentialité</a></li>
          <li><a href="/cgv">Conditions Générales de Vente</a></li>
          <li><a href="/cookies">Politique des cookies</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Services</h4>
        <ul>
          <li><a href="/livraison">Livraison via Chronopost</a></li>
          <li><a href="/retours">Retours et Remboursements</a></li>
          <li><a href="/support-client">Support Client</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Contact</h4>
        <p>Email : support@sparq.com</p>
        <p>Téléphone : +33 1 23 45 67 89</p>
      </div>
    </div>
  </footer>
</template>

<style>
/* Header global */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  width: 100%;
}

/* Logo */

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

/* Typographie */
h1, h2, h3, h4, h5, h6, p {
  font-family: var(--font-family), sans-serif;
}

h1 {
  font-size: 2rem;
}
h2 {
  font-size: 1.5rem;
}
h3 {
  font-size: 1.25rem;
}
h4 {
  font-size: 1rem;
}
h5 {
  font-size: 0.875rem;
}
h6 {
  font-size: 0.75rem;
}
p {
  font-size: 1rem;
}

:root {
  --logo-size: 80px;
  --primary: #066f50;
  --secondary: #00bd7e;
  --background: #ffffff;
  --text: #000000;
  --neutral: #c9cbcf;
  --font-family: 'Roboto', sans-serif;
}

body {
  font-family: var(--font-family);
  background-color: var(--background);
  color: var(--text);
}

a {
  color: var(--primary);
  text-decoration: none;
}

.header-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.header-content .logo img {
  display: block;
}

/* Menu principal */
.main-menu ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
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

/* Footer global */
.footer {
  background-color: #f9f9f9;
  padding: 2rem 1rem;
  border-top: 1px solid #ddd;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.footer-sections {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  width: 100%;
}

.footer-section {
  flex: 1;
  min-width: 200px;
}

.footer-section h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul a {
  text-decoration: none;
  color: #555;
  transition: color 0.3s ease;
}

.footer-section ul a:hover {
  color: #000;
}
</style>
