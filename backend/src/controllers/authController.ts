import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/userModel";
import crypto from "crypto";

// Générer un JWT
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "30d" });
};

// Inscription
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstname, lastname, address, telephone } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "Utilisateur déjà existant" });
      return;
    }

    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Création de l'utilisateur
    const user: IUser = new User({
      idUser: crypto.randomUUID(),
      email,
      password: hashedPassword,
      firstname,
      lastname,
      address,
      telephone,
      isVerified: true, // Par défaut, validé
    });

    const createdUser = await user.save();

    res.status(201).json({
      _id: createdUser.idUser,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname,
      email: createdUser.email,
      token: generateToken(createdUser.idUser),
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Connexion
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Email ou mot de passe incorrect" });
      return;
    }

    // Vérifier si le compte est validé
    if (!user.isVerified) {
      res.status(403).json({ message: "Votre compte n'est pas encore validé." });
      return;
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Email ou mot de passe incorrect" });
      return;
    }

    // Générer le JWT
    const token = generateToken(user.idUser);

    res.status(200).json({
      _id: user.idUser,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
