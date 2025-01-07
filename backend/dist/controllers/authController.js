"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.resetPassword = exports.forgotPassword = exports.confirmEmail = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Adresse email
        pass: process.env.EMAIL_PASS, // Mot de passe ou App Password
    },
});
const generateToken = (id, expiresIn = "30d") => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstname, lastname, address, telephone } = req.body;
    try {
        const userExists = yield userModel_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "Utilisateur déjà existant" });
            return;
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const user = new userModel_1.default({
            idUser: crypto_1.default.randomUUID(),
            email,
            password: hashedPassword,
            firstname,
            lastname,
            address,
            telephone,
            isVerified: false, // Compte non vérifié
        });
        const createdUser = yield user.save();
        const confirmationToken = generateToken(createdUser.idUser, "1h");
        const confirmationLink = `${process.env.FRONTEND_URL}/confirm/${confirmationToken}`;
        yield transporter.sendMail({
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
    }
    catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.registerUser = registerUser;
const confirmEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield userModel_1.default.findOne({ idUser: decoded.id });
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé." });
            return;
        }
        if (user.isVerified) {
            res.status(400).json({ message: "Email déjà confirmé." });
            return;
        }
        user.isVerified = true;
        yield user.save();
        res.status(200).json({ message: "Email confirmé avec succès." });
    }
    catch (error) {
        res.status(400).json({ message: "Lien invalide ou expiré.", error });
    }
});
exports.confirmEmail = confirmEmail;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé." });
            return;
        }
        const resetToken = generateToken(user.idUser, "1h");
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        yield transporter.sendMail({
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
    }
    catch (error) {
        console.error("Erreur lors de l'envoi de l'email de réinitialisation :", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield userModel_1.default.findOne({ idUser: decoded.id });
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé." });
            return;
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(newPassword, salt);
        yield user.save();
        res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
    }
    catch (error) {
        res.status(400).json({ message: "Lien invalide ou expiré.", error });
    }
});
exports.resetPassword = resetPassword;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Email ou mot de passe incorrect." });
            return;
        }
        if (!user.isVerified) {
            res.status(403).json({ message: "Votre compte n'est pas encore confirmé." });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Email ou mot de passe incorrect." });
            return;
        }
        const token = generateToken(user.idUser);
        res.status(200).json({
            _id: user.idUser,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token,
        });
    }
    catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.loginUser = loginUser;
