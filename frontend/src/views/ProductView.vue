<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Liste des produits
const products = ref([]);
const isLoading = ref(false);

// Fonction pour récupérer les produits depuis l'API
const fetchProducts = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get('http://localhost:5000/api/products');
    products.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error);
  } finally {
    isLoading.value = false;
  }
};

// Charger les produits au montage du composant
onMounted(fetchProducts);

// Fonction pour ajouter au panier (à implémenter selon ton système de panier)
const addToCart = (product) => {
  console.log('Produit ajouté au panier:', product);
  // Ajouter la logique de gestion du panier ici

  const fetchProducts = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get('http://localhost:5000/api/products');
    products.value = response.data;
    console.log('Produits récupérés:', products.value); // Ajout d'un log pour vérifier les données
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error);
  } finally {
    isLoading.value = false;
  }
};

};
</script>

<template>
  <div class="products-page">
    <h1 class="title">Nos Produits</h1>

    <!-- Indicateur de chargement -->
    <div v-if="isLoading" class="loading">Chargement des produits...</div>

    <!-- Grille des produits -->
    <div v-else class="product-grid">
      <div class="product-card" v-for="product in products" :key="product._id">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-price">{{ product.price.toFixed(2) }} €</p>
        <div class="actions">
          <a :href="'/produit/' + product._id" class="btn small">Voir détails</a>
          <button class="btn small primary" @click="addToCart(product)">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-page {
  padding: 20px;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  transition: box-shadow 0.3s;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-name {
  font-size: 1.2rem;
  margin: 10px 0;
}

.product-price {
  font-size: 1.1rem;
  color: #333;
}

.actions {
  margin-top: 10px;
}

.btn {
  display: inline-block;
  padding: 10px 15px;
  margin: 5px 0;
  border: none;
  cursor: pointer;
  text-decoration: none;
  border-radius: 5px;
}

.btn.small {
  font-size: 0.9rem;
}

.btn.primary {
  background-color: #007bff;
  color: #fff;
}

.btn.primary:hover {
  background-color: #0056b3;
}
</style>
