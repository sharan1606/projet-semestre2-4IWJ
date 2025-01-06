<template>
    <div class="product-details-view">
      <section class="product-details">
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>
          <p class="product-price">{{ product.price }} €</p>
          <p class="product-description">{{ product.description }}</p>
          
          <!-- Nouvelle section pour la disponibilité du produit -->
          <div class="product-availability">
            <span v-if="product.stock > 0" class="in-stock">En stock</span>
            <span v-else class="out-of-stock">Rupture de stock</span>
          </div>
  
          <!-- Tableau des caractéristiques -->
          <div class="product-specs">
            <h2 class="specs-title">Caractéristiques</h2>
            <table>
              <tbody>
                <tr>
                  <td>Dimensions</td>
                  <td>{{ product.specs.dimensions }}</td>
                </tr>
                <tr>
                  <td>Poids</td>
                  <td>{{ product.specs.weight }}</td>
                </tr>
                <tr>
                  <td>Couleur</td>
                  <td>{{ product.specs.color }}</td>
                </tr>
                <tr>
                  <td>Compatibilité</td>
                  <td>{{ product.specs.compatibility }}</td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Avis clients -->
          <div class="product-reviews">
            <p class="reviews-title">Avis clients</p>
            <div v-for="review in product.reviews" :key="review.id" class="review">
              <p class="reviewer-name">{{ review.name }}</p>
              <p class="review-text">{{ review.comment }}</p>
            </div>
          </div>
  
          <div class="actions">
            <button @click="addToCart(product)" class="add-to-cart">
              Ajouter au panier
            </button>
            <button @click="shareProduct(product)" class="share-btn">
              Partager
            </button>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    props: ['id'],  // Recevoir l'ID du produit comme prop
    data() {
      return {
        product: {},  // Objet pour stocker les détails du produit
      };
    },
    mounted() {
      this.fetchProductDetails(this.id);  // Utiliser l'ID pour récupérer les détails
    },
    methods: {
      fetchProductDetails(id) {
        // Simuler une récupération des données
        const products = [
          { 
            id: 1, 
            name: 'Coque Ultra-Protection', 
            price: 19.99, 
            image: 'https://via.placeholder.com/500x500', 
            description: 'Une coque robuste et légère pour protéger votre téléphone contre les chocs.',
            stock: 15,
            specs: {
              dimensions: '15x8x1 cm',
              weight: '50g',
              color: 'Noir',
              compatibility: 'iPhone 12, iPhone 13, iPhone 14',
            },
            reviews: [
              { id: 1, name: 'Alice', comment: 'Super protection, je suis très satisfait !' },
              { id: 2, name: 'Bob', comment: 'Très bonne qualité, mais un peu cher.' },
            ]
          },
          { 
            id: 2, 
            name: 'Chargeur Rapide', 
            price: 29.99, 
            image: 'https://via.placeholder.com/500x500', 
            description: 'Un chargeur rapide pour des recharges efficaces.',
            stock: 0,
            specs: {
              dimensions: '7x7x2 cm',
              weight: '120g',
              color: 'Blanc',
              compatibility: 'Tous les smartphones avec charge rapide',
            },
            reviews: [
              { id: 1, name: 'Clara', comment: 'Charge très vite, je recommande.' }
            ]
          },
          // ... ajouter plus de produits ici
        ];
        this.product = products.find((prod) => prod.id == id) || {};
      },
      addToCart(product) {
        alert(`${product.name} a été ajouté au panier !`);
      },
      shareProduct(product) {
        alert(`Produit ${product.name} partagé avec succès !`);
      }
    },
  };
  </script>
  
  <style scoped>
  .product-details-view {
    background-color: #f4f4f4;
    padding: 2rem 0;
    display: flex;
    justify-content: center;
  }
  
  .product-details {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    overflow: hidden;
  }
  
  .product-image img {
    max-width: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
  
  .product-info {
    flex: 1;
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .product-title {
    font-size: 2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .product-price {
    font-size: 1.6rem;
    color: #008C62;
    margin-bottom: 1.5rem;
  }
  
  .product-description {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 2rem;
  }
  
  .product-availability {
    margin-bottom: 1.5rem;
  }
  
  .in-stock {
    font-size: 1.2rem;
    color: #3cba54;
    font-weight: bold;
  }
  
  .out-of-stock {
    font-size: 1.2rem;
    color: #d9534f;
    font-weight: bold;
  }
  
  .product-specs {
    margin-bottom: 2rem;
  }
  
  .specs-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  table td {
    padding: 0.8rem;
    border-bottom: 1px solid #eee;
    font-size: 1rem;
  }
  
  table td:first-child {
    font-weight: bold;
  }
  
  .product-reviews {
    margin-bottom: 2rem;
  }
  
  .reviews-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }
  
  .review {
    font-size: 1rem;
    color: #555;
    margin-bottom: 1rem;
  }
  
  .reviewer-name {
    font-weight: bold;
  }
  
  .review-text {
    font-style: italic;
  }
  
  .actions {
    display: flex;
    justify-content: space-between;
  }
  
  .add-to-cart {
    padding: 0.8rem 1.5rem;
    font-size: 1.2rem;
    color: #fff;
    background-color: #066f50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .add-to-cart:hover {
    background-color: #00bd7e;
  }
  
  .share-btn {
    padding: 0.8rem 1.5rem;
    font-size: 1.2rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .share-btn:hover {
    background-color: #0056b3;
  }
  
  @media (max-width: 768px) {
    .product-details {
      flex-direction: column;
      align-items: center;
    }
    
    .product-info {
      margin-left: 0;
      text-align: center;
    }
    
    .product-image img {
      max-width: 80%;
      margin-bottom: 1.5rem;
    }
  }
  </style>
  