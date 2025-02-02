import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/userModel";
import crypto from "crypto";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

const generateToken = (id: string, expiresIn: string = "30d"): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn });
};

// Inscription
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstname, lastname, address, telephone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "Utilisateur déjà existant" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: IUser = new User({
      idUser: crypto.randomUUID(),
      email,
      password: hashedPassword,
      firstname,
      lastname,
      address,
      telephone,
      isVerified: false, // Compte non vérifié
    });

    const createdUser = await user.save();

    // Générer le lien de confirmation
    const confirmationToken = generateToken(createdUser.idUser, "1h");
    const confirmationLink = `${process.env.FRONTEND_URL}/confirm/${confirmationToken}`;

    // Envoyer un email de confirmation
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirmation d'inscription",
      html: `
        <h3>Bienvenue, ${firstname}!</h3>
        <p>Veuillez confirmer votre email en cliquant sur le lien ci-dessous :</p>
        <a href="${confirmationLink}">Confirmer mon inscription</a>
        <p>Ce lien expire dans une heure.</p>
      `,
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès. Veuillez confirmer votre email.",
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
export const confirmEmail = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params;

  try {
    // Vérifiez si le token est reçu
    console.log("Token reçu :", token);

    // Décodez le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    console.log("Token décodé :", decoded);

    // Recherchez l'utilisateur
    const user = await User.findOne({ idUser: decoded.id });
    if (!user) {
      console.error("Utilisateur introuvable pour l'id :", decoded.id);
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }

    
    if (user.isVerified) {
      console.log("Utilisateur déjà vérifié :", user.idUser);
      res.status(400).json({ message: "Email déjà confirmé." });
      return;
    }

  
    user.isVerified = true;
    await user.save();
    console.log("Utilisateur vérifié :", user.idUser);

    
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  } catch (error) {
    console.error("Erreur lors de la confirmation :", error);
    res.status(400).json({ message: "Lien invalide ou expiré.", error });
  }
};


export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }

    const resetToken = generateToken(user.idUser, "1h");
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Réinitialisation de mot de passe",
      html: `
        <h3>Réinitialisation de mot de passe</h3>
        <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
        <a href="${resetLink}">Réinitialiser mon mot de passe</a>
        <p>Ce lien expire dans une heure.</p>
      `,
    });

    res.status(200).json({ message: "Email de réinitialisation envoyé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de réinitialisation :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Réinitialiser le mot de passe
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const user = await User.findOne({ idUser: decoded.id });
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
  } catch (error) {
    res.status(400).json({ message: "Lien invalide ou expiré.", error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  console.log("Tentative de connexion avec :", email);

  try {
    console.log("Tentative de connexion :", { email, password });

    const user = await User.findOne({ email });

    if (!user) {
      console.log("Utilisateur introuvable :", email);
      res.status(400).json({ message: "Email ou mot de passe incorrect." });
      return;
    }

    if (!user.isVerified) {
      console.log("Utilisateur non vérifié :", email);
      res.status(403).json({ message: "Votre compte n'est pas encore confirmé." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Mot de passe incorrect pour :", email);
      res.status(400).json({ message: "Email ou mot de passe incorrect." });
      return;
    }

    const token = generateToken(user.idUser);
    console.log("Connexion réussie pour :", email);

    console.log("Connexion réussie :", user);

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
