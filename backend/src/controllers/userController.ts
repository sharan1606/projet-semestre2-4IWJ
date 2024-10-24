import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'Utilisateur déjà existant' });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user: IUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  const createdUser = await user.save();

  res.status(201).json({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    token: generateToken(createdUser._id.toHexString()),
  });
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  };