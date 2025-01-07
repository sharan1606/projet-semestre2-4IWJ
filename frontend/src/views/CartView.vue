<template>
  <div class="cart-container">
    <!-- Section Hero -->
    <div class="hero-section">
      <h1>Votre Panier</h1>
      <p>Consultez les articles que vous avez ajoutés et passez à la caisse en toute simplicité.</p>
    </div>

    <div class="cart-content">
      <div class="cart-items">
        <h2>Vos Articles</h2>
        <div v-if="cartItems.length === 0" class="empty-cart">
          <p>Votre panier est vide</p>
        </div>
        <div v-else>
          <div v-for="(item, index) in cartItems" :key="item.id" class="cart-item">
            <img :src="item.imageUrl" alt="product" class="cart-item-img" />
            <div class="cart-item-details">
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <div class="cart-item-quantity">
                <button @click="decreaseQuantity(index)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="increaseQuantity(index)">+</button>
              </div>
              <div class="cart-item-price">
                <p>{{ item.price * item.quantity }} €</p>
                <button @click="removeItem(index)" class="remove-item-btn">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <h2>Récapitulatif</h2>
        <div class="promo-code">
          <label for="promoCode">Code promo</label>
          <input type="text" v-model="promoCode" placeholder="Entrez votre code promo" />
          <button @click="applyPromoCode" class="apply-promo-btn">Appliquer</button>
        </div>
        <div class="summary-item">
          <p>Sous-total</p>
          <p>{{ totalPrice }} €</p>
        </div>
        <div class="summary-item">
          <p>Réduction</p>
          <p>{{ discount }} €</p>
        </div>
        <div class="summary-item">
          <p>Total</p>
          <p>{{ totalPrice - discount }} €</p>
        </div>
        <div class="buttons-wrap">
          <div id="paypal-button-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [
        { id: 1, name: 'iPhone Case', description: 'Protection en silicone', price: 19.99, quantity: 2, imageUrl: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MT1L3_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1699565910662' },
        { id: 2, name: 'Samsung Galaxy Case', description: 'Coque robuste', price: 25.99, quantity: 1, imageUrl: 'https://www.sbsmobile.com/fra/312873-thickbox_default/coque-ultra-resistante-pour-samsung-galaxy-a55-avec-technologie-d3o.jpg' },
      ],
      promoCode: '',
      discount: 0,
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
  mounted() {
    this.loadPayPalScript();
  },
  methods: {
    loadPayPalScript() {
      if (!document.getElementById("paypal-script")) {
        const script = document.createElement("script");
        script.id = "paypal-script";
        script.src = "https://www.paypal.com/sdk/js?client-id=AX8lz8zTTp-cVanlxKf3zryBEimzkR7CHGOXxS65hAm1vVQXQtKGuXv6JMk5WWcOLAcWweX5gNQoMuda&components=buttons";
        script.onload = () => this.initializePayPalButton();
        document.body.appendChild(script);
      } else {
        this.initializePayPalButton();
      }
    },
    initializePayPalButton() {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder(data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '0.00',  // Montant de la commande
                },
              }],
            });
          },
          onApprove(data, actions) {
            return actions.order.capture().then(function(details) {
              alert('Paiement effectué par ' + details.payer.name.given_name);
            });
          },
          onError(err) {
            console.error('Erreur PayPal:', err);
          }
        }).render('#paypal-button-container');
      } else {
        console.error('Le script PayPal n\'est pas chargé.');
      }
    },
    increaseQuantity(index) {
      this.cartItems[index].quantity++;
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
    },
    applyPromoCode() {
      if (this.promoCode.toLowerCase() === 'promo10') {
        this.discount = this.totalPrice * 0.10;
      } else if (this.promoCode.toLowerCase() === 'offre20') {
        this.discount = 20;
      } else {
        this.discount = 0;
        alert('Code promo invalide');
      }
    },
    continueShopping() {
      this.$router.push('/shop');
    },
  }
};
</script>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

.hero-section {
  background: linear-gradient(to right, #066F50, #C9CBCF);
  padding: 60px 20px;
  text-align: center;
  margin-bottom: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.hero-section h1 {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
}

.hero-section p {
  font-size: 18px;
  color: #fff;
}

.cart-content {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
}

.cart-items {
  flex: 1;
  margin-right: 20px;
}

.cart-item {
  display: flex;
  margin-bottom: 20px;
}

.cart-item-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 15px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.cart-item-quantity button {
  padding: 5px 10px;
  margin: 0 5px;
  font-size: 16px;
}

.cart-item-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.remove-item-btn {
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}

.cart-summary {
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f1f1f1;
}

.promo-code {
  margin-bottom: 20px;
}

.promo-code input {
  width: 92%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.apply-promo-btn {
  padding: 10px 20px;
  margin: 10px 0px;
  display: flex;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.apply-promo-btn:hover {
  opacity: 0.8;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.buttons-wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.continue-shopping-btn,
.checkout-btn {
  width: 100%;
  padding: 12px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.continue-shopping-btn {
  background-color: #007bff;
}

.checkout-btn {
  background-color: #28a745;
}

.continue-shopping-btn:hover,
.checkout-btn:hover {
  opacity: 0.8;
}
</style>