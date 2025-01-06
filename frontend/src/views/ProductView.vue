<template>
    <div class="product-view">
      <!-- Section Hero -->
      <section class="hero">
        <div class="hero-content">
          <h1>Découvrez Nos Produits Exceptionnels</h1>
          <p>Une collection unique pour répondre à tous vos besoins. Qualité et style garantis.</p>
          <div class="cta-buttons">
            <a href="/produits" class="btn primary">Explorer les Produits</a>
            <a href="/contact" class="btn secondary">Contactez-nous</a>
          </div>
        </div>
      </section>
  
      <!-- Section Contact -->
      <section class="contact-section">
        <h2>Besoin d'aide ou d'informations ?</h2>
        <p>Nous sommes là pour vous aider avec toutes vos questions.</p>
        <button @click="goToContactPage" class="contact-button">Contactez-nous</button>
      </section>
  
      <!-- Section Filtres -->
      <div class="filters">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Rechercher un produit..."
          class="search-bar"
          aria-label="Rechercher un produit"
        />
        <select
          v-model="selectedCategory"
          class="category-filter"
          aria-label="Filtrer par catégorie"
        >
          <option value="">Toutes les catégories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
  
      <!-- Section Produits -->
      <section class="product-grid">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="product-image"
            :aria-label="`Image du produit ${product.name}`"
          />
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price }} €</p>
          <button @click="addToCart(product)" class="add-to-cart">
            Ajouter au panier
          </button>
          <button @click = "goToProductDetailsPage(product.id)"  class = "view-details" >
            Voir les détails
        </button>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          { id: 1, name: 'Coque Ultra-Protection', price: 19.99, image: 'https://via.placeholder.com/200x200', category: 'Accessoires' },
          { id: 2, name: 'Chargeur Rapide', price: 29.99, image: 'https://via.placeholder.com/200x200', category: 'Chargeurs' },
          { id: 3, name: 'Écouteurs Bluetooth', price: 49.99, image: 'https://via.placeholder.com/200x200', category: 'Audio' },
          { id: 4, name: 'Support Téléphone Voiture', price: 14.99, image: 'https://via.placeholder.com/200x200', category: 'Supports' },
          { id: 5, name: 'Kit de Nettoyage', price: 9, image: 'https://via.placeholder.com/200x200', category: 'Accessoires' },
          { id: 6, name: 'Câble USB-C', price: 12.99, image: 'https://via.placeholder.com/200x200', category: 'Chargeurs' },
          { id: 7, name: 'Enceinte Bluetooth', price: 59.99, image: 'https://via.placeholder.com/200x200', category: 'Audio' },
          { id: 8, name: 'Support Tablette', price: 24.99, image: 'https://via.placeholder.com/200x200', category: 'Supports' },
        ],
        categories: ['Accessoires', 'Chargeurs', 'Audio', 'Supports'],
        searchQuery: '',
        selectedCategory: '',
      };
    },
    computed: {
      filteredProducts() {
        return this.products.filter((product) => {
          const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
          return matchesSearch && matchesCategory;
        });
      },
    },
    methods: {
      addToCart(product) {
        alert(`${product.name} a été ajouté au panier !`);
      },
      goToContactPage() {
        this.$router.push('/contact');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles de la page */
  .hero {
    background: linear-gradient(to right, #066F50, #C9CBCF);
    color: #fff;
    text-align: center;
    padding: 5rem 1rem;
  }
  
  .hero-content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .hero-content p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
  
  .cta-buttons .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    margin: 0.5rem;
    font-size: 1rem;
    border-radius: 5px;
    text-decoration: none;
    transition: background 0.3s ease;
  }
  
  .btn.primary {
    background: #00bd7e;
    color: #000;
  }
  
  .btn.primary:hover {
    background: #00bd7e;
  }
  
  .btn.secondary {
    background: #fff;
    color: #066F50;
  }
  
  .btn.secondary:hover {
    background: #f0f0f0;
  }
  
  /* Section Contact */
  .contact-section {
    text-align: center;
    margin: 3rem 0;
  }
  
  .contact-section h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .contact-section p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
  
  .contact-button {
    padding: 0.7rem 1.5rem;
    font-size: 1.2rem;
    color: white;
    background-color: #00bd7e;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .contact-button:hover {
    background-color: #00bd7e;
  }
  
  /* Section Filtres */
  .filters {
    display: flex;
    gap: 1rem;
    margin: 2rem 0;
    justify-content: center;
  }
  
  .search-bar {
    padding: 0.7rem;
    font-size: 1.1rem;
    width: 350px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .category-filter {
    padding: 0.7rem;
    font-size: 1.1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  /* Section Produits */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
    margin-bottom: 3rem;
  }
  
  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }
  
  .product-card:hover {
    transform: scale(1.05);
  }
  
  .product-image {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  
  .product-name {
    font-size: 1.4rem;
    margin: 0.5rem 0;
  }
  
  .product-price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #066f50;
    margin: 0.5rem 0;
  }
  
  .add-to-cart {
    padding: 0.7rem 1.2rem;
    font-size: 1.1rem;
    color: #fff;
    background-color: #066f50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .add-to-cart:hover {
    background-color: #00bd7e;
  }
  
  .view-details {
    margin-top: 1rem;
    display: inline-block;
    padding: 0.5rem 1rem;
    color: #066f50;
    font-weight: bold;
    text-decoration: none;
    border: 1px solid #066f50;
    border-radius: 4px;
    transition: background 0.3s ease;
  }
  
  .view-details:hover {
    background: #066f50;
    color: #fff;
  }
  </style>
  