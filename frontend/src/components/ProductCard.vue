<template>
    <div class="product-card">
      <img
        :src="product.image"
        :alt="`Image du produit ${product.name}`"
        class="product-image"
      />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price }} €</p>
      <div class="card-buttons">
        <button @click="addToCart" class="add-to-cart">Ajouter au panier</button>
        <button @click="goToDetails" class="view-details">Voir les détails</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Product } from '../types/product';
  
  export default defineComponent({
    props: {
      product: {
        type: Object as PropType<Product>,
        required: true,
      },
    },
    methods: {
      addToCart() {
        this.$emit('add-to-cart', this.product);
      },
      goToDetails() {
        this.$router.push(`/product-details/${this.product.idProduct}`); // Navigation vers les détails
      },
    },
  });
  </script>
  