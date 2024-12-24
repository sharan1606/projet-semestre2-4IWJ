import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

export const registerUser = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password, is_admin } = req.body;

  // Vérifie si l'utilisateur existe déjà
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'Utilisateur déjà existant' });
    return;
  }

  // Crée un nouvel utilisateur
  try {
    const user: IUser = new User({
      firstname,
      lastname,
      email,
      password,
      is_admin: is_admin || false, // Défaut à `false` si non spécifié
    });

    const createdUser = await user.save();

    res.status(201).json({
      _id: createdUser._id,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname,
      email: createdUser.email,
      is_admin: createdUser.is_admin,
      token: generateToken(createdUser._id.toHexString()),
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        is_admin: user.is_admin,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error });
  }
};
