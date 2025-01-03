import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/userModel";

interface DecodedToken {
  id: string;
}

// Middleware pour protéger les routes
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extraire le token
      token = req.headers.authorization.split(" ")[1];

      // Décoder le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

      // Rechercher l'utilisateur correspondant au token
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        res.status(401).json({ message: "Utilisateur non trouvé." });
        return;
      }

      req.user = user; // Attribuer l'utilisateur à `req.user`
      next();
    } catch (error) {
      res.status(401).json({ message: "Token invalide ou expiré." });
    }
  } else {
    res.status(401).json({ message: "Aucun token fourni." });
  }
};