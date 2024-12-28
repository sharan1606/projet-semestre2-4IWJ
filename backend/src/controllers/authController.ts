import { Request, Response } from "express";
import mongoose from "mongoose";
import User, { IUser } from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Générer un token JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "30d" });
};

// Inscription
export const registerUser = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password, address, telephone } = req.body;

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
    _id: new mongoose.Types.ObjectId(), // Prise en compte de `_id`
    firstname,
    lastname,
    email,
    password: hashedPassword,
    address,
    telephone,
  });

  const createdUser = await user.save();

  // Réponse avec les données de l'utilisateur créé
  res.status(201).json({
    _id: createdUser._id,
    firstname: createdUser.firstname,
    lastname: createdUser.lastname,
    email: createdUser.email,
    token: generateToken(createdUser._id.toHexString()),
  });
};

// Connexion
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Rechercher l'utilisateur par email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Si les informations sont correctes, retourner les détails et un token
    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } else {
    // Sinon, retourner une erreur 401
    res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }
};
