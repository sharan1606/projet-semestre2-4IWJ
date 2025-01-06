<template>
  <div class="admin-dashboard">
    <h1>Tableau de bord Administratif</h1>

    <div class="admin-sections">
      <div class="graph-section admin-card">
        <h2>Graphique des ventes</h2>
        <div class="chart-container">
          <canvas id="salesChart"></canvas>
        </div>
        <p class="sales-info">Les ventes mensuelles ont augmenté de 20% par rapport au mois dernier. Vous êtes sur la bonne voie pour atteindre vos objectifs annuels !</p>
        <button class="action-button" @click="navigateToStats">Voir les statistiques détaillées</button>
      </div>

      <div class="stock-section admin-card">
        <h2>Produits en rupture de stock</h2>
        <ul>
          <li v-for="product in outOfStockProducts" :key="product.id">
            {{ product.name }} - {{ product.category }}
          </li>
        </ul>
        <p class="out-of-stock-info">Ces produits sont en rupture de stock. Veuillez envisager de réapprovisionner ces articles pour éviter des pertes de vente.</p>
        <button class="action-button" @click="navigateToProducts">Voir tous les produits</button>
      </div>

      <div class="orders-section admin-card">
        <h2>Commandes en attente</h2>
        <ul>
          <li v-for="order in pendingOrders" :key="order.id">
            Commande #{{ order.id }} - {{ order.total }} € - {{ order.status }}
          </li>
        </ul>
        <p class="pending-orders-info">Il y a actuellement 5 commandes en attente. Assurez-vous de les traiter dans les plus brefs délais.</p>
        <button class="action-button" @click="navigateToOrders">Voir les commandes en détail</button>
      </div>

      <div class="users-section admin-card">
        <h2>Derniers utilisateurs inscrits</h2>
        <ul>
          <li v-for="user in lastUsers" :key="user.id">
            {{ user.name }} - {{ user.email }} - Inscrit le : {{ user.date }}
          </li>
        </ul>
        <p class="new-users-info">Bienvenue aux derniers utilisateurs inscrits ! Il est essentiel de les engager pour renforcer la communauté.</p>
      </div>
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
  data() {
    return {
      outOfStockProducts: [
        { id: 1, name: 'Coque iPhone 14', category: 'Accessoires Apple' },
        { id: 2, name: 'Chargeur sans fil', category: 'Accessoires Samsung' },
        { id: 3, name: 'Etui OnePlus 9', category: 'Accessoires OnePlus' }
      ],
      pendingOrders: [
        { id: 101, total: 59.99, status: 'En attente' },
        { id: 102, total: 79.49, status: 'En attente' },
        { id: 103, total: 120.00, status: 'En attente' },
        { id: 104, total: 45.99, status: 'En attente' },
        { id: 105, total: 89.99, status: 'En attente' }
      ],
      lastUsers: [
        { id: 1, name: 'Marie Dupont', email: 'marie@example.com', date: '2025-01-01' },
        { id: 2, name: 'Jean Martin', email: 'jean@example.com', date: '2025-01-02' },
        { id: 3, name: 'Lucie Lefevre', email: 'lucie@example.com', date: '2025-01-03' }
      ]
    };
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

<style>
.admin-dashboard {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  font-family: 'Roboto', sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.admin-sections {
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(300px, 1fr));
  gap: 50px;
}

.admin-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.admin-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.admin-card h2 {
  color: #34495e;
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.sales-info, .out-of-stock-info, .pending-orders-info, .new-users-info {
  color: #7f8c8d;
  font-size: 0.95rem;
  margin-top: 1rem;
}

.action-button {
  background-color: #3498db;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s, transform 0.3s;
}

.action-button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

.chart-container {
  position: relative;
  height: 300px;
  margin-bottom: 1rem;
}
</style>
