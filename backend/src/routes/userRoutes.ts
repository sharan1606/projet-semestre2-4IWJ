import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Récupérer tous les utilisateurs
router.get("/", protect, getAllUsers);

// Récupérer un utilisateur par ID
router.get("/:id", protect, getUserById);

// Créer un nouvel utilisateur
router.post("/", protect, createUser);

// Mettre à jour un utilisateur
router.put("/:id", protect, updateUser);

// Supprimer un utilisateur
router.delete("/:id", protect, deleteUser);

export default router;
