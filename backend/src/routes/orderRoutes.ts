import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";

const router = express.Router();

router.get("/", getAllOrders); // Récupérer toutes les commandes
router.get("/:id", getOrderById); // Récupérer une commande par ID
router.post("/", createOrder); // Créer une nouvelle commande
router.put("/:id", updateOrder); // Mettre à jour une commande
router.delete("/:id", deleteOrder); // Supprimer une commande

export default router;
