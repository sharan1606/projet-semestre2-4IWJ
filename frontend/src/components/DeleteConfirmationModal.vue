<template>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</h3>
        <div class="modal-actions">
          <button @click="confirmDelete">Confirmer</button>
          <button @click="cancelDelete">Annuler</button>
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
    methods: {
      confirmDelete() {
        this.$emit('confirm-delete', this.userToDelete);
      },
      cancelDelete() {
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
  </style>
  