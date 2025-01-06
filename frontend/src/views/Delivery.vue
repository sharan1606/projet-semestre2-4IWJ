<template>
    <div class="delivery-policy">
      <h1>Livraison via Chronopost</h1>
      <section>
        <h2>Introduction</h2>
        <p>
          Chez <strong>Sparq</strong>, nous avons choisi Chronopost comme partenaire de livraison pour garantir des expéditions rapides, fiables et sécurisées. Cette section vous explique les modalités de livraison et ce à quoi vous pouvez vous attendre.
        </p>
      </section>
  
      <section>
        <h2>Zones de Livraison</h2>
        <p>
          Chronopost dessert la zone suivante pour les commandes passées sur notre site : France métropolitaine
        </p>
        <p>
          Si vous souhaitez une livraison hors de cette zone, veuillez nous contacter pour vérifier les options disponibles.
        </p>
      </section>
  
      <section>
        <h2>Délais de Livraison</h2>
        <p>
          Les délais de livraison estimés avec Chronopost sont les suivants :
        </p>
        <ul>
          <li><strong>France métropolitaine :</strong> 24 à 48 heures ouvrées</li>
          <li><strong>Corse et Monaco :</strong> 48 à 72 heures ouvrées</li>
          <li><strong>Union européenne :</strong> 3 à 5 jours ouvrés</li>
        </ul>
        <p>
          Notez que les commandes passées avant 14h seront expédiées le jour même (hors week-ends et jours fériés).
        </p>
      </section>
  
      <section>
        <h2>Suivi des Commandes</h2>
        <p>
          Une fois votre commande expédiée, vous recevrez un numéro de suivi par email. Vous pouvez suivre l’état de votre livraison directement sur le site de Chronopost à l’adresse suivante :
        </p>
        <p>
          <a href="https://www.chronopost.fr/" target="_blank">https://www.chronopost.fr/</a>
        </p>
      </section>
  
      <section>
        <h2>Frais de Livraison</h2>
        <p>
          Les frais de livraison varient en fonction du poids de votre commande et de votre zone géographique. Voici une estimation :
        </p>
        <ul>
          <li><strong>France métropolitaine :</strong> À partir de 8,90 €</li>
          <li><strong>Union européenne :</strong> À partir de 14,90 €</li>
        </ul>
        <p>
          Les frais exacts seront calculés lors du passage de votre commande.
        </p>
      </section>
  
      <section>
        <h2>Problèmes de Livraison</h2>
        <p>
          Si vous rencontrez un problème avec votre livraison, veuillez nous contacter dès que possible à : <a href="mailto:contact@sparq-accessoires.com">contact@sparq-accessoires.com</a>. Nous travaillerons avec Chronopost pour résoudre la situation rapidement.
        </p>
      </section>
  
      <footer>
        <p>
          Pour toute question concernant la livraison via Chronopost, contactez-nous à : <a href="mailto:contact@sparq-accessoires.com">contact@sparq-accessoires.com</a>.
        </p>
        <p>
          Dernière mise à jour : 6 janvier 2025.
        </p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChronopostDelivery",
  };
  </script>
  
  <style scoped>
  .delivery-policy {
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
  
  p, ul {
    font-size: 1rem;
    color: #555;
    margin-bottom: 1.5rem;
  }
  
  ul {
    list-style: disc;
    padding-left: 1.5rem;
  }
  
  a {
    color: #3498db;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
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
  