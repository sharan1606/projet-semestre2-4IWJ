<template>
  <div class="admin-dashboard">
    <h1>Tableau de bord Administratif</h1>

    <div class="admin-sections">
      <!-- Gestion des Utilisateurs -->
      <div class="admin-section">
        <h2>Gestion des Utilisateurs</h2>
        <button class="action-button" @click="navigateToUsers">Voir les utilisateurs</button>
        <!-- Tableau des utilisateurs -->
        <table v-if="users.length > 0" class="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Solde</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <td>{{ user._id }}</td>
              <td>{{ user.firstname }} {{ user.lastname }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.solde }}€</td>
              <td>{{ user.isVerified ? 'Vérifié' : 'Non vérifié' }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>Aucun utilisateur trouvé.</p>
      </div>

      <!-- Gestion des Commandes -->
      <div class="admin-section">
        <h2>Gestion des Commandes</h2>
        <button class="action-button" @click="navigateToOrders">Voir les commandes</button>
      </div>

      <!-- Statistiques -->
      <div class="admin-section">
        <h2>Statistiques</h2>
        <div class="chart-container">
          <canvas id="salesChart"></canvas>
        </div>
        <button class="action-button" @click="navigateToStats">Voir les statistiques</button>
      </div>

      <!-- Gestion des Produits -->
      <div class="admin-section">
        <h2>Gestion des Produits</h2>
        <button class="action-button" @click="navigateToProducts">Voir les produits</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import axios from 'axios'; // Importer axios

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

export default {
  name: "AdminDashboard",
  components: {
    LineChart: Line
  },
  data() {
    return {
      users: [] // Tableau pour stocker les utilisateurs
    };
  },
  methods: {
    // Navigation
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
    },

    // Méthode pour récupérer les utilisateurs depuis l'API
    fetchUsers() {
      axios.get('http://152.42.132.157:5000/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}` // Ajouter le token JWT dans l'en-tête
        }
      })
      .then(response => {
        this.users = response.data; // Stocker les utilisateurs dans la variable "users"
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      });
    }
  },
  mounted() {
    this.fetchUsers(); // Appeler la méthode pour récupérer les utilisateurs lors du montage du composant
    this.renderSalesChart(); // Afficher le graphique des ventes
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

.user-table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

.user-table th, .user-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table th {
  background-color: #3498db;
  color: white;
}
</style>
