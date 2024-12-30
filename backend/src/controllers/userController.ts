import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User, { IUser } from "../models/userModel";

// Récupérer tous les utilisateurs
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select("-password"); // On exclut les mots de passe
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Récupérer un utilisateur par ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Créer un utilisateur
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstname, lastname, address, telephone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "Email déjà utilisé." });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      idUser: crypto.randomUUID(),
      email,
      password: hashedPassword,
      firstname,
      lastname,
      address,
      telephone,
    });

    const createdUser = await newUser.save();
    res.status(201).json({
      _id: createdUser._id,
      email: createdUser.email,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }

    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.telephone = req.body.telephone || user.telephone;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      email: updatedUser.email,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Supprimer un utilisateur
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }

    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
