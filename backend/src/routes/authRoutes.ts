import express from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser); // Route pour l'inscription
router.post("/login", loginUser); // Route pour la connexion

export default router;
