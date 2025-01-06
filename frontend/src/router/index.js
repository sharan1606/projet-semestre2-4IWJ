import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/produits',
      name: 'produits',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/produits/:id',
      name: 'produit',
      component: () => import('../views/ProductDetailsView.vue'),
      props: true,  // Permet de passer l'ID du produit comme prop
    },
    {
      path: '/panier',
      name: 'panier',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/MyAccountView.vue')
      },
    {
      path: '/administrate',
      name: 'administrate',
      component: () => import('../views/AdminView.vue')
    },
    {
      path:'/mentions-legales',
      name:'mentions-legales',
      component: () => import('../views/LegalMentionView.vue')
    },
    {
      path:'/privacy-policy',
      name:'privacy-policy',
      component: () => import('../views/PrivacyPolicy.vue')
      },
    {
      path:'/cgv',
      name:'cgv',
      component: () => import('../views/Cgv.vue')
    },
    {
      path:'/cookies',
      name:'cookies',
      component: () => import('../views/Cookies.vue')
    },
    {
      path:'/delivery',
      name:'livraison',
      component: () => import('../views/Delivery.vue')
      },
    {
      path:'/retours',
      name:'retours',
      component: () => import('../views/Retours.vue')
      },
    {
      path:'/contact',
      name:'contact',
      component: () => import('../views/Contact.vue')
      },

    // {
    //   path: "/forgot-password",
    //   name: "ForgotPassword",
    //   component: ForgotPasswordView,
    // }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next("/login"); // Redirige vers la page de connexion si pas de token
  } else {
    next(); // Autorise la navigation
  }
});


export default router
