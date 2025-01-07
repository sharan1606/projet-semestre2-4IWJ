const state = {
    cart: [],
  };
  
  const getters = {
    cartItems: (state) => state.cart,
    totalItems: (state) => state.cart.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) =>
      state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
  };
  
  const mutations = {
    ADD_TO_CART(state, product) {
      const item = state.cart.find((p) => p.id === product.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    UPDATE_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find((p) => p.id === productId);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
  };
  
  const actions = {
    addToCart({ commit }, product) {
      commit("ADD_TO_CART", product);
    },
    removeFromCart({ commit }, productId) {
      commit("REMOVE_FROM_CART", productId);
    },
    updateQuantity({ commit }, payload) {
      commit("UPDATE_QUANTITY", payload);
    },
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };
  