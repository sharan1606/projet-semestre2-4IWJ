import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

interface Decoded {
  id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Decoded;

      const user = await User.findOne({ idUser: decoded.id });

      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Accès refusé, token invalide" });
    }
  } else {
    res.status(401).json({ message: "Accès refusé, aucun token fourni" });
  }
};
