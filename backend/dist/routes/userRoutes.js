"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Routes pour les utilisateurs
router.get("/", authMiddleware_1.protect, userController_1.getAllUsers); // Récupérer tous les utilisateurs
router.get("/:id", authMiddleware_1.protect, userController_1.getUserById); // Récupérer un utilisateur par ID
router.post("/", authMiddleware_1.protect, userController_1.createUser); // Créer un utilisateur
router.put("/:id", authMiddleware_1.protect, userController_1.updateUser); // Mettre à jour un utilisateur
router.delete("/:id", authMiddleware_1.protect, userController_1.deleteUser); // Supprimer un utilisateur
exports.default = router;
