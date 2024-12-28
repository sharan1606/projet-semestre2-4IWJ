import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/userModel";

// Interface pour le contenu du token JWT décodé
interface Decoded {
  id: string;
}

// Middleware protect pour protéger les routes
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Vérification si le token est fourni dans les headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extraction du token
      token = req.headers.authorization.split(" ")[1];

      // Décodage du token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Decoded;

      // Récupération de l'utilisateur correspondant au token (sans mot de passe)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Passer au prochain middleware ou à la route
    } catch (error) {
      res.status(401).json({ message: "Accès refusé, token invalide" });
    }
  } else {
    res.status(401).json({ message: "Accès refusé, aucun token fourni" });
  }
};
