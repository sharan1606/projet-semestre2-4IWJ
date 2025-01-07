<template>
  <div class="product-details-view" v-if="product">
    <section class="product-details">
      <div class="product-image">
        <img :src="product.image" :alt="product.name" />
      </div>
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="product-price">{{ product.price }} €</p>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-description">{{ product.brand }}</p>
        <p class="product-category">{{ product.category }}</p>
        <p v-if="product.stock > 0" class="in-stock">En stock</p>
        <p v-else class="out-of-stock">Rupture de stock</p>
        <button @click="addToCart" class="add-to-cart">Ajouter au panier</button>
      </div>
    </section>
  </div>
  <p v-else>Chargement des détails du produit...</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { productService } from '../services/productService';
import { Product } from '../types/product';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true, // Récupère l'ID de la route
    },
  },
  data() {
    return {
      product: null as Product | null, // Stocke les détails du produit
    };
  },
  async mounted() {
    try {
      this.product = await productService.getProductById(this.id); // Appel à l'API
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du produit :', error);
    }
  },
  methods: {
    addToCart() {
      if (this.product) {
        alert(`${this.product.name} a été ajouté au panier !`);
      }
    },
  },
});
</script>
<style scoped>
/* Conteneur principal */
.product-details-view {
  padding: 1.5rem; /* Réduction du padding */
  background-color: #f8f9fa;
}

/* Section détails */
.product-details {
  display: flex;
  gap: 1.5rem; /* Réduction de l'écart entre les sections */
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem; /* Réduction du padding interne */
}

/* Image produit */
.product-image img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Infos produit */
.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem; /* Espacement réduit entre les éléments */
}

.product-title {
  font-size: 1.6rem; /* Taille plus compacte */
  font-weight: 600;
  color: #333;
}

.product-price {
  font-size: 1.4rem;
  font-weight: bold;
  color: #0d6efd;
}

.product-description {
  font-size: 0.95rem; /* Texte légèrement plus petit */
  line-height: 1.4;
  color: #555;
}

.product-meta {
  font-size: 0.85rem; /* Texte secondaire réduit */
  color: #666;
}

.product-stock {
  font-size: 1rem;
  font-weight: bold;
}

.in-stock {
  color: #28a745;
}

.out-of-stock {
  color: #dc3545;
}

/* Boutons */
.product-actions {
  display: flex;
  gap: 0.5rem; /* Réduction de l'espacement entre les boutons */
}

.btn {
  padding: 0.5rem 1rem; /* Boutons compacts */
  font-size: 0.95rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
}

.btn-secondary:hover {
  background-color: #495057;
}

/* Section avis */
.product-reviews {
  margin-top: 2rem; /* Espacement réduit pour la section des avis */
  background: white;
  border-radius: 6px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.product-reviews h2 {
  font-size: 1.4rem; /* Taille plus petite */
  font-weight: bold;
  margin-bottom: 1rem;
}

.review {
  border-bottom: 1px solid #ddd;
  padding: 0.8rem 0;
}

.review-author {
  font-weight: bold;
}

.review-comment {
  font-size: 0.85rem; /* Texte des avis réduit */
  color: #555;
}

.review:last-child {
  border-bottom: none;
}
</style>
