<template>
    <div class="legal-mentions">
      <h1>Mentions Légales</h1>
      <section>
        <h2>Informations sur l'Éditeur</h2>
        <p>
          Ce site est édité par : <strong>Sparq</strong><br />
          Siège social : 15 Rue des Innovateurs, 75010 Paris, France<br />
          Téléphone : +33 1 23 45 67 89<br />
          Email : <a href="mailto:contact@sparq-accessoires.com">contact@sparq-accessoires.com</a><br />
          SIRET : 123 456 789 00010
        </p>
      </section>
  
      <section>
        <h2>Hébergement</h2>
        <p>
          Ce site est hébergé par : <strong>Amazon Web Services (AWS)</strong><br />
          Adresse : 31 Place des Corolles, 92400 Courbevoie, France<br />
          Téléphone : +33 1 73 01 73 00<br />
          Email : <a href="mailto:support@amazonaws.com">support@amazonaws.com</a>
        </p>
      </section>
  
      <section>
        <h2>Propriété Intellectuelle</h2>
        <p>
          Tout le contenu de ce site (textes, images, logos, vidéos, etc.) est la propriété exclusive de <strong>Sparq</strong>, sauf mention contraire. Toute reproduction, distribution, modification, ou exploitation sans autorisation préalable est strictement interdite.
        </p>
      </section>
  
      <section>
        <h2>Protection des Données</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit d’accès, de rectification, et de suppression de vos données personnelles. Pour exercer ce droit, veuillez nous contacter à l'adresse suivante : 
          <a href="mailto:privacy@sparq-accessoires.com">privacy@sparq-accessoires.com</a>.
        </p>
      </section>
  
      <section>
        <h2>Responsabilité</h2>
        <p>
          Sparq décline toute responsabilité en cas de dommages directs ou indirects résultant de l'accès ou de l'utilisation de ce site, ou des informations qui y sont publiées. Les produits proposés sont conformes à la législation française en vigueur.
        </p>
      </section>
  
      <footer>
        <p>
          © 2024 Sparq. Tous droits réservés.
        </p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "LegalMentions",
  };
  </script>
  
  <style scoped>
  .legal-mentions {
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
  