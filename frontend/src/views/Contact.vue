<template>
    <div class="customer-support">
      <h1>Support Client</h1>
  
      <section>
        <h2>Contactez-nous</h2>
        <p>
          Nous sommes là pour vous aider ! Si vous avez des questions, des préoccupations ou des problèmes concernant votre commande, veuillez utiliser le formulaire ci-dessous pour nous contacter.
        </p>
      </section>
  
      <section>
        <h2>Formulaire de Contact</h2>
        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-group">
            <label for="name">Nom :</label>
            <input type="text" id="name" v-model="formData.name" required />
          </div>
  
          <div class="form-group">
            <label for="email">Adresse Email :</label>
            <input type="email" id="email" v-model="formData.email" required />
          </div>
  
          <div class="form-group">
            <label for="subject">Sujet :</label>
            <select id="subject" v-model="formData.subject" required>
              <option value="">-- Sélectionnez un sujet --</option>
              <option value="commande">Problème de commande</option>
              <option value="produit">Question sur un produit</option>
              <option value="retour">Demande de retour</option>
              <option value="autre">Autre</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="message">Message :</label>
            <textarea id="message" v-model="formData.message" rows="5" required></textarea>
          </div>
  
          <button type="submit" class="submit-button">Envoyer</button>
        </form>
      </section>
  
      <footer>
        <p>
          Vous pouvez également nous contacter par email à :
          <a href="mailto:support@sparq-accessoires.com">support@sparq-accessoires.com</a>
        </p>
        <p>
          Dernière mise à jour : 6 janvier 2025.
        </p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "CustomerSupport",
    data() {
      return {
        formData: {
          name: "",
          email: "",
          subject: "",
          message: "",
        },
      };
    },
    methods: {
      handleSubmit() {
        // Simuler l'envoi du formulaire
        alert(`Merci ${this.formData.name}, nous avons bien reçu votre message concernant "${this.formData.subject}" : "${this.formData.message}"`);
        // Réinitialiser le formulaire
        this.formData = {
          name: "",
          email: "",
          subject: "",
          message: "",
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .customer-support {
    max-width: 900px;
    margin: 2rem auto;
    padding: 2rem;
    background: #ffffff;
    border-radius: 10px;
    font-family: 'Helvetica', Arial, sans-serif;
    color: #333;
    line-height: 1.6;
  }
  
  h1 {
    font-size: 2rem;
    text-align: center;
    color: #2c3e50;
    margin-bottom: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
    color: #34495e;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #ffffff;
  }
  
  button {
    background-color: #3498db;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  
  footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #ecf0f1;
    font-size: 0.9rem;
    color: #7f8c8d;
  }
  </style>
  