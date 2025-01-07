<template>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3 v-if="!isLoading && !errorMessage">Êtes-vous sûr de vouloir supprimer cet utilisateur ?</h3>
        <h3 v-if="errorMessage">{{ errorMessage }}</h3>
        <div class="modal-actions">
          <button v-if="isLoading" disabled>Chargement...</button>
          <button v-if="!isLoading && !errorMessage" @click="confirmDelete">Confirmer</button>
          <button v-if="!isLoading && !errorMessage" @click="cancelDelete">Annuler</button>
          <button v-if="!isLoading && errorMessage" @click="cancelDelete">Fermer</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showModal: Boolean, 
      userToDelete: Object 
    },
    data() {
      return {
        isLoading: false, 
        errorMessage: null 
      };
    },
    methods: {
      confirmDelete() {
        this.isLoading = true; 
        this.errorMessage = null; 
        this.$emit('confirm-delete', this.userToDelete);
      },
      cancelDelete() {
        this.isLoading = false; 
        this.errorMessage = null; 
        this.$emit('cancel-delete');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    width: 100%;
    text-align: center;
  }
  
  .modal h3 {
    margin-bottom: 20px;
  }
  
  .modal-actions {
    display: flex;
    justify-content: space-around;
  }
  
  .modal-actions button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .modal-actions button:hover {
    background-color: #2980b9;
  }
  
  .modal-actions button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  </style>  