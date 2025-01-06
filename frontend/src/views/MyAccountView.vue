<template>
    <div class="my-account-view">
      <section class="account-header">
        <h1>Mon compte</h1>
        <p>Bienvenue, {{ user.name }} !</p>
      </section>
  
      <section class="account-details">
        <div class="profile-info">
          <h2>Informations personnelles</h2>
          <div class="profile-field">
            <label for="name">Nom</label>
            <p>{{ user.name }}</p>
          </div>
          <div class="profile-field">
            <label for="email">Email</label>
            <p>{{ user.email }}</p>
          </div>
          <div class="profile-field">
            <label for="phone">Téléphone</label>
            <p>{{ user.phone }}</p>
          </div>
          <button @click="editProfile" class="edit-profile-btn">Modifier mon profil</button>
        </div>
  
        <div class="order-history">
          <h2>Historique des commandes</h2>
          <div v-if="orders.length === 0" class="no-orders">
            <p>Aucune commande passée pour le moment.</p>
          </div>
          <ul>
            <li v-for="order in orders" :key="order.id" class="order-item">
              <p>Commande #{{ order.id }} - {{ order.status }} - {{ order.total }} €</p>
              <button @click="viewOrderDetails(order.id)" class="view-order-btn">Voir les détails</button>
            </li>
          </ul>
        </div>
  
        <div class="change-password">
          <h2>Modifier le mot de passe</h2>
          <button @click="changePassword" class="change-password-btn">Changer le mot de passe</button>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          phone: '+1234567890',
        },
        orders: [
          { id: 1, status: 'Livré', total: 59.99 },
          { id: 2, status: 'En cours', total: 25.50 },
          { id: 3, status: 'Annulé', total: 19.99 },
        ],
      };
    },
    methods: {
      editProfile() {
        // Logique pour modifier le profil
        this.$router.push({ name: 'edit-profile' });
      },
      viewOrderDetails(orderId) {
        // Logique pour afficher les détails de la commande
        this.$router.push({ name: 'order-details', params: { id: orderId } });
      },
      changePassword() {
        // Logique pour changer le mot de passe
        this.$router.push({ name: 'change-password' });
      },
    },
  };
  </script>
  
  <style scoped>
  .my-account-view {
    padding: 2rem;
  }
  
  .account-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .account-header h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .account-header p {
    font-size: 1.1rem;
    color: #555;
  }
  
  .account-details {
    background-color: #fff;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .profile-info,
  .order-history,
  .change-password {
    margin-bottom: 2rem;
  }
  
  .profile-info h2,
  .order-history h2,
  .change-password h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .profile-field {
    margin-bottom: 1rem;
  }
  
  .profile-field label {
    font-weight: bold;
  }
  
  .profile-field p {
    font-size: 1.1rem;
    color: #333;
  }
  
  .edit-profile-btn,
  .change-password-btn,
  .view-order-btn {
    padding: 0.8rem 1.5rem;
    font-size: 1.1rem;
    color: #fff;
    background-color: #066f50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 1rem;
  }
  
  .edit-profile-btn:hover,
  .change-password-btn:hover,
  .view-order-btn:hover {
    background-color: #00bd7e;
  }
  
  .order-item {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
  }
  
  .order-item p {
    font-size: 1.1rem;
  }
  
  .no-orders {
    font-size: 1.1rem;
    color: #888;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    .account-details {
      padding: 1.5rem;
    }
  }
  </style>
  