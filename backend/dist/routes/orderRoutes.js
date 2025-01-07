"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
router.get("/", orderController_1.getAllOrders); // Récupérer toutes les commandes
router.get("/:id", orderController_1.getOrderById); // Récupérer une commande par ID
router.post("/", orderController_1.createOrder); // Créer une nouvelle commande
router.put("/:id", orderController_1.updateOrder); // Mettre à jour une commande
router.delete("/:id", orderController_1.deleteOrder); // Supprimer une commande
exports.default = router;
