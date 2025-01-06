<script setup>
<<<<<<< HEAD
import TheWelcome from '../components/TheWelcome.vue'
console.log('TheWelcome component imported:', Test);
=======
import { ref } from 'vue';

const testimonials = ref([
  {
    name: 'Alice Dupont',
    review: 'Super expérience ! Les produits sont de qualité et le service est impeccable.',
    image: 'https://via.placeholder.com/80',
  },
  {
    name: 'Jean Martin',
    review: 'Commande facile et livraison rapide. Je recommande fortement !',
    image: 'https://via.placeholder.com/80',
  },
  {
    name: 'Sophie Durand',
    review: 'Un site vraiment moderne et des produits innovants.',
    image: 'https://via.placeholder.com/80',
  },
]);
>>>>>>> origin/Develop
</script>

<template>
  <div class="homepage">
    <!-- Section Hero -->
    <section class="hero">
      <div class="hero-content">
        <h1>Bienvenue sur <span>Sparq</span></h1>
        <p>Découvrez des produits uniques et innovants adaptés à votre style de vie.</p>
        <div class="cta-buttons">
          <a href="/produits" class="btn primary">Découvrir les Produits</a>
          <a href="/contact" class="btn secondary">Contactez-nous</a>
        </div>
      </div>
    </section>

    <!-- Section Produits phares -->
    <section class="featured-products">
      <h2>Nos Produits Phares</h2>
      <div class="product-grid">
        <div class="product-card" v-for="n in 4" :key="n">
          <img :src="'https://via.placeholder.com/300x200?text=Produit+' + n" :alt="'Produit ' + n" />
          <h3>Produit {{ n }}</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <a href="#" class="btn small">Voir plus</a>
        </div>
      </div>
    </section>

    <!-- Section Avis des clients -->
    <section class="testimonials">
      <h2>Ce que disent nos clients</h2>
      <div class="testimonial-grid">
        <div class="testimonial-card" v-for="testimonial in testimonials" :key="testimonial.name">
          <img :src="testimonial.image" :alt="testimonial.name" />
          <h3>{{ testimonial.name }}</h3>
          <p>"{{ testimonial.review }}"</p>
        </div>
      </div>
    </section>

    <!-- Section Contact -->
    <section class="contact-banner">
      <h2>Envie d'en savoir plus ?</h2>
      <p>Notre équipe est disponible pour répondre à toutes vos questions.</p>
      <a href="/contact" class="btn secondary cta-buttons">Contactez-nous</a>
    </section>
  </div>
</template>

<style scoped>
/* Section Hero */
.hero {
  background: linear-gradient(to right, #066F50, #C9CBCF);
  color: #fff;
  text-align: center;
  padding: 5rem 1rem;
}
.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.hero-content span {
  color: #066F50;
}
.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}
.cta-buttons .btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  margin: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background 0.3s ease;
}
.btn.primary {
  background: #066F50;
  color: #fff;
}
.btn.primary:hover {
  background: #00bd7e;
}
.btn.secondary {
  background: #fff;
  color: #066F50;
}
.btn.secondary:hover {
  background: #f0f0f0;
}

/* Section Produits Phares */
.featured-products {
  text-align: center;
  padding: 3rem 1rem;
  background-color: #f9f9f9;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
.product-card {
  background: #fff;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.product-card:hover {
  transform: scale(1.05);
}
.product-card img {
  max-width: 100%;
  border-radius: 5px;
  margin-bottom: 1rem;
}
.product-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
.product-card p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}
.product-card .btn {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
}

/* Section Avis des clients */
.testimonials {
  text-align: center;
  padding: 3rem 1rem;
}
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
.testimonial-card {
  background: #fff;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.testimonial-card img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
}
.testimonial-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
.testimonial-card p {
  font-size: 0.9rem;
  color: #666;
}

/* Section Contact */
.contact-banner {
  background: linear-gradient(to right, #066F50, #C9CBCF);
  color: #fff;
  text-align: center;
  padding: 3rem 1rem;
}
.contact-banner h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.contact-banner p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}
</style>
