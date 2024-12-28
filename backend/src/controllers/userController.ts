import { Request, Response } from "express";
import mongoose from "mongoose";
import User, { IUser } from "../models/userModel";
import bcrypt from "bcryptjs";

// Récupérer tous les utilisateurs
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); // On exclut les mots de passe
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "ID utilisateur invalide" });
    return;
  }

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { firstname, lastname, email, password, address, telephone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "Email déjà utilisé" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: IUser = new User({
      _id: new mongoose.Types.ObjectId(),
      firstname,
      lastname,
      email,
      password: hashedPassword,
      address,
      telephone,
    });

    const createdUser = await user.save();
    res.status(201).json({
      _id: createdUser._id,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname,
      email: createdUser.email,
      address: createdUser.address,
      telephone: createdUser.telephone,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "ID utilisateur invalide" });
    return;
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
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
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      address: updatedUser.address,
      telephone: updatedUser.telephone,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "ID utilisateur invalide" });
    return;
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    await User.findByIdAndDelete(user._id);
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
