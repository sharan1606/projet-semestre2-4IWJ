import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers); // Récupérer tous les utilisateurs
router.get("/:id", getUserById); // Récupérer un utilisateur par ID
router.post("/", createUser); // Créer un utilisateur
router.put("/:id", updateUser); // Mettre à jour un utilisateur
router.delete("/:id", deleteUser); // Supprimer un utilisateur

export default router;
