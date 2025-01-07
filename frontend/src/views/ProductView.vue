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
  </template>
 
<script>
  export default {
    data() {
      return {
        products: [
          { id: 1, name: 'Coque Ultra-Protection', price: 19.99, image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MT1L3_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1699565910662', category: 'Accessoires' },
          { id: 2, name: 'Chargeur Rapide', price: 29.99, image: 'https://imgs.search.brave.com/MmenQlAzZmKqYLJFd58g5eCUj9CtO7eV9bTQcbINObU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hcGku/YWxsLWJhdHRlcmll/cy5mci9JTlRFUlNI/T1Avc3RhdGljL1dG/Uy9VcGVyZ3ktQWxs/YmF0dGVyaWVzRlIt/U2l0ZS8tL1VwZXJn/eS9mcl9GUi9ML0dD/VjkwNDhfMV9MLmpw/Zw', category: 'Chargeurs' },
          { id: 3, name: 'Écouteurs Bluetooth', price: 49.99, image: 'https://imgs.search.brave.com/6T56yCgVFEJiP7OO1Nk6gLFr-zhlg9cJSrO4SE7Ip5c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFUa1hnWGhRbkwu/anBn', category: 'Audio' },
          { id: 4, name: 'Support Téléphone Voiture', price: 14.99, image: 'https://imgs.search.brave.com/CbwMsjmmGOpoOK0SHwY4L6TEJ36LWqnJ53z2kbEK_OU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFxS1o4a1N1a0wu/anBn', category: 'Supports' },
          { id: 5, name: 'Kit de Nettoyage', price: 9, image: 'https://imgs.search.brave.com/3lKDcQkRIGvedLnYaD694XE6gQYJFKKJsT2GLx0iLrA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFjWml1YTA1WEwu/anBn', category: 'Accessoires' },
          { id: 6, name: 'Câble USB-C', price: 12.99, image: 'https://media.startech.com/cms/products/gallery_large/ucc-3m-10g-usb-cable.main.jpg', category: 'Chargeurs' },
          { id: 7, name: 'Enceinte Bluetooth', price: 59.99, image: 'https://m.media-amazon.com/images/I/61l6NfpdOwL.jpg', category: 'Audio' },
          { id: 8, name: 'Support Tablette', price: 24.99, image: 'https://static.fnac-static.com/multimedia/Images/2B/2B/FA/C0/12646955-3-1520-1/tsp20200131011935/UGREEN-Support-Tablette-Telephone-Reglable-Compatible-iPhone-XS-Max-XR-X-8-7-6-Plus-iPad-Pro-iPad-Air-iPad-Mini-Samsung-Tablette-Nintendo-Switch-Blanc.jpg', category: 'Supports' },
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
/* Section Hero */
.hero {
  background: linear-gradient(to right, #0d6f51, #a6d4cf);
  color: #fff;
  text-align: center;
  padding: 6rem 1.5rem;
  border-radius: 10px;
  margin-bottom: 3rem;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.hero-content p {
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  color: #f0f0f0;
}

.cta-buttons .btn {
  display: inline-block;
  padding: 0.8rem 1.8rem;
  margin: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.btn.primary {
  background: #00b07c;
  color: #fff;
}

.btn.primary:hover {
  background: #01996a;
  transform: translateY(-3px);
}

.btn.secondary {
  background: #fff;
  color: #0d6f51;
  border: 2px solid #0d6f51;
}

.btn.secondary:hover {
  background: #e6f3ef;
  color: #0a5c45;
}

/* Section Contact */
.contact-section {
  text-align: center;
  padding: 4rem 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 3rem;
}

.contact-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  color: #066f50;
}

.contact-section p {
  font-size: 1.4rem;
  margin-bottom: 2rem;
  color: #555;
}

.contact-button {
  padding: 0.8rem 1.5rem;
  font-size: 1.3rem;
  color: white;
  background-color: #00b07c;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.contact-button:hover {
  background-color: #01996a;
  transform: translateY(-3px);
}

/* Section Filtres */
.filters {
  display: flex;
  gap: 1.5rem;
  margin: 3rem 0;
  justify-content: center;
  align-items: center;
}

.search-bar {
  padding: 1rem;
  font-size: 1.2rem;
  width: 400px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-filter {
  padding: 1rem;
  font-size: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 4rem;
  margin: 3rem auto;
  padding: 0 2rem;
  max-width: 1200px;
}

.product-view {
  margin-bottom: 5rem;
}

.product-card {
  border: none;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.product-name {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #0d6f51;
  margin-bottom: 1.5rem;
}

.card-buttons {
  display: flex;
  justify-content: space-between; 
  gap: 0.8rem; 
  margin-top: 1rem;
}

.add-to-cart,
.view-details {
  flex: 1; 
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #00b07c;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
}

.add-to-cart:hover {
  background-color: #01996a;
}

.view-details {
  background-color: #0a6fdf;
}

.view-details:hover {
  background-color: #005cb8;
}

</style>