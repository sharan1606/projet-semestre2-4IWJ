<template>
<div class="admin-dashboard">
  <h1>Tableau de bord Administratif</h1>

  <div class="graph-section">
    <h2>Graphique des ventes</h2>
    <div class="chart-container">
      <canvas id="salesChart"></canvas>
    </div>
    <button class="action-button" @click="navigateToStats">Voir les statistiques</button>
  </div>

  
  <div class="stock-section">
    <h2>Produits en rupture de stock</h2>
    <ul>
      <li v-for="product in outOfStockProducts" :key="product.id">
        {{ product.name }}
      </li>
    </ul>
    <button class="action-button" @click="navigateToProducts">Voir les produits</button>
  </div>

  <div class="orders-section">
    <h2>Commandes en attente</h2>
    <ul>
      <li v-for="order in pendingOrders" :key="order.id">
        {{ order.id }} - {{ order.total }} €
      </li>
    </ul>
    <button class="action-button" @click="navigateToOrders">Voir les commandes</button>
  </div>

  <div class="users-section">
    <h2>Derniers utilisateurs inscrits</h2>
    <ul>
      <li v-for="user in lastUsers" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);
  
  export default {
    name: "AdminDashboard",
    components: {
      LineChart: Line
    },
    methods: {
      navigateToUsers() {
        this.$router.push("/admin/users");
      },
      navigateToOrders() {
        this.$router.push("/admin/orders");
      },
      navigateToStats() {
        this.$router.push("/admin/stats");
      },
      navigateToProducts() {
        this.$router.push("/admin/products");
      }
    },
    mounted() {
      this.renderSalesChart();
    },
    methods: {
      renderSalesChart() {
        const ctx = document.getElementById('salesChart');
        new ChartJS(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Ventes mensuelles',
                data: [12, 19, 3, 5, 2, 3, 7, 8, 6, 4, 9, 10],
                fill: false,
                borderColor: '#3498db',
                tension: 0.1
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                beginAtZero: true
              },
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .admin-dashboard {
    max-width: 100%;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 10px;
    font-family: 'Roboto', sans-serif;
  }
  
  h1 {
    text-align: center;
    color: #333;
    font-size: 2rem;
    font-weight: 600;
  }
  
  .admin-sections {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-around;
  }
  
  .admin-section {
    border-radius: 8px;
  }
  
  .admin-section h2 {
    color: #333;
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  .action-button {
    background-color: #3498db;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .action-button:hover {
    background-color: #2980b9;
  }
  
  .chart-container {
    position: relative;
    height: 300px;
    margin-bottom: 1rem;
  }
  </style>
  