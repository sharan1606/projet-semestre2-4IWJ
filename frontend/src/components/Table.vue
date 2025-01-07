<template>
    <div>
      <div class="table-actions">
        <input v-model="searchQuery" type="text" placeholder="Rechercher..." @input="searchData">
      </div>
  
      <table>
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index">
              <span @click="sortData(column.field)">
                {{ column.label }}
                <span v-if="sortField === column.field">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
              </span>
              <input v-if="searchableColumns.includes(column.field)" v-model="column.search" @input="searchData" placeholder="Recherche..." />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in paginatedData" :key="index">
            <td v-for="(column, colIndex) in columns" :key="colIndex">
              {{ row[column.field] }}
            </td>
            <td>
              <button @click="viewRow(row)">Voir</button>
              <button @click="editRow(row)">Éditer</button>
              <button @click="deleteRow(row)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Précédent</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Suivant</button>
      </div>
  
      <button @click="exportCSV" :disabled="selectedRows.length === 0">Exporter en CSV</button>
  
      <div>
        <input type="checkbox" v-model="selectAll" @change="selectAllRows" /> Sélectionner tout
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        data: [],
        selectedRows: [], 
        searchQuery: '',
        sortField: null,
        sortDirection: 'asc', 
        currentPage: 1,
        itemsPerPage: 10, 
        columns: [
          { label: 'Nom', field: 'name', searchable: true },
          { label: 'Email', field: 'email', searchable: true },
          { label: 'Date d\'inscription', field: 'dateInscription', searchable: false }
        ],
        searchableColumns: ['name', 'email'], 
        selectAll: false,
      };
    },
    computed: {
      filteredData() {
        if (!this.searchQuery) return this.data;
        return this.data.filter(row => {
          return Object.keys(row).some(key =>
            row[key].toString().toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        });
      },
      sortedData() {
        if (!this.sortField) return this.filteredData;
        return this.filteredData.sort((a, b) => {
          const valueA = a[this.sortField];
          const valueB = b[this.sortField];
          if (this.sortDirection === 'asc') {
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
          } else {
            return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
          }
        });
      },
      paginatedData() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.sortedData.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.filteredData.length / this.itemsPerPage);
      }
    },
    methods: {
      sortData(field) {
        if (this.sortField === field) {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortField = field;
          this.sortDirection = 'asc';
        }
      },
      searchData() {
        this.filteredData; 
      },
      changePage(page) {
        if (page > 0 && page <= this.totalPages) {
          this.currentPage = page;
        }
      },
      exportCSV() {
        const headers = this.columns.map(column => column.label);
        const rows = this.selectedRows.length ? this.selectedRows : this.data;
        let csvContent = headers.join(',') + '\n';
  
        rows.forEach(row => {
          const rowData = this.columns.map(column => row[column.field] || '');
          csvContent += rowData.join(',') + '\n';
        });
  
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'data.csv';
        link.click();
      },
      viewRow(row) {
        console.log('Voir:', row);
      },
      editRow(row) {
        console.log('Éditer:', row);
      },
      deleteRow(row) {
        this.data = this.data.filter(item => item !== row);
        this.selectedRows = this.selectedRows.filter(item => item !== row);
      },
      selectAllRows() {
        if (this.selectAll) {
          this.selectedRows = [...this.data];
        } else {
          this.selectedRows = [];
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .table-actions input {
    margin-bottom: 10px;
    padding: 5px;
    width: 200px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ccc;
  }
  
  th {
    cursor: pointer;
  }
  
  .pagination {
    margin-top: 10px;
  }
  
  button {
    padding: 8px 16px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  </style>
  